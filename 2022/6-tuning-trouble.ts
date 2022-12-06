const testInput = `zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`;

import { data } from "./data/6-tuning-trouble";

const findSequence = (input: string, characters: number) => {
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

    if (temp.length === characters) {
      marker = i + 1;
      break;
    }
  }

  console.log(marker);
};

findSequence(data, 14);
