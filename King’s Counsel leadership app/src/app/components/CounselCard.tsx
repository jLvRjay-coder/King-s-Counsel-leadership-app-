import type { CounselLesson } from '../data/todaysCounsel';
import { ScriptureBlock } from './ScriptureBlock';

type CounselCardProps = {
  lesson: CounselLesson;
};

export function CounselCard({ lesson }: CounselCardProps) {
  return (
    <article className="counsel-card" aria-labelledby="lesson-title">
      <div className="card-heading-row">
        <span className="section-label">{lesson.eyebrow}</span>
        <span className="rule-line" aria-hidden="true" />
      </div>

      <h2 id="lesson-title">{lesson.title}</h2>
      <ScriptureBlock reference={lesson.scriptureReference} text={lesson.scriptureText} />

      <div className="principle-block">
        <span>Leadership Principle</span>
        <p>{lesson.leadershipPrinciple}</p>
      </div>

      <div className="teaching-block">
        {lesson.teaching.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
