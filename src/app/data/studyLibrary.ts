export type StudyDay = {
  dayNumber: number;
  title: string;
  scriptureReference: string;
  scriptureText: string;
  leadershipPrinciple: string;
  teaching: string[];
  reflectionPrompt: string;
  actionStep: string;
  exploreFurther: string[];
};

export type StudyWeek = {
  weekNumber: number;
  theme: string;
  weeklyAim: string;
  biblicalLeader: string;
  summary: string;
  days: StudyDay[];
};

export type BiblicalLeader = {
  name: string;
  reference: string;
  summary: string;
  leadershipTheme: string;
};

export const ROTATION_START_DATE = '2026-04-28';

const week1Vision: StudyWeek = {
  weekNumber: 1,
  theme: 'Vision',
  weeklyAim:
    'Train the leader to receive vision from God, weigh it in private, and carry it with discipline before announcing it.',
  biblicalLeader: 'Nehemiah',
  summary:
    'Vision is not ambition with spiritual language. It is a God-given burden that shapes how a leader prays, plans, and persists.',
  days: [
    {
      dayNumber: 1,
      title: 'Vision Begins With a Burden',
      scriptureReference: 'Nehemiah 1:4 (KJV)',
      scriptureText:
        'And it came to pass, when I heard these words, that I sat down and wept, and mourned certain days, and fasted, and prayed before the God of heaven.',
      leadershipPrinciple:
        'Vision begins where a leader is willing to feel the weight of what is broken before he speaks about it.',
      teaching: [
        'Nehemiah did not start with a strategy. He started with grief. The walls of Jerusalem were broken, and the news struck him before any plan formed in his mind. That order matters: the leader carried the burden before he carried the assignment.',
        'Many leaders skip the burden and reach straight for the announcement. They want vision without the weight. Scripture refuses that path. Vision that has not been wept over rarely survives the cost it will require later.',
        'Today, do not look for inspiration. Look for what God has placed on your heart that you cannot ignore. That is where vision begins.',
      ],
      reflectionPrompt:
        'What broken thing do I keep walking past that God may be calling me to carry?',
      actionStep:
        'Write down one situation in your work, family, or community that grieves you. Sit with it long enough to pray honestly about it.',
      exploreFurther: ['How burden becomes assignment', 'The danger of borrowed vision'],
    },
    {
      dayNumber: 2,
      title: 'Vision Is Tested in Private',
      scriptureReference: 'Nehemiah 2:12 (KJV)',
      scriptureText:
        'And I arose in the night, I and some few men with me; neither told I any man what my God had put in my heart to do at Jerusalem.',
      leadershipPrinciple:
        'A leader protects vision in private long enough for it to become clear, sober, and ready for public weight.',
      teaching: [
        'Nehemiah inspected the walls at night, alone, before any public conversation. He refused to broadcast a vision he had not yet examined. That restraint is leadership maturity.',
        'Public vision that has not been tested in private becomes fragile. It collapses under questions, opposition, or delay. The leader who speaks too early often spends the rest of the project defending words he should not have said yet.',
        'Today, examine the work before you announce it. Silence is not weakness. It is stewardship of what God has shown you.',
      ],
      reflectionPrompt:
        'What part of my vision am I tempted to announce before I have examined it honestly?',
      actionStep:
        'Identify one decision you have been about to share. Wait 48 hours, walk it through prayer, and inspect it before you speak.',
      exploreFurther: ['Why premature vision fails', 'The discipline of the unseen leader'],
    },
    {
      dayNumber: 3,
      title: 'Vision Requires Counted Cost',
      scriptureReference: 'Luke 14:28 (KJV)',
      scriptureText:
        'For which of you, intending to build a tower, sitteth not down first, and counteth the cost, whether he have sufficient to finish it?',
      leadershipPrinciple:
        'Vision without sober calculation becomes presumption. A leader counts before he commits.',
      teaching: [
        'Jesus does not commend reckless faith. He commands the would-be builder to sit down and count. Vision is not measured by enthusiasm; it is measured by whether the work can be finished with what God has given.',
        'Leaders who skip this step build half-towers. They start what they cannot sustain, draw others into work they cannot complete, and damage the trust they need for future assignments.',
        'Today, treat counting the cost as obedience, not reluctance. The leader who refuses to calculate is not bold. He is unprepared.',
      ],
      reflectionPrompt:
        'What vision am I carrying that I have not honestly costed in time, money, or relational weight?',
      actionStep:
        'List the real cost of one vision you are pursuing — what it will require of your time, your finances, and the people closest to you.',
      exploreFurther: ['Counting the cost in leadership', 'Faith and sober calculation'],
    },
    {
      dayNumber: 4,
      title: 'Vision Survives Opposition',
      scriptureReference: 'Nehemiah 4:6 (KJV)',
      scriptureText:
        'So built we the wall; and all the wall was joined together unto the half thereof: for the people had a mind to work.',
      leadershipPrinciple:
        'God-given vision is not protected by the absence of opposition. It is proven by faithfulness through it.',
      teaching: [
        'Nehemiah built under threat. Sanballat and Tobiah mocked, schemed, and pressured. The wall still rose, because the people had a mind to work. Vision survives when leaders refuse to let opposition rewrite the assignment.',
        'Many leaders treat resistance as a sign that they heard God wrong. Often, it is the opposite. Resistance frequently confirms that the work matters. The question is not whether opposition will come, but whether the leader will keep building when it does.',
        'Today, do not measure your vision by how loud the opposition is. Measure it by whether the work is still worth finishing before God.',
      ],
      reflectionPrompt:
        'What opposition has tempted me to abandon a work God has not released me from?',
      actionStep:
        'Name the one voice — internal or external — that has weakened your resolve, and decide today how you will answer it without abandoning the work.',
      exploreFurther: ['Leading through resistance', 'When criticism becomes pressure'],
    },
    {
      dayNumber: 5,
      title: 'Vision Calls Others Into the Work',
      scriptureReference: 'Nehemiah 2:18 (KJV)',
      scriptureText:
        'Then I told them of the hand of my God which was good upon me; as also the king’s words that he had spoken unto me. And they said, Let us rise up and build. So they strengthened their hands for this good work.',
      leadershipPrinciple:
        'Vision is not finished when the leader sees it. It is finished when others can carry it with him.',
      teaching: [
        'Nehemiah did not build the wall alone. He invited others into the work by telling the truth: God’s hand was on it, and the moment was right. Vision becomes a movement when a leader transfers ownership without losing direction.',
        'Some leaders hoard vision. They want the credit, the control, or the protection of being the only one who sees it. That posture limits what God can do through them. Shared vision is not weakened vision; it is multiplied vision.',
        'Today, ask who needs to be invited in. The work was never meant to rest on one set of hands.',
      ],
      reflectionPrompt:
        'Who is ready to build with me that I have not yet invited into the work?',
      actionStep:
        'Identify one person to bring into your vision this week. Tell them clearly what God has put on your heart and what you need from them.',
      exploreFurther: ['Casting vision without manipulation', 'Sharing ownership wisely'],
    },
    {
      dayNumber: 6,
      title: 'Vision Stays Anchored in Prayer',
      scriptureReference: 'Nehemiah 4:9 (KJV)',
      scriptureText:
        'Nevertheless we made our prayer unto our God, and set a watch against them day and night, because of them.',
      leadershipPrinciple:
        'A vision that is not prayed over is a vision that has been quietly handed over to the leader’s own strength.',
      teaching: [
        'Nehemiah prayed and set a watch. He did not pretend prayer replaced preparation, and he did not pretend preparation replaced prayer. Both belonged to the work.',
        'A leader who prays only when he is desperate is not leading; he is reacting. A leader who plans without praying is not trusting God; he is trusting himself. Vision is sustained when prayer and preparation move together.',
        'Today, return the vision to God before you carry it any further. He gave it. He must keep it.',
      ],
      reflectionPrompt:
        'Which part of my vision have I been carrying without bringing it back to God in prayer?',
      actionStep:
        'Set aside ten honest minutes today to pray specifically over the vision you are leading, naming what is hard and what you need.',
      exploreFurther: ['Prayer as a leadership discipline', 'Praying without abandoning preparation'],
    },
    {
      dayNumber: 7,
      title: 'Vision Aims at God’s Glory',
      scriptureReference: 'Habakkuk 2:2 (KJV)',
      scriptureText:
        'And the LORD answered me, and said, Write the vision, and make it plain upon tables, that he may run that readeth it.',
      leadershipPrinciple:
        'Vision is not for the leader’s reputation. It is for God’s glory and the good of those who must run with it.',
      teaching: [
        'God told Habakkuk to write the vision plainly. The point was not the leader’s impression, but the runner’s clarity. Vision exists to move people toward what God is doing, not to elevate the one who saw it first.',
        'When a leader builds his vision around his own name, the work becomes brittle. When he builds it around God’s glory, the work becomes durable. The first depends on the leader; the second depends on God.',
        'Today, write your vision plainly. Ask whether someone running into the work could read it, understand it, and serve it without needing you in the center.',
      ],
      reflectionPrompt:
        'Whose name is at the center of the vision I am carrying — God’s or my own?',
      actionStep:
        'Write your current vision in three sentences a teammate could read and act on without you explaining it.',
      exploreFurther: ['Writing vision plainly', 'Vision that outlives the leader'],
    },
  ],
};

