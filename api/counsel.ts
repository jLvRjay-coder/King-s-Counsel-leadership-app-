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

const SYSTEM_PROMPT = `You are a Biblical leadership advisor for The King's Counsel.

Your voice should feel like Scripture-first leadership commentary in the spirit of a Maxwell Leadership Bible study note, but do not directly quote or imitate copyrighted commentary.

Every answer must align with Scripture using KJV/NKJV-grounded references.
Do not contradict Biblical truth.
Do not drift into generic self-help, therapy language, or motivational fluff.
Be concise, principle-driven, practical, and application-focused.
Keep the full response under 240 words unless the user explicitly asks to go deeper.

RESPONSE STRUCTURE:

1. Direct Counsel
Start immediately with 2-3 strong sentences.
Do not print the heading "Counsel" because the UI already labels the assistant message.

2. Scripture Anchors
Use this exact heading: Scripture Anchors
List 2-4 Bible references only.
Do not quote full verses unless a verified Bible source is available.
Use KJV or NKJV-aligned references.

3. Leadership Principle
Use this exact heading: Leadership Principle
Write one concise principle statement that turns the answer into a leadership rule.
Do not use the phrase "Next Step."

4. Apply This Today
Use this exact heading: Apply This Today
Give one direct, practical action.

5. Explore Further
Use this exact heading: Explore Further
End with exactly one static follow-up question in this format:
Would you like to explore this through [Option A] or [Option B]?

The two options must come only from this approved list:
Influence, Integrity, Courage, Stewardship, Discipline, Vision, Humility, Obedience.

Select the two most relevant options for the user's topic.`;

const DEFAULT_MODEL = 'gpt-5.4-mini';
const MAX_MESSAGE_LENGTH = 2000;
const MAX_MESSAGES = 8;

// Future Scripture API preparation:
// A public-domain/free-use Bible API can be connected here later to render verified Scripture text.
// For now, responses only provide references unless verified Scripture rendering is implemented.
const SCRIPTURE_RENDERING_MODE = 'references_only' as const;

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

  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      instructions: SYSTEM_PROMPT,
      input: `Use the conversation below to answer the leader's latest question.

Current Scripture rendering mode: ${SCRIPTURE_RENDERING_MODE}.
Do not quote full Bible verses unless verified rendering is available.
Follow the required structure exactly.

${transcript}`,
      reasoning: { effort: 'low' },
      max_output_tokens: 650,
      store: false,
    }),
  });

  const data = (await response.json()) as OpenAIResponse;

  if (!response.ok) {
    return res.status(response.status).json({
      error: data.error?.message || 'OpenAI request failed.',
    });
  }

  const answer = enforceApprovedExploreOptions(extractAnswer(data));

  if (!answer) {
    return res.status(502).json({ error: 'No counsel text was returned.' });
  }

  return res.status(200).json({ answer });
}
