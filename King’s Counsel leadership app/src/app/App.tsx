import { useState } from 'react';
import { ChatPanel } from './components/ChatPanel';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';

type ActiveView = 'today' | 'counsel';

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>('today');
  const [initialChatPrompt, setInitialChatPrompt] = useState('');

  const openCounsel = (prompt?: string) => {
    if (prompt?.trim()) {
      setInitialChatPrompt(prompt.trim());
    }
    setActiveView('counsel');
  };

  return (
    <div className="app-shell">
      <Header activeView={activeView} onNavigate={setActiveView} />

      <main className="main-stage">
        {activeView === 'today' ? (
          <HomePage onAskCounsel={openCounsel} />
        ) : (
          <ChatPanel
            initialPrompt={initialChatPrompt}
            onInitialPromptConsumed={() => setInitialChatPrompt('')}
          />
        )}
      </main>
    </div>
  );
}
