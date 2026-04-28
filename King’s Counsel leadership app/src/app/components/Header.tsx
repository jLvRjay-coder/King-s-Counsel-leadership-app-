import { Crown } from 'lucide-react';

type ActiveView = 'today' | 'counsel';

type HeaderProps = {
  activeView: ActiveView;
  onNavigate: (view: ActiveView) => void;
};

export function Header({ activeView, onNavigate }: HeaderProps) {
  return (
    <header className="site-header">
      <a className="brand-mark" href="#top" aria-label="The King’s Counsel home">
        <span className="brand-icon" aria-hidden="true">
          <Crown size={18} strokeWidth={1.8} />
        </span>
        <span>
          <strong>The King’s Counsel</strong>
          <small>Leadership under authority</small>
        </span>
      </a>

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
        <button className="nav-link muted" disabled type="button">
          Series
        </button>
      </nav>
    </header>
  );
}
