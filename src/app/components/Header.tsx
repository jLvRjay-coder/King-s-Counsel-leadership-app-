import { Crown } from 'lucide-react';
import type { ActiveView } from '../App';

type HeaderProps = {
  activeView: ActiveView;
  onNavigate: (view: ActiveView) => void;
};

export function Header({ activeView, onNavigate }: HeaderProps) {
  return (
    <header className="site-header">
      <button
        className="brand-mark brand-button"
        type="button"
        onClick={() => onNavigate('today')}
        aria-label="Go to Today’s Counsel"
      >
        <span className="brand-icon" aria-hidden="true">
          <Crown size={18} strokeWidth={1.8} />
        </span>

        <span>
          <strong>The King’s Counsel</strong>
          <small>Leadership under authority</small>
        </span>
      </button>

      <nav className="top-nav" aria-label="Primary navigation">
        <button
          className={activeView === 'today' ? 'nav-link active' : 'nav-link'}
          onClick={() => onNavigate('today')}
          type="button"
        >
          Today
        </button>

        <button
          className={activeView === 'counsel' ? 'nav-link active' : 'nav-link'}
          onClick={() => onNavigate('counsel')}
          type="button"
        >
          Ask Counsel
        </button>

        <button
          className={activeView === 'library' ? 'nav-link active' : 'nav-link'}
          onClick={() => onNavigate('library')}
          type="button"
        >
          Study Library
        </button>
      </nav>
    </header>
  );
}
