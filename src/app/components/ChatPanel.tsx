import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { Loader2, SendHorizontal } from 'lucide-react';
import { SendToSelfButtons } from './SendToSelfButtons';

type MessageRole = 'user' | 'assistant';

type Message = {
  id: string;
  role: MessageRole;
  content: string;
};

type FollowUpOptions = {
  optionA: string;
  optionB: string;
};

type ChatPanelProps = {
  initialPrompt?: string;
  onInitialPromptConsumed?: () => void;
};

type CounselApiResponse = {
  answer?: string;
  error?: string;
};

const openingMessage: Message = {
  id: 'opening-counsel',
  role: 'assistant',
  content:
    'Bring one leadership matter forward. I will answer with Scripture-aligned counsel, practical application, and disciplined clarity.',
};

const oldExploreFurtherPattern =
  /Would you like to explore this through\s+([A-Za-z\s-]+)\s+or\s+([A-Za-z\s-]+)\?/i;

const newExploreFurtherPattern =
  /Would you like to explore how\s+(.+?)\s+applies to this leadership lesson\?/gi;

function createId() {
  if ('crypto' in window && typeof window.crypto.randomUUID === 'function') {
    return window.crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function extractFollowUpOptions(content: string): FollowUpOptions | null {
  const newFormatMatches = [...content.matchAll(newExploreFurtherPattern)]
    .map((match) => match[1]?.trim())
    .filter((option): option is string => Boolean(option));

  if (newFormatMatches.length >= 2) {
    return {
      optionA: newFormatMatches[0],
      optionB: newFormatMatches[1],
    };
  }

  const oldFormatMatch = content.match(oldExploreFurtherPattern);
  if (!oldFormatMatch) return null;

  return {
    optionA: oldFormatMatch[1].trim(),
    optionB: oldFormatMatch[2].trim(),
  };
}

export function ChatPanel({ initialPrompt, onInitialPromptConsumed }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([openingMessage]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handledPromptRef = useRef('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const latestAssistantMessage = useMemo(
    () => [...messages].reverse().find((message) => message.role === 'assistant'),
    [messages],
  );

  const latestFollowUpOptions = useMemo(() => {
    if (!latestAssistantMessage || latestAssistantMessage.id === openingMessage.id) return null;
    return extractFollowUpOptions(latestAssistantMessage.content);
  }, [latestAssistantMessage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isLoading]);

  const sendMessage = async (rawText: string) => {
    const text = rawText.trim();
    if (!text || isLoading) return;

    const userMessage: Message = {
      id: createId(),
      role: 'user',
      content: text,
    };

    const conversationForApi = [...messages, userMessage]
      .filter((message) => message.id !== openingMessage.id)
      .slice(-8);

    setMessages((current) => [...current, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/counsel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: conversationForApi }),
      });

      const data = (await response.json()) as CounselApiResponse;

      if (!response.ok) {
        throw new Error(data.error || 'Counsel response failed.');
      }

      const assistantAnswer =
        typeof data.answer === 'string' && data.answer.trim().length > 0
          ? data.answer.trim()
          : 'I was unable to generate counsel for that question. Please try again.';

      setMessages((current) => [
        ...current,
        {
          id: createId(),
          role: 'assistant',
          content: assistantAnswer,
        },
      ]);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to reach counsel right now.';

      setMessages((current) => [
        ...current,
        {
          id: createId(),
          role: 'assistant',
          content: `I could not complete that request. ${message}`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const prompt = initialPrompt?.trim();
    if (!prompt || handledPromptRef.current === prompt) return;

    handledPromptRef.current = prompt;
    void sendMessage(prompt);
    onInitialPromptConsumed?.();
    // The initial prompt should fire once per handoff from Today’s Counsel.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPrompt]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void sendMessage(input);
  };

  const handleFollowUpClick = (option: string) => {
    void sendMessage(`Explore how ${option} applies to this leadership lesson.`);
  };

  return (
    <section className="chat-shell" aria-labelledby="chat-title">
      <div className="chat-intro">
        <span className="section-label">Ask Counsel</span>
        <h1 id="chat-title">Seek counsel before you move.</h1>
        <p>
          This is not a replacement for prayer, Scripture, or wise local counsel. It is a disciplined aid for leadership clarity.
        </p>
      </div>

      <div className="message-list" aria-live="polite">
        {messages.map((message) => {
          const followUpOptions =
            message.role === 'assistant' && message.id === latestAssistantMessage?.id
              ? latestFollowUpOptions
              : null;

          return (
            <article key={message.id} className={`message-row ${message.role}`}>
              <div className="message-bubble">
                <span>{message.role === 'assistant' ? 'Counsel' : 'You'}</span>
                <p>{message.content}</p>

                {followUpOptions && (
                  <div className="follow-up-chips" aria-label="Explore further options">
                    <button
                      type="button"
                      onClick={() => handleFollowUpClick(followUpOptions.optionA)}
                      disabled={isLoading}
                    >
                      {followUpOptions.optionA}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleFollowUpClick(followUpOptions.optionB)}
                      disabled={isLoading}
                    >
                      {followUpOptions.optionB}
                    </button>
                  </div>
                )}
              </div>
            </article>
          );
        })}

        {isLoading && (
          <article className="message-row assistant">
            <div className="message-bubble loading-bubble">
              <Loader2 className="spin" size={17} />
              <p>Weighing the matter with Scripture and leadership discipline.</p>
            </div>
          </article>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form className="chat-form" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="counsel-input">
          What do you need counsel on?
        </label>
        <input
          id="counsel-input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="What do you need counsel on?"
          autoComplete="off"
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading || !input.trim()} aria-label="Send question">
          {isLoading ? <Loader2 className="spin" size={18} /> : <SendHorizontal size={18} />}
        </button>
      </form>

      {latestAssistantMessage && latestAssistantMessage.id !== openingMessage.id && (
        <SendToSelfButtons
          subject="The King’s Counsel — Ask Counsel Insight"
          body={`The King’s Counsel\n\n${latestAssistantMessage.content}`}
        />
      )}
    </section>
  );
}
