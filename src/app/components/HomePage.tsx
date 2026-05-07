import { FormEvent, useState } from 'react';
import { ArrowRight, BookOpen, Download, MessageSquareText, ShieldCheck } from 'lucide-react';
import { todaysCounsel } from '../data/todaysCounsel';
import { CounselCard } from './CounselCard';
import { ReflectionBlock } from './ReflectionBlock';
import { SendToSelfButtons } from './SendToSelfButtons';

type HomePageProps = {
  onAskCounsel: (prompt?: string) => void;
  onOpenLibrary: () => void;
};

export function HomePage({ onAskCounsel, onOpenLibrary }: HomePageProps) {
  const [question, setQuestion] = useState('');
  const appUrl = window.location.origin;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAskCounsel(question);
    setQuestion('');
  };

  const lessonSummary = [
    `The King’s Counsel — ${todaysCounsel.title}`,
    `${todaysCounsel.scriptureReference}: ${todaysCounsel.scriptureText}`,
    `Leadership Principle: ${todaysCounsel.leadershipPrinciple}`,
    'Reflection:',
    ...todaysCounsel.reflectionPrompts.map((prompt) => `- ${prompt}`),
  ].join('\n\n');

  const askAboutTodayPrompt = [
    `Help me apply today's counsel: ${todaysCounsel.title}.`,
    `Scripture: ${todaysCounsel.scriptureReference}.`,
    `Leadership principle: ${todaysCounsel.leadershipPrinciple}`,
    'Ask me the right questions and give me Scripture-aligned counsel for the leadership decision in front of me.',
  ].join('\n\n');

  return (
    <div id="top" className="page-wrap">
      <section className="hero-section" aria-labelledby="todays-counsel-title">
        <div className="hero-kicker">
          <ShieldCheck size={16} strokeWidth={1.8} />
          Scripture-first leadership counsel
        </div>
        <h1 id="todays-counsel-title">Today’s Counsel</h1>
        <p>{todaysCounsel.subheading}</p>
      </section>

      <CounselCard lesson={todaysCounsel} />
      <ReflectionBlock prompts={todaysCounsel.reflectionPrompts} />

      <section className="continue-card" aria-labelledby="continue-counsel-title">
        <span className="section-label">Continue Today's Counsel</span>
        <h2 id="continue-counsel-title">Carry this into the next faithful step.</h2>

        <div className="continue-actions">
          <button
            className="continue-action"
            type="button"
            onClick={() => onAskCounsel(askAboutTodayPrompt)}
          >
            <MessageSquareText size={18} strokeWidth={1.9} />
            <span>Ask Counsel About This</span>
          </button>

          <button className="continue-action" type="button" onClick={onOpenLibrary}>
            <BookOpen size={18} strokeWidth={1.9} />
            <span>Open Study Library</span>
          </button>

          <a className="continue-action" href={appUrl}>
            <Download size={18} strokeWidth={1.9} />
            <span>Download the App</span>
          </a>
        </div>
      </section>

      <section className="ask-entry-card" aria-labelledby="ask-counsel-title">
        <div>
          <span className="section-label">Ask Counsel</span>
          <h2 id="ask-counsel-title">Bring the Question Under Counsel</h2>
          <p>
            Ask about today's lesson or bring forward the leadership decision in front of you.
          </p>
        </div>

        <form className="ask-form" onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor="home-counsel-input">
            What do you need counsel on?
          </label>
          <input
            id="home-counsel-input"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="What do you need counsel on?"
            autoComplete="off"
          />
          <button type="submit" aria-label="Ask Counsel">
            <ArrowRight size={18} strokeWidth={1.9} />
          </button>
        </form>
      </section>

      <SendToSelfButtons
        subject={`The King’s Counsel — ${todaysCounsel.title}`}
        body={lessonSummary}
      />
    </div>
  );
}
