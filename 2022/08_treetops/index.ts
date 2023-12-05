const testInput = `30373
25512
65332
33549
35390`;

import { treeTops } from "./data";

const checkAbove = (rows: number[][], tree: number, i: number, j: number) => {
  let visible = true;
  for (let k = i - 1; k >= 0; k--) {
    if (tree <= rows[k][j]) {
      visible = false;
    }
  }
  return visible;
};

const checkBelow = (rows: number[][], tree: number, i: number, j: number) => {
  let visible = true;
  for (let k = i + 1; k < rows.length; k++) {
    if (tree <= rows[k][j]) {
      visible = false;
    }
  }
  return visible;
};

const checkRight = (row: number[], tree: number, j: number) => {
  let visible = true;
  for (let k = j + 1; k < row.length; k++) {
    if (tree <= row[k]) {
      visible = false;
    }
  }
  return visible;
};

const checkLeft = (row: number[], tree: number, j: number) => {
  let visible = true;
  for (let k = j - 1; k >= 0; k--) {
    if (tree <= row[k]) {
      visible = false;
    }
  }
  return visible;
};

const calculateVisibleTrees = (input: string) => {
  const rows = input
    .split("\n")
    .map((row) => row.split("").map((tree) => parseInt(tree)));

  const visible = rows.reduce((trees, row, i) => {
    if (i === 0 || i === rows.length - 1) {
      trees += row.length;
    } else {
      row.forEach((tree, j) => {
        if (
          j === 0 ||
          j === row.length - 1 ||
          checkAbove(rows, tree, i, j) ||
          checkBelow(rows, tree, i, j) ||
          checkLeft(row, tree, j) ||
          checkRight(row, tree, j)
        ) {
          trees += 1;
          // add conditionals to figure out which direction to check first
        }
      });
    }

    return trees;
  }, 0);
  console.log({ visible });
};

// calculateVisibleTrees(testInput);
calculateVisibleTrees(treeTops);
