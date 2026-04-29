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

type ScriptureAnchor = {
  reference: string;
  text: string;
};

type ParsedCounselResponse = {
  title: string;
  counsel: string;
  scriptureAnchors: ScriptureAnchor[];
  leadershipPrinciple: string;
  practicalApplication: string;
  exploreOptions: string[];
};

const openingMessage: Message = {
  id: 'opening-counsel',
  role: 'assistant',
  content:
    'Bring one leadership matter forward. I will answer with Scripture-aligned counsel, practical application, and disciplined clarity.',
};

const oldExploreFurtherPattern =
  /Would you like to explore this through\s+([A-Za-z\s-]+)\s+or\s+([A-Za-z\s-]+)\?/i;

const questionExplorePattern =
  /Would you like to explore how\s+(.+?)\s+applies to this leadership lesson\?/i;

const approvedFollowUpOptions = [
  'Integrity',
  'Influence',
  'Wisdom Under Pressure',
  'Courage',
  'Stewardship',
  'Discipline',
  'Vision',
  'Humility',
  'Obedience',
  'Responsibility',
  'Faithfulness',
  'Servant Leadership',
  'Counting the Cost',
  'Decision-Making',
  'Spiritual Maturity',
];

function createId() {
  if ('crypto' in window && typeof window.crypto.randomUUID === 'function') {
    return window.crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function cleanLine(line: string) {
  return line.trim().replace(/\s+/g, ' ');
}

function cleanQuote(line: string) {
  return line
    .trim()
    .replace(/^["“]/, '')
    .replace(/["”]\.?$/, '')
    .trim();
}

function findHeadingIndex(lines: string[], headings: string[]) {
  return lines.findIndex((line) => headings.includes(line.trim()));
}

function getSectionLines(lines: string[], startIndex: number, endIndex: number) {
  if (startIndex === -1) return [];

  const safeEndIndex = endIndex === -1 ? lines.length : endIndex;

  return lines
    .slice(startIndex + 1, safeEndIndex)
    .map((line) => line.trim())
    .filter(Boolean);
}

function joinSection(lines: string[]) {
  return lines.join('\n').replace(/\n{2,}/g, '\n\n').trim();
}

function parseScriptureAnchors(lines: string[]): ScriptureAnchor[] {
  const anchors: ScriptureAnchor[] = [];

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index].trim();

    if (!line.startsWith('-')) continue;

    const sameLineMatch = line.match(/^-\s*(.+?\bKJV)\s+[—-]\s+["“](.+?)["”]\.?$/);

    if (sameLineMatch) {
      anchors.push({
        reference: cleanLine(sameLineMatch[1]),
        text: cleanQuote(sameLineMatch[2]),
      });
      continue;
    }

    const reference = cleanLine(line.replace(/^-\s*/, ''));
    const nextLine = lines[index + 1]?.trim() ?? '';

    if (reference && nextLine && !nextLine.startsWith('-')) {
      anchors.push({
        reference,
        text: cleanQuote(nextLine),
      });
      index += 1;
      continue;
    }

    if (reference) {
      anchors.push({
        reference,
        text: '',
      });
    }
  }

  return anchors.slice(0, 2);
}

function extractExploreOptionsFromLines(lines: string[]) {
  const options = lines
    .map((line) => {
      const trimmed = line.replace(/^-\s*/, '').trim();
      const questionMatch = trimmed.match(questionExplorePattern);

      if (questionMatch?.[1]) {
        return questionMatch[1].trim();
      }

      return trimmed;
    })
    .filter(Boolean)
    .filter((option) => option.length <= 40)
    .map((option) => option.replace(/[?.!]+$/, '').trim());

  return options.slice(0, 2);
}

function extractFollowUpOptions(content: string): FollowUpOptions | null {
  const parsed = parseCounselResponse(content);

  if (parsed?.exploreOptions.length && parsed.exploreOptions.length >= 2) {
    return {
      optionA: parsed.exploreOptions[0],
      optionB: parsed.exploreOptions[1],
    };
  }

  const oldFormatMatch = content.match(oldExploreFurtherPattern);

  if (!oldFormatMatch) return null;

  return {
    optionA: oldFormatMatch[1].trim(),
    optionB: oldFormatMatch[2].trim(),
  };
}

function parseCounselResponse(content: string): ParsedCounselResponse | null {
  const normalized = content.replace(/\r\n/g, '\n').trim();
  const lines = normalized.split('\n').map((line) => line.trimEnd());

  const titleIndex = lines.findIndex((line) => line.trim().startsWith('Counsel on '));
  const scriptureIndex = findHeadingIndex(lines, ['Scripture Anchors']);
  const principleIndex = findHeadingIndex(lines, ['The Leadership Principle', 'Leadership Principle']);
  const applicationIndex = findHeadingIndex(lines, ['Practical Application', 'Practical Leadership Lesson']);
  const exploreIndex = findHeadingIndex(lines, ['Explore Further']);

  if (titleIndex === -1 || scriptureIndex === -1) return null;

  const title = cleanLine(lines[titleIndex]);
  const counsel = joinSection(getSectionLines(lines, titleIndex, scriptureIndex));
  const scriptureAnchors = parseScriptureAnchors(
    getSectionLines(lines, scriptureIndex, principleIndex),
  );

  const leadershipPrinciple = joinSection(
    getSectionLines(lines, principleIndex, applicationIndex),
  );

  const practicalApplication = joinSection(
    getSectionLines(lines, applicationIndex, exploreIndex),
  );

  const exploreOptions = extractExploreOptionsFromLines(getSectionLines(lines, exploreIndex, -1));

  if (!title || !counsel) return null;

  return {
    title,
    counsel,
    scriptureAnchors,
    leadershipPrinciple,
    practicalApplication,
    exploreOptions,
  };
}

function CounselResponse({
  content,
  showFollowUps,
  isLoading,
  onFollowUpClick,
}: {
  content: string;
  showFollowUps: boolean;
  isLoading: boolean;
  onFollowUpClick: (option: string) => void;
}) {
  const parsed = parseCounselResponse(content);

  if (!parsed) {
    return <p>{content}</p>;
  }

  const safeExploreOptions =
    parsed.exploreOptions.length >= 2
      ? parsed.exploreOptions
      : approvedFollowUpOptions.slice(0, 2);

  return (
    <div className="counsel-response">
      <h2>{parsed.title}</h2>

      <p className="counsel-response-lead">{parsed.counsel}</p>

      {parsed.scriptureAnchors.length > 0 && (
        <section className="counsel-response-section" aria-label="Scripture anchors">
          <span className="counsel-response-label">Scripture Anchors</span>

          <div className="answer-scripture-stack">
            {parsed.scriptureAnchors.map((anchor) => (
              <figure key={`${anchor.reference}-${anchor.text}`} className="answer-scripture-card">
                <figcaption>{anchor.reference}</figcaption>
                {anchor.text ? <blockquote>“{anchor.text}”</blockquote> : null}
              </figure>
            ))}
          </div>
        </section>
      )}

      {parsed.leadershipPrinciple && (
        <section className="answer-principle-card">
          <span>The Leadership Principle</span>
          <p>{parsed.leadershipPrinciple}</p>
        </section>
      )}

      {parsed.practicalApplication && (
        <section className="answer-application-card">
          <span>Practical Application</span>
          <p>{parsed.practicalApplication}</p>
        </section>
      )}

      {showFollowUps && safeExploreOptions.length >= 2 && (
        <section className="answer-explore-card" aria-label="Explore further options">
          <span>Explore Further</span>

          <div className="follow-up-chips polished">
            {safeExploreOptions.slice(0, 2).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => onFollowUpClick(option)}
                disabled={isLoading}
              >
                {option}
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
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
          This is not a replacement for prayer, Scripture, or wise local counsel. It is a
          disciplined aid for leadership clarity.
        </p>
      </div>

      <div className="message-list" aria-live="polite">
        {messages.map((message) => {
          const isLatestAssistant =
            message.role === 'assistant' && message.id === latestAssistantMessage?.id;
          const showFollowUps = Boolean(
            isLatestAssistant &&
              message.id !== openingMessage.id &&
              (latestFollowUpOptions || parseCounselResponse(message.content)?.exploreOptions.length),
          );
          const isStructuredAssistant =
            message.role === 'assistant' &&
            message.id !== openingMessage.id &&
            Boolean(parseCounselResponse(message.content));

          return (
            <article key={message.id} className={`message-row ${message.role}`}>
              <div className={`message-bubble ${isStructuredAssistant ? 'structured' : ''}`}>
                <span>{message.role === 'assistant' ? 'Counsel' : 'You'}</span>

                {message.role === 'assistant' && message.id !== openingMessage.id ? (
                  <CounselResponse
                    content={message.content}
                    showFollowUps={showFollowUps}
                    isLoading={isLoading}
                    onFollowUpClick={handleFollowUpClick}
                  />
                ) : (
                  <p>{message.content}</p>
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
