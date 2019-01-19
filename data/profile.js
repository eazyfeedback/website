import faker from "faker";

export default function getProfile() {
  return {
    reviewed: faker.random.number(),
    submitted: faker.random.number()
  };
}
