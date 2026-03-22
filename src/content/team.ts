export type TeamMember = { name: string; ucid: string; role?: string };

export const TEAM_MEMBERS: TeamMember[] = [
  { name: "Ali Chaudhary", ucid: "30204228", role: "Team Lead" },
  { name: "Tyseer Shahriar", ucid: "30206937" },
  { name: "Mujtaba Zia", ucid: "30229568" },
  { name: "Yassin Soliman", ucid: "30205455" },
  { name: "Mykola Viktorovskyi", ucid: "30233216" },
];

export const COURSE_LINE = "ENSF 400: Software Engineering · Section L01";
export const GROUP_LABEL = "Group 12";

/** Small caps line above the hero lockup (matches earlier deck styling). */
export const HERO_TOP_LINE = `ENSF 400 · ${GROUP_LABEL}`;
