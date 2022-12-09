const testInput = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;

import { movements } from "./data";

interface IHandleMoves {
  acc: { H: number[]; T: number[] };
  movement: "+" | "-";
  direction: 0 | 1;
  tailPositions: number[][];
  amount: number;
}

const handleMove = ({
  acc,
  movement,
  direction,
  tailPositions,
  amount,
}: IHandleMoves) => {
  const { H, T } = acc;
  const otherDir = direction === 0 ? 1 : 0;
  const dMove = movement === "+" ? 1 : -1;

  for (let i = 0; i < amount; i++) {
    if (
      H[direction] !== T[direction] &&
      H[direction] + dMove !== T[direction]
    ) {
      T[direction] = T[direction] + dMove;
      T[otherDir] = H[otherDir];
    }

    const tCopy = Array.from(T);
    const found = tailPositions.find(
      (pos) => pos[0] === tCopy[0] && pos[1] === tCopy[1]
    );

    if (!found) {
      tailPositions.push(tCopy);
    }

    H[direction] = H[direction] + dMove;
  }
};

const calculateMovements = (input: string) => {
  const moves = input.split("\n");
  const tailPositions: number[][] = [];

  const output = moves.reduce(
    (acc, move) => {
      const [direction, num] = move.split(" ");
      const amount = parseInt(num);
      switch (direction) {
        case "R":
          handleMove({
            acc,
            movement: "+",
            direction: 0,
            tailPositions,
            amount,
          });
          break;
        case "U":
          handleMove({
            acc,
            movement: "+",
            direction: 1,
            tailPositions,
            amount,
          });
          break;
        case "L":
          handleMove({
            acc,
            movement: "-",
            direction: 0,
            tailPositions,
            amount,
          });
          break;

        default:
          handleMove({
            acc,
            movement: "-",
            direction: 1,
            tailPositions,
            amount,
          });
          break;
      }
      return acc;
    },
    { H: [0, 0], T: [0, 0] }
  );

  console.log(tailPositions.length);
};

calculateMovements(movements);
