import {
  getCounselLessonForToday,
  type StudyDay,
  type StudyWeek,
} from './studyLibrary';

export type CounselLesson = {
  eyebrow: string;
  title: string;
  subheading: string;
  scriptureReference: string;
  scriptureText: string;
  leadershipPrinciple: string;
  teaching: string[];
  reflectionPrompts: string[];
};

function deriveSubheading(principle: string): string {
  const trimmed = principle.trim();
  if (!trimmed) {
    return 'Lead today with sober Scripture-rooted clarity.';
  }

  const firstSentence = trimmed.split(/(?<=[.!?])\s+/)[0]?.trim() ?? trimmed;
  const cleaned = firstSentence.replace(/[.?!]+$/, '');

  return `${cleaned}.`;
}

function buildReflectionPrompts(day: StudyDay): string[] {
  const prompts: string[] = [];

  if (day.reflectionPrompt) {
    prompts.push(day.reflectionPrompt);
  }

  if (day.actionStep) {
    prompts.push(day.actionStep);
  }

  // Guarantee at least one prompt so downstream UI never renders empty.
  if (prompts.length === 0) {
    prompts.push('What is the next faithful step under God in front of me today?');
  }

  return prompts;
}

function mapStudyDayToCounselLesson(week: StudyWeek, day: StudyDay): CounselLesson {
  return {
    eyebrow: `Daily Counsel — Week ${week.weekNumber}: ${week.theme}`,
    title: day.title,
    subheading: deriveSubheading(day.leadershipPrinciple),
    scriptureReference: day.scriptureReference,
    scriptureText: day.scriptureText,
    leadershipPrinciple: day.leadershipPrinciple,
    teaching: day.teaching,
    reflectionPrompts: buildReflectionPrompts(day),
  };
}

export function getTodaysCounsel(date: Date = new Date()): CounselLesson {
  const { week, day } = getCounselLessonForToday(date);
  return mapStudyDayToCounselLesson(week, day);
}

/**
 * Backward-compatible export used by HomePage and other current components.
 */
export const todaysCounsel: CounselLesson = getTodaysCounsel();

/**
 * @deprecated Kept only for compatibility with any older imports.
 * Today's Counsel now flows from the 52-week study library engine.
 */
export const dailyCounselLessons: CounselLesson[] = [todaysCounsel];
