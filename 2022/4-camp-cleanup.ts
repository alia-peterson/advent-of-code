import { cleanups } from "./data/4-camp-cleanup";

const testInput = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

type TInputs = {
  minL: number;
  minR: number;
  maxL: number;
  maxR: number;
  acc: number;
};

const checkFullyContained = ({ minL, minR, maxL, maxR, acc }: TInputs) => {
  if ((minL <= minR && maxL >= maxR) || (minL >= minR && maxL <= maxR)) {
    return 1;
  }
  return 0;
};

const checkPartiallyContained = ({ minL, minR, maxL, maxR, acc }: TInputs) => {
  if (
    (minR >= minL && minR <= maxL) ||
    (maxR >= minL && maxR <= maxL) ||
    (minL >= minR && minL <= maxR) ||
    (maxL >= minR && maxL <= maxR)
  ) {
    return 1;
  }
  return 0;
};

const findContained = (input: string) => {
  const assignments = input.split("\n");

  const contained = assignments.reduce((acc, entry) => {
    const [left, right] = entry.split(",");
    const [mL, mxL] = left.split("-");
    const [mR, mxR] = right.split("-");

    const minL = parseInt(mL);
    const maxL = parseInt(mxL);
    const minR = parseInt(mR);
    const maxR = parseInt(mxR);

    // acc += checkFullyContained({ minL, minR, maxL, maxR, acc });
    acc += checkPartiallyContained({ minL, minR, maxL, maxR, acc });

    return acc;
  }, 0);

  console.log(contained);
};

findContained(cleanups);
