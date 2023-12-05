const testInput = `A Y
B X
C Z`;

import { rounds } from "./data";

/*

Part 1

const scoring = {
  X: 1,
  Y: 2,
  Z: 3,
  A: { X: 3, Y: 6, Z: 0 },
  B: { X: 0, Y: 3, Z: 6 },
  C: { X: 6, Y: 0, Z: 3 },
};

const determineScore = (input) => {
  const rounds = input.split("\n");
  const output = rounds.reduce((score, round) => {
    const [theirs, mine] = round.split(" ");
    score += scoring[mine] + scoring[theirs][mine];
    return score;
  }, 0);

  console.log(output);
};

determineScore(rounds);\
*/

const scoring = {
  X: 0,
  Y: 3,
  Z: 6,
  A: { P: 1, X: "C", Y: "A", Z: "B" },
  B: { P: 2, X: "A", Y: "B", Z: "C" },
  C: { P: 3, X: "B", Y: "C", Z: "A" },
};

const determineScore = (input: string) => {
  const rounds = input.split("\n");
  const output = rounds.reduce((score, round) => {
    const [theirs, outcome] = round.split(" ");
    const mine = scoring[theirs][outcome];
    score += scoring[mine].P + scoring[outcome];
    return score;
  }, 0);

  console.log(output);
};

determineScore(rounds);