const week2Calling: StudyWeek = {
  weekNumber: 2,
  theme: 'Calling',
  weeklyAim:
    'Help the leader distinguish between ambition and calling, and learn to obey God’s assignment without inflating or shrinking from it.',
  biblicalLeader: 'Moses',
  summary:
    'Calling is not a feeling of destiny. It is the place where God’s assignment meets the leader’s obedience, often before the leader feels ready.',
  days: [
    {
      dayNumber: 1,
      title: 'Calling Comes From God, Not From Self',
      scriptureReference: 'Exodus 3:10 (KJV)',
      scriptureText:
        'Come now therefore, and I will send thee unto Pharaoh, that thou mayest bring forth my people the children of Israel out of Egypt.',
      leadershipPrinciple:
        'A leader does not appoint himself. Calling is received, not manufactured.',
      teaching: [
        'Moses did not volunteer at the burning bush. God sent him. That distinction protects every leader from the slow corruption of self-appointed authority.',
        'When a leader appoints himself, he has to defend his position with performance, image, and control. When God appoints him, he can lead with steadiness, because the assignment did not begin with him and does not depend on him.',
        'Today, recover the difference between ambition and calling. One drives a leader to be seen. The other steadies him to be sent.',
      ],
      reflectionPrompt:
        'Where am I trying to lead in a place God has not actually sent me?',
      actionStep:
        'Name one role you currently hold and answer honestly: did God place me here, or did I place myself?',
      exploreFurther: ['The difference between ambition and calling', 'Leading from sent authority'],
    },
    {
      dayNumber: 2,
      title: 'Calling Exposes Insufficiency',
      scriptureReference: 'Exodus 3:11 (KJV)',
      scriptureText:
        'And Moses said unto God, Who am I, that I should go unto Pharaoh, and that I should bring forth the children of Israel out of Egypt?',
      leadershipPrinciple:
        'A real calling will outsize the leader on purpose, so he learns to lean on God instead of himself.',
      teaching: [
        'Moses asked the right question: Who am I? Calling is meant to expose the leader’s insufficiency. If a leader is fully adequate for the assignment, he will lead in his own strength and credit himself for the result.',
        'God did not answer by inflating Moses. He answered with His own presence: I will be with thee. That is the pattern. Calling humbles the leader and then steadies him with God.',
        'Today, do not despise the gap between what is required and what you currently have. That gap is where God leads.',
      ],
      reflectionPrompt:
        'Where is the gap between my calling and my capacity, and how am I responding to it?',
      actionStep:
        'Write down one specific area where the assignment is bigger than you, and bring it to God in prayer rather than to your own strength.',
      exploreFurther: ['Calling and weakness', 'Why God assigns what we cannot finish alone'],
    },
    {
      dayNumber: 3,
      title: 'Calling Is Not Suspended By Excuses',
      scriptureReference: 'Exodus 4:10 (KJV)',
      scriptureText:
        'And Moses said unto the LORD, O my Lord, I am not eloquent, neither heretofore, nor since thou hast spoken unto thy servant: but I am slow of speech, and of a slow tongue.',
      leadershipPrinciple:
        'Excuses dressed as humility are still resistance. A leader is responsible to obey, not to feel ready.',
      teaching: [
        'Moses listed his weaknesses to God. The list was real. The conclusion was wrong. God did not change the assignment because Moses did not feel qualified.',
        'Many leaders use weakness as a way to delay obedience. They wait for confidence, eloquence, or clarity that God has not promised. Meanwhile, the assignment sits.',
        'Today, separate honesty from excuse. Tell God where you feel weak, but do not use that weakness as a reason to disobey what He has clearly placed in front of you.',
      ],
      reflectionPrompt:
        'What excuse have I been giving God that I now need to lay down?',
      actionStep:
        'Identify one task tied to your calling that you have been avoiding, and take the first concrete step today.',
      exploreFurther: ['Obedience without confidence', 'When humility becomes hesitation'],
    },
    {
      dayNumber: 4,
      title: 'Calling Comes With Equipping',
      scriptureReference: 'Exodus 4:12 (KJV)',
      scriptureText:
        'Now therefore go, and I will be with thy mouth, and teach thee what thou shalt say.',
      leadershipPrinciple:
        'God does not call without equipping. The leader’s job is to obey; God’s job is to supply.',
      teaching: [
        'God answered Moses’ fear with provision. He promised to be with his mouth and to teach him. The equipping was not stored in Moses; it was promised by God along the way.',
        'Leaders often want the equipping before the obedience. They wait until they feel resourced. But Scripture shows the opposite pattern: obedience first, equipping along the path.',
        'Today, take the next step in the calling and trust God to meet you with what is needed when it is needed.',
      ],
      reflectionPrompt:
        'Where am I waiting for resources before obeying when God has already told me to move?',
      actionStep:
        'Take one step in your calling today that you cannot fully resource yet, and watch how God supplies along the way.',
      exploreFurther: ['Equipping along the path', 'Obedience that precedes provision'],
    },
    {
      dayNumber: 5,
      title: 'Calling Is Carried With Others',
      scriptureReference: 'Exodus 4:14 (KJV)',
      scriptureText:
        'And the anger of the LORD was kindled against Moses, and he said, Is not Aaron the Levite thy brother? I know that he can speak well. And also, behold, he cometh forth to meet thee, and he will be glad of his heart.',
      leadershipPrinciple:
        'No leader is meant to carry calling alone. God provides companions for the assignment.',
      teaching: [
        'God gave Moses Aaron. The calling did not change, but the partnership was real. Scripture consistently places calling within community, not isolation.',
        'The leader who insists on carrying everything alone often does so out of pride or fear, not strength. Pride says, “Only I can do this.” Fear says, “No one else will help.” Both refuse the help God has already provided.',
        'Today, recognize the people God has placed alongside you. Calling is not weakened by partnership. It is sustained by it.',
      ],
      reflectionPrompt:
        'Who has God placed near me to help carry this calling that I have been keeping at a distance?',
      actionStep:
        'Reach out to one trusted person and ask them to walk with you in a specific area of your calling.',
      exploreFurther: ['Calling and companionship', 'Why isolation weakens leaders'],
    },
    {
      dayNumber: 6,
      title: 'Calling Endures Pharaoh',
      scriptureReference: 'Exodus 5:22 (KJV)',
      scriptureText:
        'And Moses returned unto the LORD, and said, Lord, wherefore hast thou so evil entreated this people? why is it that thou hast sent me?',
      leadershipPrinciple:
        'A real calling will be tested by resistance that the leader cannot control. Faithfulness, not outcome, is the measure.',
      teaching: [
        'Moses obeyed and the situation got worse before it got better. Pharaoh increased the burden on Israel, and Moses brought his confusion straight to God. That is mature leadership: question God honestly without abandoning the assignment.',
        'Many leaders interpret early resistance as evidence of failure. Often, it is evidence of warfare. The calling has not ended; it has entered the long middle.',
        'Today, do not measure your calling by the immediate outcome. Measure it by whether you are still walking with God through the difficulty.',
      ],
      reflectionPrompt:
        'Where am I tempted to abandon a calling because the outcome is delayed or harder than I expected?',
      actionStep:
        'Bring your honest frustration to God in prayer today, and recommit to the calling without rewriting it on your own terms.',
      exploreFurther: ['The long middle of obedience', 'Resistance as confirmation'],
    },
    {
      dayNumber: 7,
      title: 'Calling Is For God’s People, Not the Leader’s Glory',
      scriptureReference: 'Exodus 32:32 (KJV)',
      scriptureText:
        'Yet now, if thou wilt forgive their sin—; and if not, blot me, I pray thee, out of thy book which thou hast written.',
      leadershipPrinciple:
        'Calling matures when the leader cares more about the people God assigned to him than about his own standing.',
      teaching: [
        'Moses interceded for Israel even after their idolatry. He was willing to be blotted out if it would mean their forgiveness. That is the heart of mature calling: the leader is for the people, not above them.',
        'Immature calling uses the people for the leader’s reputation. Mature calling spends the leader for the people’s good. The first is common. The second is biblical.',
        'Today, ask whether you are leading for the people God gave you or using them to advance yourself. The answer reveals where your calling has matured and where it has not.',
      ],
      reflectionPrompt:
        'Am I spending myself for the people God has assigned to me, or am I spending them for my own goals?',
      actionStep:
        'Choose one person under your leadership and take a concrete action this week that costs you something for their good.',
      exploreFurther: ['Intercession as leadership', 'Spending yourself for the people'],
    },
  ],
};

