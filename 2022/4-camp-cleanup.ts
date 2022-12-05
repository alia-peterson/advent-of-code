import { cleanups } from "./data/4-camp-cleanup";
/*

Part 1

const testInput = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

const findContained = (input) => {
  const assignments = input.split("\n");

  const contained = assignments.reduce((acc, entry) => {
    const [left, right] = entry.split(",");
    const [mL, mxL] = left.split("-");
    const [mR, mxR] = right.split("-");

    const minL = parseInt(mL);
    const maxL = parseInt(mxL);
    const minR = parseInt(mR);
    const maxR = parseInt(mxR);

    if ((minL <= minR && maxL >= maxR) || (minL >= minR && maxL <= maxR)) {
      acc += 1;
    }

    return acc;
  }, 0);

  console.log(contained);
};

// findContained(cleanups);

*/

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

    if (
      (minR >= minL && minR <= maxL) ||
      (maxR >= minL && maxR <= maxL) ||
      (minL >= minR && minL <= maxR) ||
      (maxL >= minR && maxL <= maxR)
    ) {
      acc += 1;
    }

    return acc;
  }, 0);

  console.log(contained);
};

findContained(cleanups);
