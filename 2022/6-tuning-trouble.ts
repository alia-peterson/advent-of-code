const testInput = `mjqjpqmgbljsphdztnvjfqwrcgsmlb`;
const testInput1 = `bvwbjplbgvbhsrlpgdmjqwftvncz`;
const testInput2 = `nppdvjthqldpwncqszvftbrmjlhg`;
const testInput3 = `nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`;
const testInput4 = `zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`;

import { data } from "./data/6-tuning-trouble";

const findSequence = (input: string) => {
  let temp = "";
  let marker = 0;

  for (let i = 0; i < input.length; i++) {
    const letter = input.charAt(i);

    if (temp.includes(letter)) {
      const [_, after] = temp.split(letter);
      temp = after + letter;
    } else {
      temp += letter;
    }

    if (temp.length === 4) {
      marker = i + 1;
      break;
    }
  }

  console.log(marker);
};

findSequence(data);
