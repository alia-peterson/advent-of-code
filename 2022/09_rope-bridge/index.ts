const testInput = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;

import { movements } from "./data";

const movementMap = {
  R: { move: "+", axis: 0 },
  D: { move: "-", axis: 1 },
  L: { move: "-", axis: 0 },
  U: { move: "+", axis: 1 },
};

interface IHandleMoves {
  acc: { H: number[]; T: number[]; TP: number[][] };
  direction: "R" | "L" | "U" | "D";
  amount: number;
}

const handleMove = ({ acc, direction, amount }: IHandleMoves) => {
  const { H, T, TP } = acc;
  const { axis, move } = movementMap[direction];
  const otherDir = axis === 0 ? 1 : 0;
  const dMove = move === "+" ? 1 : -1;

  for (let i = 0; i < amount; i++) {
    if (H[axis] !== T[axis] && H[axis] + dMove !== T[axis]) {
      T[axis] = T[axis] + dMove;
      T[otherDir] = H[otherDir];
    }

    const tCopy = Array.from(T);
    const found = TP.find((pos) => pos[0] === tCopy[0] && pos[1] === tCopy[1]);

    if (!found) {
      TP.push(tCopy);
    }

    H[axis] = H[axis] + dMove;
  }
};

const calculateMovements = (input: string) => {
  const moves = input.split("\n");

  const output = moves.reduce(
    (acc, move) => {
      const [dir, num] = move.split(" ");
      const direction = dir as IHandleMoves["direction"];
      const amount = parseInt(num);

      handleMove({ acc, direction, amount });
      return acc;
    },
    { H: [0, 0], T: [0, 0], TP: [] }
  );

  console.log(output.TP.length);
};

calculateMovements(movements);
