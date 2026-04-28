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

const APPROVED_FOLLOW_UP_TOPICS = [
  'Influence',
  'Integrity',
  'Courage',
  'Stewardship',
  'Discipline',
  'Vision',
  'Humility',
  'Obedience',
  'Wisdom Under Pressure',
  'Decision-Making',
  'Spiritual Maturity',
  'Counting the Cost',
] as const;

const DEFAULT_FOLLOW_UP_A = 'Integrity';
const DEFAULT_FOLLOW_UP_B = 'Wisdom Under Pressure';

const SYSTEM_PROMPT = `You are the Ask Counsel response engine for The King's Counsel, a Scripture-grounded leadership app.

You are not a generic Bible chatbot.
You are not a motivational speaker.
You are not writing a long devotional.
You are not giving vague encouragement.

Your role is to answer the leader's question with concise, Scripture-first leadership counsel in a Maxwell Study Bible-style FORMAT:
- clear counsel
- Scripture anchors
- leadership principle
- practical application
- next-step exploration

Do not quote, imitate, or reproduce copyrighted commentary.
Use the Maxwell Study Bible only as a FORMAT inspiration for concise leadership principles.

Every response MUST follow this exact format:

Counsel on [Topic]

[Direct counsel paragraph. 2 to 3 sentences only. No more than 70 words.]

Scripture Anchors
- Book Chapter:Verse NKJV — "Exact NKJV verse text."
- Book Chapter:Verse NKJV — "Exact NKJV verse text."

Practical Leadership Lesson
[One practical leadership lesson tied directly to the counsel and Scripture. 2 to 4 sentences only.]

Explore Further
Would you like to explore how [Option A] applies to this leadership lesson?
Would you like to explore how [Option B] applies to this leadership lesson?

STRICT FORMAT RULES:
- The first line must begin with: Counsel on
- Do not use the heading "Leadership Principle."
- Use the heading "Practical Leadership Lesson."
- Scripture Anchors must include exactly 2 bullet points.
- Each Scripture Anchor must include:
  1. Full Bible reference
  2. NKJV label
  3. Exact verse text in quotation marks
- Never output incomplete references.
- Never output book names only.
- Never output partial anchors like "- Hebrews" or "- Proverbs."
- Never invent a Bible reference.
- Use only one verse per anchor unless the leader specifically asks for a passage.
- Keep quoted NKJV text brief. Prefer shorter verses when possible.
- If exact NKJV wording is uncertain, choose a different Scripture you can render accurately.
- Practical Leadership Lesson must be tied to leadership, not only personal devotion.
- Explore Further must include exactly two questions.
- Explore Further questions must use this exact structure:
  Would you like to explore how [Option] applies to this leadership lesson?
- Explore Further options should come from this list:
  Influence, Integrity, Courage, Stewardship, Discipline, Vision, Humility, Obedience, Wisdom Under Pressure, Decision-Making, Spiritual Maturity, Counting the Cost.
- Keep the total response under 260 words.
- Avoid generic motivational language.
- Avoid long essays unless the user explicitly asks to go deeper.
- Every answer must align with KJV/NKJV-grounded Biblical truth.

CONTENT RULES:
- If the leader asks for a meaning, define it in the leadership context.
- If the leader asks about a virtue, explain how that virtue operates in leadership.
- If the leader asks a practical question, answer directly before teaching.
- Tie the counsel back to the current lesson when context is available.
- Sound like a wise leadership mentor, not a sermon generator.`;

const DEFAULT_MODEL = 'gpt-5.4-mini';
const MAX_MESSAGE_LENGTH = 2000;
const MAX_MESSAGES = 8;

const COMPLETE_NKJV_ANCHOR_PATTERN =
  /^-\s*(?:[1-3]\s*)?[A-Z][A-Za-z]+(?:\s(?:of\s)?[A-Z][A-Za-z]+)*\s\d{1,3}:\d{1,3}(?:-\d{1,3})?\s+NKJV\s+[—-]\s+["“].+["”]\.?$/;

const FOLLOW_UP_PATTERN =
  /^Would you like to explore how (.+?) applies to this leadership lesson\?$/i;

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

