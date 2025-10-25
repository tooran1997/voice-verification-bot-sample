// dialog/flow.js
// A minimal finite state machine for a 7-question qualification flow.
export const QUESTIONS = [
  { id: 1, text: "May I confirm you are the decision maker for final expense coverage?", key: "decision_maker" },
  { id: 2, text: "Are you currently covered by any final expense plan?", key: "has_coverage" },
  { id: 3, text: "What is your age bracket: under 50, 50–65, or 66 and above?", key: "age_bracket" },
  { id: 4, text: "Do you have any major health conditions we should know about?", key: "health_flag" },
  { id: 5, text: "Which state are you in?", key: "state" },
  { id: 6, text: "What is your preferred call-back time?", key: "callback_time" },
  { id: 7, text: "Can I transfer you now to a licensed specialist?", key: "transfer_consent" }
];

// Very basic scoring/qualification logic (customize as you like).
export function evaluateQualification(answers) {
  const dm = answers.decision_maker?.toLowerCase() ?? "";
  const consent = answers.transfer_consent?.toLowerCase() ?? "";
  const covered = answers.has_coverage?.toLowerCase() ?? "";
  const age = answers.age_bracket?.toLowerCase() ?? "";

  let score = 0;
  if (dm.includes("yes")) score += 1;
  if (consent.includes("yes")) score += 2;
  if (covered.includes("no")) score += 1;
  if (age.includes("50") || age.includes("65") || age.includes("66")) score += 1;

  const qualified = score >= 3;
  return { qualified, score };
}
