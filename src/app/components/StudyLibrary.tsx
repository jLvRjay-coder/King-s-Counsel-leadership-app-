import { useMemo, useState } from 'react';
import {
  biblicalLeaders,
  getCurrentStudyDay,
  leadershipSeries,
  type StudyDay,
  type StudyWeek,
} from '../data/studyLibrary';

type WeekStatus = 'available' | 'roadmap';
type ExpandedDayKey = `${'current' | 'selected'}-${number}-${number}`;

function getWeekStatus(week: StudyWeek): WeekStatus {
  return week.days && week.days.length > 0 ? 'available' : 'roadmap';
}

function getDayDeepDive(day: StudyDay) {
  return (
    day.deepDive ?? {
      scriptureContext: [day.scriptureText],
      leadershipBreakdown: day.teaching,
      leadershipPrinciple: day.leadershipPrinciple,
      practicalApplication: [
        day.exploreFurther.length > 0
          ? `Explore further: ${day.exploreFurther.join(', ')}.`
          : day.actionStep,
      ],
      reflection: day.reflectionPrompt,
      action: day.actionStep,
    }
  );
}

type StudyDayCardProps = {
  day: StudyDay;
  isToday?: boolean;
  isExpanded: boolean;
  onToggle: () => void;
};

function StudyDayCard({ day, isToday = false, isExpanded, onToggle }: StudyDayCardProps) {
  const deepDive = getDayDeepDive(day);

  return (
    <li className={`sl-day-item ${isToday ? 'is-today' : ''} ${isExpanded ? 'is-expanded' : ''}`.trim()}>
      <button
        className="sl-day-toggle"
        type="button"
        onClick={onToggle}
        aria-expanded={isExpanded}
      >
        <span className="sl-day-toggle-main">
          <span className="sl-day-head">
            <span className="sl-day-number">Day {day.dayNumber}</span>
            {isToday ? <span className="sl-today-badge">Today</span> : null}
          </span>
          <span className="sl-day-title">{day.title}</span>
          <span className="sl-day-reference">{day.scriptureReference}</span>
          <span className="sl-day-principle">{day.leadershipPrinciple}</span>
        </span>
        <span className="sl-expand-indicator" aria-hidden="true">
          {isExpanded ? 'Close' : 'Study'}
        </span>
      </button>

      {isExpanded ? (
        <div className="sl-deep-dive">
          <section className="sl-deep-section">
            <h4>Scripture Context</h4>
            {deepDive.scriptureContext.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </section>

          <section className="sl-deep-section">
            <h4>Leadership Breakdown</h4>
            <ul className="sl-deep-list">
              {deepDive.leadershipBreakdown.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="sl-deep-section sl-deep-principle">
            <h4>The Leadership Principle</h4>
            <p>{deepDive.leadershipPrinciple}</p>
          </section>

          <section className="sl-deep-section">
            <h4>Practical Application</h4>
            {deepDive.practicalApplication.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </section>

          <div className="sl-day-detail sl-deep-actions">
            <p>
              <strong>Reflection:</strong> {deepDive.reflection}
            </p>
            <p>
              <strong>Action:</strong> {deepDive.action}
            </p>
          </div>
        </div>
      ) : null}
    </li>
  );
}

export function StudyLibrary() {
  const today = useMemo(() => new Date(), []);
  const { week: currentWeek, dayIndex: currentDayIndex } = useMemo(
    () => getCurrentStudyDay(today),
    [today],
  );

  const [selectedWeekNumber, setSelectedWeekNumber] = useState<number>(
    currentWeek.weekNumber,
  );
  const [expandedDayKey, setExpandedDayKey] = useState<ExpandedDayKey | null>(null);

  const selectedWeek =
    leadershipSeries.find((week) => week.weekNumber === selectedWeekNumber) ?? currentWeek;

  const selectedStatus = getWeekStatus(selectedWeek);

  const toggleDay = (key: ExpandedDayKey) => {
    setExpandedDayKey((currentKey) => (currentKey === key ? null : key));
  };

  return (
    <section className="page-wrap sl-shell" aria-labelledby="study-library-title">
      <div className="hero-section sl-hero">
        <span className="section-label">Study Library</span>
        <h1 id="study-library-title">A yearlong path for Scripture-rooted leadership formation.</h1>
        <p>
          Fifty-two weeks. Seven days each. One Scripture-grounded leadership formation track,
          built for leaders who want to be governed by truth rather than by mood.
        </p>
      </div>

      <section className="counsel-card sl-current-card" aria-labelledby="sl-current-title">
        <div className="card-heading-row">
          <span className="section-label">Current Weekly Journey</span>
          <span className="rule-line" aria-hidden="true" />
        </div>

        <div className="sl-current-meta">
          <span className="sl-week-tag">Week {currentWeek.weekNumber} of 52</span>
          <span className="sl-leader-tag">Biblical Leader: {currentWeek.biblicalLeader}</span>
        </div>

        <h2 id="sl-current-title">{currentWeek.theme}</h2>

        <p className="sl-weekly-aim">
          <strong>Weekly Aim:</strong> {currentWeek.weeklyAim}
        </p>

        <p className="sl-weekly-summary">{currentWeek.summary}</p>

        {currentWeek.days.length > 0 ? (
          <ol className="sl-day-list" aria-label="Seven-day breakdown of the current week">
            {currentWeek.days.map((day, index) => {
              const isToday = index === currentDayIndex;
              const dayKey: ExpandedDayKey = `current-${currentWeek.weekNumber}-${day.dayNumber}`;
              return (
                <StudyDayCard
                  key={day.dayNumber}
                  day={day}
                  isToday={isToday}
                  isExpanded={expandedDayKey === dayKey}
                  onToggle={() => toggleDay(dayKey)}
                />
              );
            })}
          </ol>
        ) : (
          <p className="sl-roadmap-note">
            This week is on the roadmap. Daily lessons are being prepared and will appear here as
            the series rolls out.
          </p>
        )}
      </section>

      <section className="counsel-card sl-selected-card" aria-labelledby="sl-selected-title">
        <div className="card-heading-row">
          <span className="section-label">Selected Week</span>
          <span className="rule-line" aria-hidden="true" />
        </div>

        <div className="sl-current-meta">
          <span className="sl-week-tag">Week {selectedWeek.weekNumber}</span>
          <span
            className={`sl-status-badge ${selectedStatus === 'available' ? 'is-available' : 'is-roadmap'}`}
          >
            {selectedStatus === 'available' ? 'Available' : 'Roadmap'}
          </span>
          <span className="sl-leader-tag">Biblical Leader: {selectedWeek.biblicalLeader}</span>
        </div>

        <h2 id="sl-selected-title">{selectedWeek.theme}</h2>
        <p className="sl-weekly-aim">
          <strong>Weekly Aim:</strong> {selectedWeek.weeklyAim}
        </p>
        <p className="sl-weekly-summary">{selectedWeek.summary}</p>

        {selectedStatus === 'available' ? (
          <ol className="sl-day-list" aria-label="Seven-day breakdown of the selected week">
            {selectedWeek.days.map((day) => {
              const dayKey: ExpandedDayKey = `selected-${selectedWeek.weekNumber}-${day.dayNumber}`;
              return (
                <StudyDayCard
                  key={day.dayNumber}
                  day={day}
                  isExpanded={expandedDayKey === dayKey}
                  onToggle={() => toggleDay(dayKey)}
                />
              );
            })}
          </ol>
        ) : (
          <div className="sl-roadmap-state">
            <p className="sl-roadmap-note">
              This week is part of the 52-week roadmap. The daily lessons for{' '}
              <strong>{selectedWeek.theme}</strong> are not yet released. The theme, weekly aim, and
              biblical leader above show the direction this week will take.
            </p>
          </div>
        )}
      </section>

      <section className="counsel-card sl-series-card" aria-labelledby="sl-series-title">
        <div className="card-heading-row">
          <span className="section-label">Leadership Series</span>
          <span className="rule-line" aria-hidden="true" />
        </div>

        <h2 id="sl-series-title">52 weeks of leadership formation</h2>
        <p className="sl-series-intro">
          The first four weeks are fully built. Weeks 5–52 are on the roadmap with theme, weekly
          aim, biblical leader, and summary already in place.
        </p>

        <div className="sl-series-grid">
          {leadershipSeries.map((week) => {
            const status = getWeekStatus(week);
            const isSelected = week.weekNumber === selectedWeek.weekNumber;
            const isCurrent = week.weekNumber === currentWeek.weekNumber;

            return (
              <button
                key={week.weekNumber}
                type="button"
                className={`sl-series-card-item ${status === 'available' ? 'is-available' : 'is-roadmap'} ${isSelected ? 'is-selected' : ''} ${isCurrent ? 'is-current' : ''}`.trim()}
                onClick={() => setSelectedWeekNumber(week.weekNumber)}
                aria-pressed={isSelected}
              >
                <div className="sl-series-card-head">
                  <span className="sl-series-week">Week {week.weekNumber}</span>
                  <span
                    className={`sl-status-badge ${status === 'available' ? 'is-available' : 'is-roadmap'}`}
                  >
                    {status === 'available' ? 'Available' : 'Roadmap'}
                  </span>
                </div>
                <h3 className="sl-series-theme">{week.theme}</h3>
                <p className="sl-series-leader">Leader: {week.biblicalLeader}</p>
                <p className="sl-series-summary">{week.summary}</p>
              </button>
            );
          })}
        </div>
      </section>

      <section className="counsel-card sl-leaders-card" aria-labelledby="sl-leaders-title">
        <div className="card-heading-row">
          <span className="section-label">Biblical Leaders</span>
          <span className="rule-line" aria-hidden="true" />
        </div>

        <h2 id="sl-leaders-title">Leaders Scripture has already studied for us</h2>
        <p className="sl-leaders-intro">
          Each of these figures carries a leadership lesson Scripture has already worked out across
          generations. They are the anchor profiles behind the 52-week journey.
        </p>

        <div className="sl-leader-grid">
          {biblicalLeaders.map((leader) => (
            <article key={leader.name} className="sl-leader-card">
              <h3>{leader.name}</h3>
              <span className="sl-leader-reference">{leader.reference}</span>
              <p className="sl-leader-theme">{leader.leadershipTheme}</p>
              <p className="sl-leader-summary">{leader.summary}</p>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