const week3Character: StudyWeek = {
  weekNumber: 3,
  theme: 'Character',
  weeklyAim:
    'Form a leader whose private life can bear the weight of his public assignment, so that authority is carried without distortion.',
  biblicalLeader: 'Joseph',
  summary:
    'Character is what a leader is when no one is rewarding him for it. Without it, every other gift becomes dangerous.',
  days: [
    {
      dayNumber: 1,
      title: 'Character Is Built In Hidden Years',
      scriptureReference: 'Genesis 39:2 (KJV)',
      scriptureText:
        'And the LORD was with Joseph, and he was a prosperous man; and he was in the house of his master the Egyptian.',
      leadershipPrinciple:
        'God forms character in the leader long before He gives him the platform that requires it.',
      teaching: [
        'Joseph’s character was forged in Potiphar’s house, in prison, and in years of obscurity. By the time he stood before Pharaoh, the work was already done in private.',
        'Many leaders chase platform without permitting God to form them in the hidden years. When the platform comes, the gap shows. They have influence without inner stability, and the influence eventually exposes them.',
        'Today, treat the hidden season as formation, not delay. God is not wasting your time. He is preparing your character for what is coming.',
      ],
      reflectionPrompt:
        'How am I responding to the hidden parts of my life — as delay, or as formation?',
      actionStep:
        'Identify one private area God is shaping in you right now, and commit to faithfulness in it for the next thirty days.',
      exploreFurther: ['Hidden years and public weight', 'Why character must precede platform'],
    },
    {
      dayNumber: 2,
      title: 'Character Refuses Hidden Compromise',
      scriptureReference: 'Genesis 39:9 (KJV)',
      scriptureText:
        'There is none greater in this house than I; neither hath he kept back any thing from me but thee, because thou art his wife: how then can I do this great wickedness, and sin against God?',
      leadershipPrinciple:
        'A leader’s integrity is measured by what he refuses when no one would know.',
      teaching: [
        'Joseph’s refusal of Potiphar’s wife was not primarily about reputation. It was about God. He measured the temptation by who would be sinned against, not by who would find out.',
        'Hidden compromise corrodes the leader long before it is exposed. By the time it surfaces, the damage has already been done in private. The disciplined leader names sin honestly and refuses it early.',
        'Today, examine where you are negotiating with compromise that no one else can see. That is the front line of your character.',
      ],
      reflectionPrompt:
        'What hidden compromise am I tolerating that I would refuse if it were public?',
      actionStep:
        'Name one private behavior you have been justifying, and end it today before it costs you what God is preparing.',
      exploreFurther: ['Integrity without an audience', 'When character is decided'],
    },
    {
      dayNumber: 3,
      title: 'Character Holds Under Injustice',
      scriptureReference: 'Genesis 39:20 (KJV)',
      scriptureText:
        'And Joseph’s master took him, and put him into the prison, a place where the king’s prisoners were bound: and he was there in the prison.',
      leadershipPrinciple:
        'A leader’s character is proven when he is mistreated for doing the right thing.',
      teaching: [
        'Joseph did right and went to prison. The text does not soften that. He was punished for integrity, and Scripture still says God was with him in the prison.',
        'Leaders are tempted to abandon character when doing right does not pay. The mature leader holds his ground because his character is not a strategy. It is a covenant.',
        'Today, do not use injustice as permission to compromise. The God who is with you in the right thing is also with you when the right thing costs you.',
      ],
      reflectionPrompt:
        'Where am I tempted to lower my character because doing right has cost me?',
      actionStep:
        'Identify one place you have been wronged. Decide today how you will respond with integrity rather than retaliation.',
      exploreFurther: ['Integrity that costs', 'Leading well in unfair seasons'],
    },
    {
      dayNumber: 4,
      title: 'Character Stays Useful When Forgotten',
      scriptureReference: 'Genesis 40:23 (KJV)',
      scriptureText:
        'Yet did not the chief butler remember Joseph, but forgat him.',
      leadershipPrinciple:
        'A leader of character keeps serving faithfully even when the people who could promote him forget him.',
      teaching: [
        'Joseph helped the butler and was forgotten for two more years. He did not stop serving, did not turn bitter, and did not stop being useful in prison. His character did not depend on being remembered.',
        'Many leaders fade when their work is overlooked. They serve hard for visibility, and when visibility is denied, they grow resentful. Character serves whether or not anyone notices.',
        'Today, keep serving faithfully where you are, even if the people who could move you forward have not.',
      ],
      reflectionPrompt:
        'Where has being forgotten made me less faithful than I was when I was being noticed?',
      actionStep:
        'Choose one act of unseen faithfulness today and do it without telling anyone.',
      exploreFurther: ['Faithfulness without recognition', 'Resisting bitterness in obscurity'],
    },
    {
      dayNumber: 5,
      title: 'Character Carries Authority Without Pride',
      scriptureReference: 'Genesis 41:16 (KJV)',
      scriptureText:
        'And Joseph answered Pharaoh, saying, It is not in me: God shall give Pharaoh an answer of peace.',
      leadershipPrinciple:
        'A leader of character deflects glory back to God when his gifts are finally recognized.',
      teaching: [
        'Standing before Pharaoh, Joseph could have used the moment to elevate himself. Instead he said, It is not in me. The character formed in private would not allow him to steal credit in public.',
        'Pride waits for a platform to surface. A leader who has not been formed in private will collapse under the weight of public recognition. A leader who has been formed will redirect it.',
        'Today, when you are praised, practice returning the glory to God in your own heart before you do it with your mouth.',
      ],
      reflectionPrompt:
        'When I am recognized, where do my thoughts go first — to my own ability or to God?',
      actionStep:
        'The next time you receive credit, internally name what God did and what others did before you accept any praise for yourself.',
      exploreFurther: ['Receiving recognition with humility', 'Authority without self-promotion'],
    },
    {
      dayNumber: 6,
      title: 'Character Forgives Without Erasing Truth',
      scriptureReference: 'Genesis 50:20 (KJV)',
      scriptureText:
        'But as for you, ye thought evil against me; but God meant it unto good, to bring to pass, as it is now to day, to save much people alive.',
      leadershipPrinciple:
        'A leader of character names what was wrong and still chooses redemption over revenge.',
      teaching: [
        'Joseph did not pretend his brothers’ betrayal was small. He said clearly, “Ye thought evil against me.” Then he chose to interpret his life through God’s purpose, not his pain.',
        'Cheap forgiveness denies what happened. Bitter unforgiveness lives inside what happened. Mature character does neither. It tells the truth and then releases the offense to God.',
        'Today, identify a wound you are still carrying. Name it honestly before God and refuse to let it govern your leadership any longer.',
      ],
      reflectionPrompt:
        'What offense am I carrying that is still shaping how I lead?',
      actionStep:
        'Write down one specific offense, name it truthfully, and choose today to release it to God in prayer.',
      exploreFurther: ['Forgiveness without denial', 'Letting God redeem your story'],
    },
    {
      dayNumber: 7,
      title: 'Character Outlasts the Season',
      scriptureReference: 'Proverbs 10:9 (KJV)',
      scriptureText:
        'He that walketh uprightly walketh surely: but he that perverteth his ways shall be known.',
      leadershipPrinciple:
        'Character is a long road, not a single decision. Walking uprightly steadies a leader for the journey.',
      teaching: [
        'Proverbs is plain: integrity walks surely. The upright path may be slower, but it does not collapse. The crooked path looks shorter until it is exposed.',
        'Leaders are tempted to make exceptions for big moments. But character is rarely lost in one major decision. It is lost in many small ones until the leader no longer recognizes himself.',
        'Today, recommit to the long road. Walk uprightly in the small things, and trust God with the timing of the larger doors.',
      ],
      reflectionPrompt:
        'What small compromise have I started excusing because the season is hard?',
      actionStep:
        'Identify one small habit of integrity you have let slip, and recover it today.',
      exploreFurther: ['Integrity over a long road', 'Small decisions that shape leaders'],
    },
  ],
};

