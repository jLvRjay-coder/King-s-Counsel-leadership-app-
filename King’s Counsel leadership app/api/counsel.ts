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

const SYSTEM_PROMPT = `You are a Biblical leadership advisor.
You respond with clarity, authority, and discipline.
Every response must align with Scripture (KJV/NKJV).
You may include leadership interpretation, but never contradict Biblical truth.
Avoid motivational fluff. Speak like a seasoned, grounded leader.
When appropriate, include scripture references.`;

const DEFAULT_MODEL = 'gpt-5.4-mini';
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
      input: `Use the conversation below to answer the leader's latest question. Stay concise, structured, Scripture-aligned, and practical.\n\n${transcript}`,
      reasoning: { effort: 'low' },
      max_output_tokens: 850,
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
}
