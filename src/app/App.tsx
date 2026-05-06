import { useState } from 'react';
import { ChatPanel } from './components/ChatPanel';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { StudyLibrary } from './components/StudyLibrary';

export type ActiveView = 'today' | 'counsel' | 'library';

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
