import { useState } from 'react';
import { ChatPanel } from './components/ChatPanel';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';

export type ActiveView = 'today' | 'counsel' | 'library';

const leadershipTopics = [
  {
    title: 'Courage in Leadership',
    reference: 'Joshua 1:9',
    description: 'Leading with boldness in uncertain times',
  },
  {
    title: 'Servant Leadership',
    reference: 'Mark 10:45',
    description: 'The power of serving those you lead',
  },
  {
    title: 'Vision and Direction',
    reference: 'Proverbs 29:18',
    description: 'Casting and maintaining clear vision',
  },
  {
    title: 'Integrity Under Pressure',
    reference: 'Daniel 6:3-4',
    description: 'Standing firm when character is tested',
  },
];

const biblicalLeaders = [
  {
    title: 'Moses',
    reference: 'Exodus 3-4',
    description: 'From reluctant leader to deliverer of a nation',
  },
  {
    title: 'David',
    reference: '1 Samuel 17',
    description: 'Shepherd to king — leadership forged in faithfulness',
  },
  {
    title: 'Nehemiah',
    reference: 'Nehemiah 1-2',
    description: 'Rebuilding with strategy and prayer',
  },
  {
    title: 'Jesus',
    reference: 'John 13:1-17',
    description: 'The ultimate model of servant leadership',
  },
];

function StudyLibrary() {
  return (
    <section className="page-wrap" aria-labelledby="study-library-title">
      <div className="hero-section">
        <span className="section-label">Study Library</span>
        <h1 id="study-library-title">Leadership formed by Scripture.</h1>
        <p>
          A growing library of biblical leadership themes, Scripture anchors, and leadership
          examples for disciplined study.
        </p>
      </div>

      <section className="counsel-card">
        <div className="card-heading-row">
          <span className="section-label">Leadership Topics</span>
          <span className="rule-line" />
        </div>

        <div className="library-card-grid">
          {leadershipTopics.map((topic) => (
            <article key={topic.title} className="library-card">
              <h3>{topic.title}</h3>
              <span>{topic.reference}</span>
              <p>{topic.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="counsel-card">
        <div className="card-heading-row">
          <span className="section-label">Biblical Leaders</span>
          <span className="rule-line" />
        </div>

        <div className="library-card-grid">
          {biblicalLeaders.map((leader) => (
            <article key={leader.title} className="library-card">
              <h3>{leader.title}</h3>
              <span>{leader.reference}</span>
              <p>{leader.description}</p>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>('today');
  const [initialChatPrompt, setInitialChatPrompt] = useState('');

  const openCounsel = (prompt?: string) => {
    if (prompt?.trim()) {
      setInitialChatPrompt(prompt.trim());
    }

    setActiveView('counsel');
  };

  const renderActiveView = () => {
    if (activeView === 'today') {
      return <HomePage onAskCounsel={openCounsel} />;
    }

    if (activeView === 'counsel') {
      return (
        <ChatPanel
          initialPrompt={initialChatPrompt}
          onInitialPromptConsumed={() => setInitialChatPrompt('')}
        />
      );
    }

    return <StudyLibrary />;
  };

  return (
    <div className="app-shell">
      <Header activeView={activeView} onNavigate={setActiveView} />

      <main className="main-stage">{renderActiveView()}</main>
    </div>
  );
}