const week4ServantLeadership: StudyWeek = {
  weekNumber: 4,
  theme: 'Servant Leadership',
  weeklyAim:
    'Reorient the leader away from being served and toward serving, modeled on Christ, without losing authority or clarity.',
  biblicalLeader: 'Jesus',
  summary:
    'Servant leadership is not the absence of authority. It is authority used for the good of those under it, the way Christ used His.',
  days: [
    {
      dayNumber: 1,
      title: 'The Greatest Among You',
      scriptureReference: 'Mark 10:43 (KJV)',
      scriptureText:
        'But so shall it not be among you: but whosoever will be great among you, shall be your minister.',
      leadershipPrinciple:
        'Greatness in the kingdom is measured by whom you serve, not by who serves you.',
      teaching: [
        'Jesus rewrote the definition of greatness. Among His followers, the path upward runs through service. That was not metaphor; it was a command for how leaders would lead.',
        'Worldly leadership treats authority as a reward — the right to be served. Kingdom leadership treats authority as a responsibility — the duty to serve. Two leaders can hold the same title and live by entirely different definitions of greatness.',
        'Today, examine whether your leadership is oriented around being served or around serving. The answer reveals which kingdom you are leading from.',
      ],
      reflectionPrompt:
        'Where am I expecting to be served in a place where Christ would have me serve?',
      actionStep:
        'Choose one act of service this week toward someone who cannot return the favor, and do it without announcement.',
      exploreFurther: ['Greatness redefined by Christ', 'Authority as responsibility'],
    },
    {
      dayNumber: 2,
      title: 'The Towel Before the Throne',
      scriptureReference: 'John 13:14 (KJV)',
      scriptureText:
        'If I then, your Lord and Master, have washed your feet; ye also ought to wash one another’s feet.',
      leadershipPrinciple:
        'A leader who refuses the towel will misuse the throne.',
      teaching: [
        'Jesus, fully aware of His authority, picked up the towel. He did not lose authority by washing feet; He revealed what authority is for. Service did not diminish His leadership; it defined it.',
        'When leaders refuse low service, they slowly become unable to handle high authority. Pride builds in private until power becomes a weapon rather than a stewardship.',
        'Today, do something only you, in your role, can do — but in the form of service. That is the towel before the throne.',
      ],
      reflectionPrompt:
        'What act of low service is beneath me in my own thinking but not beneath Christ?',
      actionStep:
        'Identify one task you have been avoiding because of your role, and do it yourself today.',
      exploreFurther: ['Service and authority together', 'What pride refuses'],
    },
    {
      dayNumber: 3,
      title: 'Serving Without Losing Direction',
      scriptureReference: 'John 13:3 (KJV)',
      scriptureText:
        'Jesus knowing that the Father had given all things into his hands, and that he was come from God, and went to God;',
      leadershipPrinciple:
        'A leader can only serve without resentment when he is secure in who he is before God.',
      teaching: [
        'Before Jesus washed the disciples’ feet, the text records what He knew: where He came from, where He was going, and what the Father had placed in His hands. Identity preceded service.',
        'Leaders who serve from insecurity grow bitter. They serve to be seen, and when they are not seen, the service curdles. Leaders who serve from settled identity stay steady. Their service is not a performance.',
        'Today, ground yourself first in who God says you are. Then serve from that, not for it.',
      ],
      reflectionPrompt:
        'Am I serving to prove something, or because I am secure in who God has made me?',
      actionStep:
        'Before your next act of service today, take one minute to remember who God says you are, then serve from there.',
      exploreFurther: ['Identity before service', 'Avoiding bitter servanthood'],
    },
    {
      dayNumber: 4,
      title: 'Serving Without Surrendering Truth',
      scriptureReference: 'John 13:13 (KJV)',
      scriptureText:
        'Ye call me Master and Lord: and ye say well; for so I am.',
      leadershipPrinciple:
        'Servant leadership does not erase authority. It exercises authority in the form of service while still telling the truth.',
      teaching: [
        'Jesus washed feet and called Himself Master and Lord in the same conversation. He served without pretending He was not in charge. He led without using leadership as a privilege.',
        'Some leaders confuse servant leadership with passivity. They serve so much that they stop telling the truth, correcting error, or making hard decisions. That is not servanthood; that is abdication.',
        'Today, hold both together. Serve genuinely. Tell the truth clearly. Christ did both, and He did them at the same table.',
      ],
      reflectionPrompt:
        'Where have I confused serving with avoiding the truth I am responsible to speak?',
      actionStep:
        'Identify one truthful conversation you have been avoiding, and have it this week with steadiness, not harshness.',
      exploreFurther: ['Servanthood without abdication', 'Truth-telling as a form of service'],
    },
    {
      dayNumber: 5,
      title: 'Serving the Difficult Person',
      scriptureReference: 'John 13:5 (KJV)',
      scriptureText:
        'After that he poureth water into a bason, and began to wash the disciples’ feet, and to wipe them with the towel wherewith he was girded.',
      leadershipPrinciple:
        'A servant leader washes the feet of those he knows will fail him.',
      teaching: [
        'Jesus washed Judas’s feet. He served the betrayer alongside the others. That is not naivety; it is the cost of servant leadership in a real world.',
        'Many leaders only serve those who appreciate them. The harder discipline is to serve the difficult, the disloyal, and the unconvinced without becoming hard or sentimental about either group.',
        'Today, identify the person who is hardest for you to lead. Serve them concretely without lowering your standards.',
      ],
      reflectionPrompt:
        'Who is the person I am tempted to disengage from rather than continue to serve?',
      actionStep:
        'Take one specific action of service toward that person today, without expectation of return.',
      exploreFurther: ['Serving without sentimentality', 'Leading those who oppose you'],
    },
    {
      dayNumber: 6,
      title: 'Serving Until It Costs',
      scriptureReference: 'Mark 10:45 (KJV)',
      scriptureText:
        'For even the Son of man came not to be ministered unto, but to minister, and to give his life a ransom for many.',
      leadershipPrinciple:
        'A leader who will not pay a personal cost for those under him has not yet entered servant leadership.',
      teaching: [
        'Jesus’ service ended at the cross. Servant leadership in Scripture is not a style; it is a willingness to pay. The leader does not merely lead with kindness; he absorbs costs that others cannot.',
        'There are seasons in leadership when serving will cost the leader sleep, money, comfort, or reputation. The faithful leader pays without keeping a ledger.',
        'Today, ask where servant leadership is asking something costly of you, and accept that cost as part of the assignment.',
      ],
      reflectionPrompt:
        'What cost am I avoiding that servant leadership is calling me to absorb?',
      actionStep:
        'Identify one cost — time, comfort, or money — that you are willing to pay this week for the people you lead.',
      exploreFurther: ['Counting the cost of leading well', 'When service requires sacrifice'],
    },
    {
      dayNumber: 7,
      title: 'Serving Forms Other Servants',
      scriptureReference: 'John 13:15 (KJV)',
      scriptureText:
        'For I have given you an example, that ye should do as I have done to you.',
      leadershipPrinciple:
        'A servant leader does not merely serve. He shapes others into servants by what he models.',
      teaching: [
        'Jesus said the foot-washing was an example. He did not just serve them; He showed them how to lead the same way. Servant leadership is meant to be reproduced, not admired.',
        'A leader who serves without forming other servants creates a culture that depends on him. A leader who serves and teaches it creates a culture that outlives him.',
        'Today, ask who is watching you lead and what they are learning. They are being shaped, whether you intend it or not.',
      ],
      reflectionPrompt:
        'What kind of leader am I forming through the way I lead?',
      actionStep:
        'Choose one person you are responsible for, and intentionally model and explain one aspect of servant leadership to them this week.',
      exploreFurther: ['Reproducing servant leaders', 'Culture shaped by what is modeled'],
    },
  ],
};

