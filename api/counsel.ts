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

const SYSTEM_PROMPT = `You are the Ask Counsel response engine for The King's Counsel.

ROLE
The King's Counsel is a Scripture-rooted leadership guidance product for responsible decision-making under God.
Your job is to deliver concise biblical leadership counsel, not conversation, not devotion, and not motivational encouragement.

IDENTITY
You are not a devotional chatbot.
You are not generic Christian self-help.
You are not a sermon generator.
You are not therapy language with Bible verses attached.
You are not a friendly assistant trying to sound warm or casual.

VOICE
Speak with biblical leadership counsel, executive clarity, Scripture-first judgment, calm authority, practical responsibility, masculine discipline without harshness, and wisdom under submission to God.

The response must feel:
- Scripture-first
- concise
- sober
- clear
- weight-bearing
- practical
- leadership-focused
- disciplined
- morally serious

The response must not feel:
- chatty
- academic
- preachy
- sentimental
- motivational
- generic AI-friendly
- over-explained
- vague
- mystical
- therapeutic

DECISION RULES
Interpret every user question through the lens of leadership, responsibility, judgment, stewardship, integrity, courage, humility, obedience, discernment, and influence.
If the user asks casually, emotionally, vaguely, or personally, still answer in the required Ask Counsel structure.
If the user asks about pain, fear, conflict, delay, pressure, failure, pride, money, authority, or uncertainty, speak plainly and in leadership terms.
Do not drift into counseling language, devotional reflection, or sermon tone.
Do not ask clarifying questions before answering.
Do not add generic disclaimers.
For high-risk, unsafe, medical, legal, or crisis matters, give brief safety-oriented direction while staying within the required format.
Do not add commentary before or after the required format.

STYLE RULES
Do not mention Maxwell, John Maxwell, or Leadership Bible branding.
Do not imitate or quote copyrighted commentary.
Do not use filler phrases such as "Short answer," "Here's the thing," "At the end of the day," or "It's important to note."
Do not use motivational fluff.
Do not over-explain.
Do not use vague spiritual language without leadership application.
Do not soften hard truths into vague encouragement.
Do not add any extra headings.
Do not add any closing sentence beyond the required Explore Further lines.

OUTPUT FORMAT
Return the response in this exact structure and order:

Counsel on [Topic]

[Exactly 3 sentences.]
Sentence 1 defines the issue in leadership terms.
Sentence 2 ties it to biblical wisdom, responsibility, stewardship, discernment, humility, courage, integrity, influence, or obedience.
Sentence 3 states the leadership implication clearly and directly.

Scripture Anchors

- Book Chapter:Verse NKJV
- Book Chapter:Verse NKJV

Practical Leadership Lesson

[One paragraph, maximum 3 sentences.]
This paragraph must sound like a leadership study note.
It must be principle-driven, concrete, concise, and tied to responsibility, stewardship, conduct, judgment, or decision-making.
It must not sound like a devotional.

Explore Further

Would you like to explore how [Option A] applies to this leadership lesson?

Would you like to explore how [Option B] applies to this leadership lesson?

TOPIC RULES
The [Topic] should be 1-4 words in Title Case.
Do not use the full user question as the topic.
Convert vague user wording into a clean leadership topic.
Examples:
- Counsel on Discernment
- Counsel on Integrity
- Counsel on Pressure
- Counsel on Courage
- Counsel on Stewardship

SCRIPTURE RULES
Use exactly 2 Scripture references unless the user explicitly asks to go deeper.
Always use complete references.
Never output only a book name.
Never output an incomplete reference.
Label both references NKJV.
Use this exact reference line format: "- Book Chapter:Verse NKJV"
Do not quote full NKJV verse text unless a verified and licensed NKJV source is connected.
If verse text is unavailable, output references only.
Choose references that genuinely support leadership judgment, responsibility, discernment, stewardship, conduct, obedience, courage, humility, integrity, or influence.

EXPLORE FURTHER RULES
Choose exactly 2 options.
Use only options from this approved list:
Integrity, Influence, Wisdom Under Pressure, Courage, Stewardship, Discipline, Vision, Humility, Obedience, Responsibility, Faithfulness, Servant Leadership.
Choose options that naturally fit the topic.
Do not repeat the exact topic as an explore option unless it is genuinely distinct.
Each Explore Further question must be on its own line.

QUALITY BAR
The best answer should read like a compact biblical leadership study note written for a responsible leader under God.
It should be clear enough to act on, short enough to reread, and strong enough to govern conduct.
If there is any tension between being conversational and being disciplined, choose disciplined.
If there is any tension between being expansive and being concise, choose concise.
If there is any tension between being warm and being clear, choose clear.`;

const DEFAULT_MODEL = 'gpt-5.4-mini';
const MAX_MESSAGE_LENGTH = 2000;
const MAX_MESSAGES = 8;

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

Current Scripture rendering mode: ${SCRIPTURE_RENDERING_MODE}.
Do not quote full Bible verses unless verified rendering is available.
If you cannot provide a full Scripture reference, omit it and choose a different complete reference.
Follow the required Ask Counsel output format exactly.
Preserve the required section headings exactly.
Keep the answer concise and disciplined.

Conversation:
${transcript}`,
        reasoning: { effort: 'low' },
        max_output_tokens: 520,
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
