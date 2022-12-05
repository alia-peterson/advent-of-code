/*

Part 1

const letterConversion =
  "-abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

const testInput = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

const rucksackData = require("./data/3-rucksack");

const calcPriorities = (input) => {
  const contentsPerRuksack = input.split("\n");

  const priorityValue = contentsPerRuksack.reduce((priority, rucksack) => {
    const first = rucksack.slice(0, rucksack.length / 2);
    const second = rucksack.slice(rucksack.length / 2, rucksack.length);

    const firstList = first.split("");
    const match = firstList.find((letter) => second.includes(letter));
    if (match) {
      priority += letterConversion.indexOf(match);
    }
    return priority;
  }, 0);
  console.log(priorityValue);
};

calcPriorities(rucksackData);

*/

const letterConversion =
  "-abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

const testInput = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

import { data } from "./data/3-rucksack";

const findBadge = (group) => {
  let badge = "";
  let cants = "";

  const [first, second, third] = group;

  while (!badge) {
    const firstList = first.split("");
    const matchSecond = firstList.find((letter) => {
      if (cants) {
        return !cants.includes(letter) && second.includes(letter);
      }
      return second.includes(letter);
    });
    const matchThird = third.includes(matchSecond);

    if (matchThird) {
      badge = matchSecond;
    } else {
      cants += matchSecond;
    }
  }
  return badge;
};

const calcPriorities = (input: string) => {
  const contentsPerRuksack = input.split("\n");

  const priorityValue = contentsPerRuksack.reduce((priority, _, i, array) => {
    if ((i + 1) % 3 === 0) {
      const badge = findBadge(array.slice(i - 2, i + 1));
      priority += letterConversion.indexOf(badge);
    }

    return priority;
  }, 0);
  console.log(priorityValue);
};

calcPriorities(data);