const builtWeeks: StudyWeek[] = [
  week1Vision,
  week2Calling,
  week3Character,
  week4ServantLeadership,
];

type WeekRoadmapEntry = {
  weekNumber: number;
  theme: string;
  weeklyAim: string;
  biblicalLeader: string;
  summary: string;
};

const remainingWeeks: WeekRoadmapEntry[] = [
  {
    weekNumber: 5,
    theme: 'Influence',
    weeklyAim: 'Examine influence as stewardship rather than status.',
    biblicalLeader: 'Daniel',
    summary:
      'Influence is the weight a leader carries with others. It must be earned with integrity and used for their good.',
  },
  {
    weekNumber: 6,
    theme: 'Faithfulness',
    weeklyAim: 'Train the leader to be reliable in small and unseen things over time.',
    biblicalLeader: 'Joseph',
    summary:
      'Faithfulness is the slow, steady obedience that prepares a leader for greater responsibility.',
  },
  {
    weekNumber: 7,
    theme: 'Wisdom',
    weeklyAim: 'Pursue wisdom as a working leadership discipline, not an abstract idea.',
    biblicalLeader: 'Solomon',
    summary:
      'Wisdom is the skill of applying truth to actual decisions, people, and pressures.',
  },
  {
    weekNumber: 8,
    theme: 'Discipline',
    weeklyAim: 'Build the inner discipline that protects long-term leadership.',
    biblicalLeader: 'Paul',
    summary:
      'Discipline is the daily order that keeps a leader’s appetites and habits under God.',
  },
  {
    weekNumber: 9,
    theme: 'Humility',
    weeklyAim: 'Form humility as the posture from which all godly leadership operates.',
    biblicalLeader: 'Moses',
    summary:
      'Humility is not weakness. It is the leader knowing his place under God and refusing to rise above it.',
  },
  {
    weekNumber: 10,
    theme: 'Integrity',
    weeklyAim: 'Strengthen the alignment between the leader’s private life and public role.',
    biblicalLeader: 'Daniel',
    summary:
      'Integrity is the wholeness that allows a leader to be the same person in every room.',
  },
  {
    weekNumber: 11,
    theme: 'Responsibility',
    weeklyAim: 'Train the leader to own outcomes without blame-shifting.',
    biblicalLeader: 'Nehemiah',
    summary:
      'Responsibility is the willingness to answer for what is in your hands, even when it is hard.',
  },
  {
    weekNumber: 12,
    theme: 'Decision-Making',
    weeklyAim: 'Develop a Scripture-shaped framework for sober, timely decisions.',
    biblicalLeader: 'Solomon',
    summary:
      'Decision-making is the leader’s ongoing test, where wisdom, courage, and humility meet.',
  },
  {
    weekNumber: 13,
    theme: 'Courage',
    weeklyAim: 'Cultivate obedient courage, not personality boldness.',
    biblicalLeader: 'Joshua',
    summary:
      'Courage is acting on what God has said, even when fear is present and outcomes are uncertain.',
  },
  {
    weekNumber: 14,
    theme: 'Communication',
    weeklyAim: 'Lead through clear, truthful, and disciplined speech.',
    biblicalLeader: 'Paul',
    summary:
      'Communication is the careful use of words to build people up and clarify the work.',
  },
  {
    weekNumber: 15,
    theme: 'Consistency',
    weeklyAim: 'Build the steady character that does not change with circumstances.',
    biblicalLeader: 'Daniel',
    summary:
      'Consistency is the leader’s sameness over time that makes him trustworthy under pressure.',
  },
  {
    weekNumber: 16,
    theme: 'Growth',
    weeklyAim: 'Stay teachable as a continual leadership habit.',
    biblicalLeader: 'Apollos',
    summary:
      'Growth is the leader’s lifelong willingness to be corrected, sharpened, and stretched.',
  },
  {
    weekNumber: 17,
    theme: 'Stewardship',
    weeklyAim: 'Lead as a manager of what God has entrusted, not as an owner.',
    biblicalLeader: 'Joseph',
    summary:
      'Stewardship is the conviction that everything in the leader’s hands belongs to God first.',
  },
  {
    weekNumber: 18,
    theme: 'Teamwork',
    weeklyAim: 'Build leaders who function inside a team without dominating or hiding.',
    biblicalLeader: 'Nehemiah',
    summary:
      'Teamwork is the disciplined coordination of gifts toward a shared, God-honoring outcome.',
  },
  {
    weekNumber: 19,
    theme: 'Trust',
    weeklyAim: 'Earn and protect the trust required to lead long-term.',
    biblicalLeader: 'David',
    summary:
      'Trust is built slowly through truth, follow-through, and care, and lost quickly through compromise.',
  },
  {
    weekNumber: 20,
    theme: 'Excellence',
    weeklyAim: 'Pursue excellence as worship, not perfectionism.',
    biblicalLeader: 'Bezalel',
    summary:
      'Excellence is doing the work as unto the Lord, not as performance for people.',
  },
  {
    weekNumber: 21,
    theme: 'Accountability',
    weeklyAim: 'Submit leadership to honest accountability before consequences force it.',
    biblicalLeader: 'David',
    summary:
      'Accountability is the leader’s willingness to be known, corrected, and adjusted by trustworthy voices.',
  },
  {
    weekNumber: 22,
    theme: 'Patience',
    weeklyAim: 'Lead steadily through delay without abandoning the assignment.',
    biblicalLeader: 'Abraham',
    summary:
      'Patience is the long endurance that keeps the leader faithful while God’s timing unfolds.',
  },
  {
    weekNumber: 23,
    theme: 'Preparation',
    weeklyAim: 'Honor preparation as part of the assignment, not an interruption to it.',
    biblicalLeader: 'David',
    summary:
      'Preparation is the unseen labor that makes the public moment possible and durable.',
  },
  {
    weekNumber: 24,
    theme: 'Prayer',
    weeklyAim: 'Anchor leadership in real, ongoing prayer rather than crisis prayer.',
    biblicalLeader: 'Jesus',
    summary:
      'Prayer is the leader’s primary work, where vision, decisions, and people are first carried.',
  },
  {
    weekNumber: 25,
    theme: 'Persistence',
    weeklyAim: 'Endure resistance and discouragement without quitting the assignment.',
    biblicalLeader: 'Paul',
    summary:
      'Persistence is the long obedience that carries a leader through opposition and fatigue.',
  },
  {
    weekNumber: 26,
    theme: 'Empathy',
    weeklyAim: 'Lead with informed compassion, not sentimentality.',
    biblicalLeader: 'Jesus',
    summary:
      'Empathy is the leader’s willingness to understand the weight others carry without losing direction.',
  },
  {
    weekNumber: 27,
    theme: 'Conflict Resolution',
    weeklyAim: 'Address conflict early, truthfully, and with the people involved.',
    biblicalLeader: 'Paul',
    summary:
      'Conflict resolution is the disciplined work of restoring clarity and trust between people.',
  },
  {
    weekNumber: 28,
    theme: 'Mentorship',
    weeklyAim: 'Invest deliberately in the next generation of leaders.',
    biblicalLeader: 'Paul',
    summary:
      'Mentorship is the deliberate transfer of conviction, skill, and counsel into others.',
  },
  {
    weekNumber: 29,
    theme: 'Delegation',
    weeklyAim: 'Release responsibility wisely without abandoning oversight.',
    biblicalLeader: 'Moses',
    summary:
      'Delegation is the leader entrusting the right work to the right people with clear authority and accountability.',
  },
  {
    weekNumber: 30,
    theme: 'Self-Control',
    weeklyAim: 'Govern speech, appetite, and reaction under pressure.',
    biblicalLeader: 'Paul',
    summary:
      'Self-control is the inner rule that prevents the leader from becoming his own worst threat.',
  },
  {
    weekNumber: 31,
    theme: 'Gratitude',
    weeklyAim: 'Cultivate gratitude as a leadership posture against entitlement.',
    biblicalLeader: 'David',
    summary:
      'Gratitude orients the leader to God’s grace and keeps pride from quietly taking root.',
  },
  {
    weekNumber: 32,
    theme: 'Purpose',
    weeklyAim: 'Anchor leadership in God-given purpose, not borrowed ambition.',
    biblicalLeader: 'Paul',
    summary:
      'Purpose is the settled understanding of why the leader is doing what he is doing before God.',
  },
  {
    weekNumber: 33,
    theme: 'Resilience',
    weeklyAim: 'Recover wisely from setbacks without becoming hardened.',
    biblicalLeader: 'David',
    summary:
      'Resilience is the leader’s capacity to return to the work after failure, loss, or attack.',
  },
  {
    weekNumber: 34,
    theme: 'Focus',
    weeklyAim: 'Protect attention from drift, distraction, and noise.',
    biblicalLeader: 'Nehemiah',
    summary:
      'Focus is the discipline of staying with the assignment when many voices try to pull the leader away.',
  },
  {
    weekNumber: 35,
    theme: 'Planning',
    weeklyAim: 'Plan with prayerful intentionality and held expectations.',
    biblicalLeader: 'Nehemiah',
    summary:
      'Planning is the careful arrangement of next steps under God’s direction, held with open hands.',
  },
  {
    weekNumber: 36,
    theme: 'Generosity',
    weeklyAim: 'Lead with open-handed generosity in time, attention, and resources.',
    biblicalLeader: 'Barnabas',
    summary:
      'Generosity reflects God’s own character and breaks the grip of self-interest in leadership.',
  },
  {
    weekNumber: 37,
    theme: 'Listening',
    weeklyAim: 'Become a leader who hears people and Scripture before he speaks.',
    biblicalLeader: 'James',
    summary:
      'Listening is the active discipline of hearing carefully before forming or sharing a response.',
  },
  {
    weekNumber: 38,
    theme: 'Respect',
    weeklyAim: 'Treat every person under your leadership with God-grounded respect.',
    biblicalLeader: 'Paul',
    summary:
      'Respect honors the image of God in every person the leader leads, regardless of position.',
  },
  {
    weekNumber: 39,
    theme: 'Leadership Under Pressure',
    weeklyAim: 'Keep wisdom, faith, and integrity intact under high stress.',
    biblicalLeader: 'David',
    summary:
      'Pressure exposes what a leader truly trusts and reveals where formation is still needed.',
  },
  {
    weekNumber: 40,
    theme: 'Adaptability',
    weeklyAim: 'Adjust methods without compromising convictions.',
    biblicalLeader: 'Paul',
    summary:
      'Adaptability is the leader’s ability to change approach while holding fixed truth steady.',
  },
  {
    weekNumber: 41,
    theme: 'Unity',
    weeklyAim: 'Build unity rooted in truth, not surface agreement.',
    biblicalLeader: 'Jesus',
    summary:
      'Unity is the costly, deliberate work of keeping people aligned around what matters most.',
  },
  {
    weekNumber: 42,
    theme: 'Vision Casting',
    weeklyAim: 'Communicate vision so others can carry it with clarity.',
    biblicalLeader: 'Nehemiah',
    summary:
      'Vision casting is the work of making the assignment plain enough for others to run with it.',
  },
  {
    weekNumber: 43,
    theme: 'People Development',
    weeklyAim: 'Develop people as a primary outcome of your leadership, not a side effect.',
    biblicalLeader: 'Jesus',
    summary:
      'People development is the deliberate growth of those under your care into mature, capable servants.',
  },
  {
    weekNumber: 44,
    theme: 'Time Management',
    weeklyAim: 'Steward time as a finite trust from God.',
    biblicalLeader: 'Paul',
    summary:
      'Time management is the ordering of hours so the most important work actually gets done.',
  },
  {
    weekNumber: 45,
    theme: 'Sacrifice',
    weeklyAim: 'Embrace personal cost as part of God-honoring leadership.',
    biblicalLeader: 'Jesus',
    summary:
      'Sacrifice is the willingness to lay down comfort, preference, or right for the sake of the assignment.',
  },
  {
    weekNumber: 46,
    theme: 'Hope',
    weeklyAim: 'Lead from hope grounded in God’s character, not in circumstances.',
    biblicalLeader: 'Paul',
    summary:
      'Hope steadies the leader when outcomes are uncertain and progress is slow.',
  },
  {
    weekNumber: 47,
    theme: 'Faith',
    weeklyAim: 'Lead by faith in God’s word, not by sight or confidence.',
    biblicalLeader: 'Abraham',
    summary:
      'Faith is the leader’s settled trust in what God has spoken, even when the evidence has not arrived.',
  },
  {
    weekNumber: 48,
    theme: 'Justice',
    weeklyAim: 'Pursue justice in decisions, treatment, and use of authority.',
    biblicalLeader: 'Moses',
    summary:
      'Justice is doing right by people in a way that reflects God’s righteousness and care for the weak.',
  },
  {
    weekNumber: 49,
    theme: 'Influence Through Example',
    weeklyAim: 'Lead primarily by the life others can see, not the words they hear.',
    biblicalLeader: 'Paul',
    summary:
      'Influence through example is the slow, durable leadership that shapes others by what they observe.',
  },
  {
    weekNumber: 50,
    theme: 'Renewal',
    weeklyAim: 'Renew strength, vision, and devotion before depletion forces it.',
    biblicalLeader: 'Elijah',
    summary:
      'Renewal is the disciplined return to God for rest, perspective, and fresh resolve.',
  },
  {
    weekNumber: 51,
    theme: 'Legacy',
    weeklyAim: 'Lead with what you will leave behind clearly in view.',
    biblicalLeader: 'David',
    summary:
      'Legacy is the long shadow of a leader’s life — the people, principles, and patterns that outlive him.',
  },
  {
    weekNumber: 52,
    theme: 'Multiplication',
    weeklyAim: 'Aim leadership at multiplying other faithful leaders.',
    biblicalLeader: 'Paul',
    summary:
      'Multiplication is the final test of leadership — whether it produces more godly leaders, not just followers.',
  },
];

