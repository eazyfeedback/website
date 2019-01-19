import faker from "faker";

export function getStages() {
  return [
    "Early polished draft",
    "Revised draft",
    "Late or final polished draft"
  ];
}

export function getAreas() {
  return [
    "Interpretation/analysis i.e. Does my argument make sense? Is it logical and consistent?",
    "Organization i.e. Are my ideas in a useful order? Is there another way to consider ordering?",
    "Flow i.e. Do I have good transitions? Can the reader follow me?",
    "Style i.e. Is my writing style appealing? Do I use the passive voice too often?"
  ];
}

export function getAreasSummary() {
  return ["Interpretation/analysis", "Organization", "Flow", "Style"];
}
