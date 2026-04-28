import type { VercelRequest, VercelResponse } from '@vercel/node';

type ClientMessage = {
  role: 'user' | 'assistant';
  content: string;
};

type OpenAIResponse = {
  output_text?: string;
  output?: Array<{
    content?: Array<{
      type?: string;
      text?: string;
    }>;
  }>;
  error?: {
    message?: string;
  };
};

const APPROVED_LENSES = [
  'Influence',
  'Integrity',
  'Courage',
  'Stewardship',
  'Discipline',
  'Vision',
  'Humility',
  'Obedience',
] as const;

const SYSTEM_PROMPT = `You are the Ask Counsel response engine for The King's Counsel, a Scripture-grounded leadership operating system.

You are not a generic Bible chatbot.
You are not a motivational speaker.
You are not writing long devotionals.

Your role is to give concise, disciplined, Scripture-first leadership counsel in the style and purpose of leadership study notes. You may use a Maxwell Study Bible style as a FORMAT example for concise leadership principles, but do not imitate, quote, or reproduce copyrighted commentary.

Every response MUST follow this exact format:

[Direct counsel paragraph — 2 to 3 sentences only. No heading.]

Scripture Anchors
- Book Chapter:Verse
- Book Chapter:Verse
- Book Chapter:Verse

Leadership Principle
One sentence only. Make it sound like a leadership rule.

Apply This Today
One practical action only.

Explore Further
Would you like to explore this through [Option A] or [Option B]?

STRICT RULES:
- Do not include the heading "Counsel."
- The opening direct counsel paragraph must be 2 to 3 sentences only.
- Scripture Anchors must include 2 to 3 complete Bible references only.
- Scripture Anchors must always include full references in this pattern: Book Chapter:Verse.
- Never output book names only.
- Never output incomplete references.
- Never output partial anchors like "- Hebrews" or "- Proverbs."
- If you cannot provide a full Scripture reference, omit it and choose a different complete reference.
- Do not quote full verses unless verified Bible rendering is available.
- Leadership Principle must be exactly one sentence.
- Apply This Today must be exactly one practical action.
- Explore Further must be exactly one question.
- Explore Further options must come only from this list: Influence, Integrity, Courage, Stewardship, Discipline, Vision, Humility, Obedience.
- Keep the total response under 180 words.
- Avoid generic motivational language.
- Avoid long essays unless the user explicitly asks to go deeper.
- Every answer must align with KJV/NKJV-grounded Biblical truth.`;

const DEFAULT_MODEL = 'gpt-5.4-mini';
const MAX_MESSAGE_LENGTH = 2000;
const MAX_MESSAGES = 8;

// Future Scripture API preparation:
// A public-domain/free-use Bible API can be connected here later to render verified Scripture text.
// For now, responses only provide complete Scripture references unless verified Scripture rendering is implemented.
const SCRIPTURE_RENDERING_MODE = 'references_only' as const;

const COMPLETE_REFERENCE_PATTERN =
  /\b(?:[1-3]\s*)?[A-Z][a-z]+(?:\s(?:of\s)?[A-Z][a-z]+)*\s\d{1,3}:\d{1,3}(?:-\d{1,3})?\b/;

function parseMessages(body: unknown): ClientMessage[] {
  if (!body || typeof body !== 'object' || !('messages' in body)) return [];

  const messages = (body as { messages?: unknown }).messages;
  if (!Array.isArray(messages)) return [];

  return messages
    .filter((message): message is ClientMessage => {
      if (!message || typeof message !== 'object') return false;
      const candidate = message as Partial<ClientMessage>;
      return (
        (candidate.role === 'user' || candidate.role === 'assistant') &&
        typeof candidate.content === 'string' &&
        candidate.content.trim().length > 0
      );
    })
    .slice(-MAX_MESSAGES)
    .map((message) => ({
      role: message.role,
      content: message.content.trim().slice(0, MAX_MESSAGE_LENGTH),
    }));
}

function buildTranscript(messages: ClientMessage[]) {
  return messages
    .map((message) => `${message.role === 'user' ? 'Leader' : 'Counsel'}: ${message.content}`)
    .join('\n\n');
}

function extractAnswer(data: OpenAIResponse) {
  if (typeof data.output_text === 'string' && data.output_text.trim()) {
    return data.output_text.trim();
  }

  const text = data.output
    ?.flatMap((item) => item.content ?? [])
    .filter((content) => content.type === 'output_text' && typeof content.text === 'string')
    .map((content) => content.text)
    .join('\n')
    .trim();

  return text || '';
}