const roadmapWeeks: StudyWeek[] = remainingWeeks.map((entry) => ({
  ...entry,
  days: [],
}));

export const leadershipSeries: StudyWeek[] = [...builtWeeks, ...roadmapWeeks];

export const biblicalLeaders: BiblicalLeader[] = [
  {
    name: 'Moses',
    reference: 'Exodus 3–4',
    summary:
      'A reluctant leader who learned to obey God’s assignment despite his own sense of insufficiency.',
    leadershipTheme: 'Calling, humility, and intercession.',
  },
  {
    name: 'David',
    reference: '1 Samuel 16–17; 2 Samuel 11–12',
    summary:
      'A shepherd-king whose strength and failure both teach how God forms leaders over a lifetime.',
    leadershipTheme: 'Heart formation, repentance, and faithful courage.',
  },
  {
    name: 'Nehemiah',
    reference: 'Nehemiah 1–6',
    summary:
      'A builder-leader who paired prayer with planning to rebuild what was broken under heavy resistance.',
    leadershipTheme: 'Vision, planning, and resilient leadership.',
  },
  {
    name: 'Jesus',
    reference: 'Mark 10:42–45; John 13:1–17',
    summary:
      'The defining model of servant leadership, exercising full authority for the good of those He led.',
    leadershipTheme: 'Servant leadership and authority under the Father.',
  },
  {
    name: 'Paul',
    reference: 'Acts 20; 2 Timothy 2',
    summary:
      'An apostle who built churches and leaders by faithful teaching, hard suffering, and intentional mentoring.',
    leadershipTheme: 'Endurance, mentorship, and gospel discipline.',
  },
  {
    name: 'Joseph',
    reference: 'Genesis 37–50',
    summary:
      'A man whose hidden years of integrity and faithfulness prepared him for high authority without corruption.',
    leadershipTheme: 'Character, hidden formation, and forgiveness.',
  },
  {
    name: 'Daniel',
    reference: 'Daniel 1; 6',
    summary:
      'A leader of unwavering integrity inside a hostile system, used by God across decades and regimes.',
    leadershipTheme: 'Integrity, prayer, and influence without compromise.',
  },
  {
    name: 'Esther',
    reference: 'Esther 4–7',
    summary:
      'A leader who used position and risk for her people, recognizing the moment God had set before her.',
    leadershipTheme: 'Courage, timing, and stewardship of position.',
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

export function getCurrentStudyWeek(date: Date = new Date()): StudyWeek {
  const daysElapsed = getDaysSinceStart(date);
  const weekIndex = Math.floor(daysElapsed / 7) % 52;
  return leadershipSeries[weekIndex];
}

export function getCurrentStudyDay(date: Date = new Date()): {
  week: StudyWeek;
  day: StudyDay;
  weekIndex: number;
  dayIndex: number;
} {
  const daysElapsed = getDaysSinceStart(date);
  const weekIndex = Math.floor(daysElapsed / 7) % 52;
  const dayIndex = daysElapsed % 7;

  let week = leadershipSeries[weekIndex];

  // Fall back gracefully if the rotated week has no built days yet.
  if (!week.days || week.days.length === 0) {
    const fallbackWeek = builtWeeks[weekIndex % builtWeeks.length];
    const fallbackDay = fallbackWeek.days[dayIndex % fallbackWeek.days.length];

    return {
      week: fallbackWeek,
      day: fallbackDay,
      weekIndex,
      dayIndex,
    };
  }

  const day = week.days[dayIndex % week.days.length];

  return {
    week,
    day,
    weekIndex,
    dayIndex,
  };
}

export function getCounselLessonForToday(date: Date = new Date()) {
  return getCurrentStudyDay(date);
}