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

const ROTATION_START_DATE = '2026-04-28';

export const dailyCounselLessons: CounselLesson[] = [
  {
    eyebrow: 'Daily Counsel',
    title: 'Count the Cost Before You Build',
    subheading:
      'A leader does not move on impulse. He measures the weight of the work before he puts his hand to it.',
    scriptureReference: 'Luke 14:28 (KJV)',
    scriptureText:
      'For which of you, intending to build a tower, sitteth not down first, and counteth the cost, whether he have sufficient to finish it?',
    leadershipPrinciple:
      'Vision without sober calculation becomes presumption. Biblical leadership requires disciplined judgment before public commitment.',
    teaching: [
      'Jesus does not praise reckless movement. He teaches the leader to sit down first, count the cost, and determine whether the work can be finished. The order matters: counsel before construction, wisdom before announcement, stewardship before visibility.',
      'Many leaders damage trust by beginning what they cannot sustain. They mistake energy for readiness. They launch before they have counted the people, the cost, the resistance, and the burden of finishing well.',
      'Today’s command is simple: do not confuse conviction with haste. If the work is from God, it can withstand sober examination. Count the cost, strengthen the plan, then move with discipline.',
    ],
    reflectionPrompts: [
      'Where am I moving faster than my wisdom, capacity, or preparation can support?',
      'What commitment have I made that now requires clearer structure, stronger counsel, or a harder conversation?',
      'What must I count honestly before I ask others to follow me?',
    ],
  },
  {
    eyebrow: 'Daily Counsel',
    title: 'Integrity Before Influence',
    subheading:
      'A leader’s influence is only as strong as the integrity that carries it.',
    scriptureReference: 'Proverbs 11:3 (KJV)',
    scriptureText:
      'The integrity of the upright shall guide them: but the perverseness of transgressors shall destroy them.',
    leadershipPrinciple:
      'Influence without integrity becomes manipulation. Biblical leadership begins with a life that can bear inspection.',
    teaching: [
      'The Scripture does not treat integrity as a private virtue only. It is a governing force. Integrity guides the upright because it keeps the leader from needing two versions of himself: one seen publicly and one hidden privately.',
      'A leader loses authority when his words outrun his character. People may follow charisma for a season, but they trust integrity over time. The leader who wants lasting influence must first become trustworthy when no one is rewarding him for it.',
      'Today, do not ask how to gain more influence before asking whether your current influence is being carried cleanly. Integrity protects the mission by protecting the vessel.',
    ],
    reflectionPrompts: [
      'Where is my public leadership stronger than my private discipline?',
      'What decision would become clearer if I refused to protect my image?',
      'Who is affected if I lead with influence but not integrity?',
    ],
  },
  {
    eyebrow: 'Daily Counsel',
    title: 'Wisdom Under Pressure',
    subheading:
      'Pressure reveals whether a leader is governed by wisdom or driven by reaction.',
    scriptureReference: 'James 1:5 (KJV)',
    scriptureText:
      'If any of you lack wisdom, let him ask of God, that giveth to all men liberally, and upbraideth not; and it shall be given him.',
    leadershipPrinciple:
      'Pressure is not permission to abandon wisdom. The biblical leader slows down long enough to seek God before acting.',
    teaching: [
      'James does not tell the lacking man to pretend he has wisdom. He tells him to ask God. That is leadership humility: admitting the moment requires more than instinct, experience, or emotion.',
      'Pressure often creates false urgency. It makes the loudest option feel like the right option. But spiritual leadership does not confuse speed with obedience. The wise leader asks, listens, weighs, and then moves.',
      'Today, treat pressure as a signal to seek wisdom, not as a command to react. The leader who pauses before God is not weak. He is governed.',
    ],
    reflectionPrompts: [
      'What pressure am I allowing to make decisions for me?',
      'Where do I need wisdom more than speed?',
      'What would change if I paused before responding?',
    ],
  },
  {
    eyebrow: 'Daily Counsel',
    title: 'Courage Without Pride',
    subheading:
      'Biblical courage does not need applause. It obeys because God has spoken.',
    scriptureReference: 'Joshua 1:9 (KJV)',
    scriptureText:
      'Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest.',
    leadershipPrinciple:
      'Courage is not loud confidence. It is obedient action under God’s authority.',
    teaching: [
      'God’s command to Joshua was not rooted in Joshua’s personality. It was rooted in God’s presence. That matters for every leader. Courage is not self-belief dressed in religious language. Courage is obedience because God is with the leader in the assignment.',
      'Pride performs bravery for people. Courage obeys before God. One seeks recognition; the other accepts responsibility. A leader must learn the difference before pressure exposes the motive.',
      'Today, do not wait until fear disappears. If the path is right, move with humility and courage. God does not require arrogance from a leader. He requires obedience.',
    ],
    reflectionPrompts: [
      'Where am I calling delay “wisdom” when it is really fear?',
      'What courageous action would obedience require today?',
      'How can I move forward without needing to prove myself?',
    ],
  },
  {
    eyebrow: 'Daily Counsel',
    title: 'Steward the Weight You Carry',
    subheading:
      'Leadership is not ownership. It is stewardship before God.',
    scriptureReference: '1 Corinthians 4:2 (KJV)',
    scriptureText:
      'Moreover it is required in stewards, that a man be found faithful.',
    leadershipPrinciple:
      'A biblical leader does not treat responsibility as possession. He manages what God has entrusted to him with faithfulness.',
    teaching: [
      'Paul defines the steward by faithfulness, not applause, scale, or visibility. That is a needed correction for leaders. The question is not merely “How much do I oversee?” but “Am I faithful with what has been placed in my hands?”',
      'Stewardship changes how a leader handles people, money, opportunity, and authority. Nothing is casual when it has been entrusted. The faithful leader does not exploit the assignment; he preserves it, strengthens it, and answers to God for it.',
      'Today, lead as one who will give account. That mindset does not make leadership heavy in the wrong way. It makes leadership holy.',
    ],
    reflectionPrompts: [
      'What responsibility have I treated too casually?',
      'Where do I need to become more faithful before asking for more influence?',
      'Who or what has God entrusted to me that needs better care?',
    ],
  },
  {
    eyebrow: 'Daily Counsel',
    title: 'Discipline Before Visibility',
    subheading:
      'What a leader builds in secret determines what he can carry in public.',
    scriptureReference: 'Proverbs 25:28 (KJV)',
    scriptureText:
      'He that hath no rule over his own spirit is like a city that is broken down, and without walls.',
    leadershipPrinciple:
      'A leader without self-government becomes vulnerable under pressure. Discipline is protection before it is performance.',
    teaching: [
      'Proverbs compares the undisciplined person to a city without walls. That is not a small warning. Without inner rule, the leader becomes exposed to impulse, anger, appetite, pride, and fear.',
      'Visibility increases pressure. If discipline is weak in private, public responsibility will reveal it. The wise leader strengthens the walls before asking for a larger platform.',
      'Today, do not despise small disciplines. Prayer, restraint, preparation, order, and consistency are not minor things. They are walls around the leader’s calling.',
    ],
    reflectionPrompts: [
      'Where am I most vulnerable because I lack discipline?',
      'What private habit is weakening my public leadership?',
      'What wall needs to be rebuilt before I take on more responsibility?',
    ],
  },
  {
    eyebrow: 'Daily Counsel',
    title: 'Lead With Humility',
    subheading:
      'A leader who cannot be corrected cannot be trusted with authority.',
    scriptureReference: 'Proverbs 15:22 (KJV)',
    scriptureText:
      'Without counsel purposes are disappointed: but in the multitude of counsellors they are established.',
    leadershipPrinciple:
      'Humility does not weaken leadership. It protects decisions from isolation, pride, and blind spots.',
    teaching: [
      'Scripture does not present counsel as optional decoration around leadership. It presents counsel as protection. Plans fail when a leader isolates himself, but they are established when wisdom is invited in.',
      'Pride says, “I already know.” Humility says, “I may be missing something.” That posture does not make a leader indecisive. It makes him safer to follow.',
      'Today, invite counsel before consequences force correction. The strongest leaders do not fear wise voices. They make room for them.',
    ],
    reflectionPrompts: [
      'Where have I been leading in isolation?',
      'Who has permission to challenge my thinking?',
      'What decision needs counsel before I move forward?',
    ],
  },
];

function getLocalDateKey(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
}

function getDaysSinceStart(date: Date) {
  const start = new Date(`${ROTATION_START_DATE}T00:00:00`);
  const startKey = getLocalDateKey(start);
  const todayKey = getLocalDateKey(date);

  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  return Math.max(0, Math.floor((todayKey - startKey) / millisecondsPerDay));
}

export function getTodaysCounsel(date = new Date()): CounselLesson {
  const daysElapsed = getDaysSinceStart(date);
  const lessonIndex = daysElapsed % dailyCounselLessons.length;

  return dailyCounselLessons[lessonIndex];
}

/**
 * Backward-compatible export.
 * Existing components can keep importing `todaysCounsel`.
 * This value is calculated when the app loads, so it changes by date without storage.
 */
export const todaysCounsel: CounselLesson = getTodaysCounsel();
