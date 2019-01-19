import faker from "faker";
import { getStages, getAreasSummary } from "./text";

const stages = getStages();
const areas = getAreasSummary();

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const selectRandom = (array, n) =>
  array.sort(() => 0.5 - Math.random()).slice(0, n);

function generateEssay() {
  return {
    stage: selectRandom(stages, 1)[0],
    areas: selectRandom(areas, getRandomIntInclusive(1, 4)),
    questions: faker.lorem.sentences(getRandomIntInclusive(1, 3)).split(". ")
  };
}

function generate(n) {
  return Array.from(Array(n), () => generateEssay());
}

export default generate;