function enforceApprovedExploreOptions(answer: string) {
  const exploreLinePattern =
    /Would you like to explore this through\s+([A-Za-z]+)\s+or\s+([A-Za-z]+)\?/i;

  const match = answer.match(exploreLinePattern);
  if (!match) return answer;

  const optionA = match[1];
  const optionB = match[2];

  const optionAApproved = APPROVED_LENSES.includes(optionA as (typeof APPROVED_LENSES)[number]);
  const optionBApproved = APPROVED_LENSES.includes(optionB as (typeof APPROVED_LENSES)[number]);

  if (optionAApproved && optionBApproved) return answer;

  return answer.replace(
    exploreLinePattern,
    'Would you like to explore this through Influence or Integrity?',
  );
}

function hasRequiredSections(answer: string) {
  return (
    answer.includes('Scripture Anchors') &&
    answer.includes('Leadership Principle') &&
    answer.includes('Apply This Today') &&
    answer.includes('Explore Further')
  );
}

function hasValidScriptureAnchors(answer: string) {
  const scriptureSection = answer
    .split('Scripture Anchors')[1]
    ?.split('Leadership Principle')[0]
    ?.trim();

  if (!scriptureSection) return false;

  const anchorLines = scriptureSection
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('-'));

  if (anchorLines.length < 2 || anchorLines.length > 3) return false;

  return anchorLines.every((line) => COMPLETE_REFERENCE_PATTERN.test(line));
}

function hasValidExploreFurther(answer: string) {
  const exploreLinePattern =
    /Would you like to explore this through\s+([A-Za-z]+)\s+or\s+([A-Za-z]+)\?/i;

  const match = answer.match(exploreLinePattern);
  if (!match) return false;

  return (
    APPROVED_LENSES.includes(match[1] as (typeof APPROVED_LENSES)[number]) &&
    APPROVED_LENSES.includes(match[2] as (typeof APPROVED_LENSES)[number])
  );
}

function responseNeedsRepair(answer: string) {
  return (
    !hasRequiredSections(answer) ||
    !hasValidScriptureAnchors(answer) ||
    !hasValidExploreFurther(answer)
  );
}

async function requestCounsel({
  apiKey,
  model,
  transcript,
  repairTarget,
}: {
  apiKey: string;
  model: string;
  transcript: string;
  repairTarget?: string;
}) {
  const input = repairTarget
    ? `Repair the response below so it follows the required format exactly.

Do not add explanation.
Do not include the heading "Counsel."
Keep the total response under 180 words.
Scripture Anchors must include 2 to 3 complete references only in this format: Book Chapter:Verse.
If you cannot provide a full Scripture reference, omit it and choose a different complete reference.
Do not quote full verses unless verified rendering is available.
Leadership Principle must appear.
Apply This Today must appear.
Explore Further must appear.

Original conversation:
${transcript}

Broken response:
${repairTarget}`
    : `Use the conversation below to answer the leader's latest question.

Current Scripture rendering mode: ${SCRIPTURE_RENDERING_MODE}.
Do not quote full Bible verses unless verified rendering is available.
If you cannot provide a full Scripture reference, omit it and choose a different complete reference.
Follow the required format exactly.
Keep the total response under 180 words.

${transcript}`;

  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      instructions: SYSTEM_PROMPT,
      input,
      reasoning: { effort: 'low' },
      max_output_tokens: 520,
      store: false,
    }),
  });

  const data = (await response.json()) as OpenAIResponse;

  return {
    ok: response.ok,
    status: response.status,
    data,
    answer: enforceApprovedExploreOptions(extractAnswer(data)),
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'OPENAI_API_KEY is not configured.' });
  }

  const messages = parseMessages(req.body);
  const latestUserMessage = [...messages].reverse().find((message) => message.role === 'user');

  if (!latestUserMessage) {
    return res.status(400).json({ error: 'A leadership question is required.' });
  }

  const transcript = buildTranscript(messages);
  const model = process.env.OPENAI_MODEL || DEFAULT_MODEL;

  const firstAttempt = await requestCounsel({
    apiKey,
    model,
    transcript,
  });

  if (!firstAttempt.ok) {
    return res.status(firstAttempt.status).json({
      error: firstAttempt.data.error?.message || 'OpenAI request failed.',
    });
  }

  let answer = firstAttempt.answer;

  if (answer && responseNeedsRepair(answer)) {
    const repairedAttempt = await requestCounsel({
      apiKey,
      model,
      transcript,
      repairTarget: answer,
    });

    if (repairedAttempt.ok && repairedAttempt.answer) {
      answer = repairedAttempt.answer;
    }
  }

  if (!answer) {
    return res.status(502).json({ error: 'No counsel text was returned.' });
  }

  return res.status(200).json({ answer });
}
