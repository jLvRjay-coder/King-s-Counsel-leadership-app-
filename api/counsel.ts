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

const SYSTEM_PROMPT = `You are The King's Counsel, a Scripture-grounded leadership advisor.

Your role is to give concise, disciplined leadership counsel rooted in Biblical truth.

Tone:
- Calm
- Authoritative
- Direct
- Scripture-first
- Masculine but not harsh
- Practical for leaders

Do not sound like a generic chatbot.
Do not write long essays unless the user asks for depth.
Do not use phrases like "Short answer."
Do not over-list references.
Do not give motivational fluff.

Every response must follow this exact structure:

Counsel
Give 2-4 strong sentences answering the question directly.

Scripture Anchors
List 2-4 Bible references that ground the counsel.
Use references only unless exact verse text is available from an approved Bible source.

Leadership Application
Explain how the counsel applies to leadership, decision-making, responsibility, humility, courage, discipline, or stewardship.

Next Step
Give one clear action the leader should take today.

Rules:
- Align with Scripture.
- You may include curated leadership interpretation, but never contradict Biblical truth.
- If the user asks about a specific situation, apply the counsel directly.
- If the matter is serious, sensitive, or beyond the app's role, advise prayer, Scripture, and wise local counsel.
- Keep the answer concise unless the user asks to go deeper.`;

const DEFAULT_MODEL = 'gpt-5-mini';
const MAX_MESSAGE_LENGTH = 2000;
const MAX_MESSAGES = 8;

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

function resolveModel() {
  const configuredModel = process.env.OPENAI_MODEL?.trim();

  if (!configuredModel || configuredModel === 'gpt-5.4-mini') {
    return DEFAULT_MODEL;
  }

  return configuredModel;
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
  const model = resolveModel();

  try {
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

Stay concise.
Stay structured.
Stay Scripture-aligned.
Stay practical.
Do not produce long Bible-study essays unless the leader asks to go deeper.

Conversation:
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

    const answer = extractAnswer(data);

    if (!answer) {
      return res.status(502).json({ error: 'No counsel text was returned.' });
    }

    return res.status(200).json({ answer });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown server error.';

    return res.status(500).json({
      error: `Counsel service failed. ${message}`,
    });
  }
}
