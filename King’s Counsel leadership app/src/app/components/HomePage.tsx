import { FormEvent, useState } from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { todaysCounsel } from '../data/todaysCounsel';
import { CounselCard } from './CounselCard';
import { ReflectionBlock } from './ReflectionBlock';
import { SendToSelfButtons } from './SendToSelfButtons';

type HomePageProps = {
  onAskCounsel: (prompt?: string) => void;
};

export function HomePage({ onAskCounsel }: HomePageProps) {
  const [question, setQuestion] = useState('');

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

      <section className="ask-entry-card" aria-labelledby="ask-counsel-title">
        <div>
          <span className="section-label">Ask Counsel</span>
          <h2 id="ask-counsel-title">Bring the decision into the light.</h2>
          <p>
            Ask a leadership question and receive disciplined, Scripture-aligned counsel for the moment in front of you.
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