function cleanAnswer(answer: string) {
  return answer
    .replace(/\r\n/g, '\n')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function getSection(answer: string, startHeading: string, endHeading?: string) {
  const startIndex = answer.indexOf(startHeading);
  if (startIndex === -1) return '';

  const sectionStart = startIndex + startHeading.length;
  const sectionEnd = endHeading ? answer.indexOf(endHeading, sectionStart) : answer.length;

  return answer
    .slice(sectionStart, sectionEnd === -1 ? answer.length : sectionEnd)
    .trim();
}

function hasRequiredSections(answer: string) {
  return (
    answer.startsWith('Counsel on ') &&
    answer.includes('\n\nScripture Anchors') &&
    answer.includes('\n\nPractical Leadership Lesson') &&
    answer.includes('\n\nExplore Further')
  );
}

function hasValidScriptureAnchors(answer: string) {
  const scriptureSection = getSection(answer, 'Scripture Anchors', 'Practical Leadership Lesson');

  if (!scriptureSection) return false;

  const anchorLines = scriptureSection
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('-'));

  if (anchorLines.length !== 2) return false;

  return anchorLines.every((line) => COMPLETE_NKJV_ANCHOR_PATTERN.test(line));
}

function hasValidExploreFurther(answer: string) {
  const exploreSection = getSection(answer, 'Explore Further');

  if (!exploreSection) return false;

  const followUpLines = exploreSection
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  if (followUpLines.length !== 2) return false;

  return followUpLines.every((line) => {
    const match = line.match(FOLLOW_UP_PATTERN);
    if (!match) return false;

    const topic = match[1].trim();

    return APPROVED_FOLLOW_UP_TOPICS.includes(
      topic as (typeof APPROVED_FOLLOW_UP_TOPICS)[number],
    );
  });
}

function enforceStaticExploreFurther(answer: string) {
  const exploreReplacement = `Explore Further
Would you like to explore how ${DEFAULT_FOLLOW_UP_A} applies to this leadership lesson?
Would you like to explore how ${DEFAULT_FOLLOW_UP_B} applies to this leadership lesson?`;

  if (!answer.includes('Explore Further')) {
    return `${answer.trim()}\n\n${exploreReplacement}`;
  }

  return answer.replace(/Explore Further[\s\S]*$/i, exploreReplacement).trim();
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

Do not explain the repair.
Do not apologize.
Do not add extra notes.

Required format:

Counsel on [Topic]

[Direct counsel paragraph. 2 to 3 sentences only. No more than 70 words.]

Scripture Anchors
- Book Chapter:Verse NKJV — "Exact NKJV verse text."
- Book Chapter:Verse NKJV — "Exact NKJV verse text."

Practical Leadership Lesson
[One practical leadership lesson tied directly to the counsel and Scripture. 2 to 4 sentences only.]

Explore Further
Would you like to explore how ${DEFAULT_FOLLOW_UP_A} applies to this leadership lesson?
Would you like to explore how ${DEFAULT_FOLLOW_UP_B} applies to this leadership lesson?

Repair rules:
- First line must begin with "Counsel on".
- Scripture Anchors must include exactly 2 complete NKJV anchors with verse text.
- Do not output incomplete references.
- Do not output book names only.
- Keep total response under 260 words.
- Explore Further must use the two static follow-ups exactly as written above.

Original conversation:
${transcript}

Broken response:
${repairTarget}`
    : `Answer the leader's latest question using the conversation context below.

Follow the required format exactly.
Keep the total response under 260 words.
Use exactly two Scripture Anchors with NKJV verse text.
Use the two static Explore Further questions exactly:
Would you like to explore how ${DEFAULT_FOLLOW_UP_A} applies to this leadership lesson?
Would you like to explore how ${DEFAULT_FOLLOW_UP_B} applies to this leadership lesson?

Conversation:
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
      max_output_tokens: 700,
      store: false,
    }),
  });

  const data = (await response.json()) as OpenAIResponse;

  return {
    ok: response.ok,
    status: response.status,
    data,
    answer: cleanAnswer(enforceStaticExploreFurther(extractAnswer(data))),
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

  answer = cleanAnswer(enforceStaticExploreFurther(answer));

  if (!answer) {
    return res.status(502).json({ error: 'No counsel text was returned.' });
  }

  return res.status(200).json({ answer });
}
