import { inputData } from "./data";

const testInput = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

interface IRow {
  [key: string]: string;
}

const emptyRow: IRow = {};

const createStack = (rows: string[]) => {
  return rows.reduce((acc: { [key: string]: string }[], row, i) => {
    const formattedRow = row.split("    ").join(" [ ] ");
    const initialValues = formattedRow.match(/(?<=\[).+?(?=\])/g);
    if (!initialValues) return acc;

    acc.push(
      initialValues.reduce((acc: { [key: string]: string }, col, j) => {
        emptyRow[j + 1] = "";
        acc[j + 1] = col.trim();
        return acc;
      }, {})
    );

    return acc;
  }, []);
};

const getTopCrates = (stack: IRow[]) => {
  return Object.keys(emptyRow).reduce((acc, index) => {
    const temp = stack.find((row) => row[index]);
    acc += temp?.[index];
    return acc;
  }, "");
};

type TMove = {
  stack: IRow[];
  move: string;
  machine: number;
};

const getCratesToMove = (stack: IRow[], howMany: string, fromCol: string) => {
  const cratesToMove: string[] = [];
  for (let i = 0; i < parseInt(howMany); i++) {
    const rowNumber = stack.findIndex((row) => row[fromCol]);
    if (rowNumber === -1) continue;

    cratesToMove.push(stack[rowNumber][fromCol]);
    stack[rowNumber][fromCol] = "";
  }
  return cratesToMove;
};

const handleMove = (stack: IRow[], cratesToMove: string[], toCol: string) => {
  cratesToMove.forEach((crate) => {
    let toRow = stack.findIndex((row) => row[toCol]) - 1;

    if (toRow === -1) {
      stack.unshift(JSON.parse(JSON.stringify(emptyRow)));
      toRow = 0;
    } else if (toRow < -1) {
      toRow = stack.length - 1;
    }
    stack[toRow][toCol] = crate;
  });
};

const handleMoveCrates = ({ stack, move, machine }: TMove) => {
  const numbers = move.match(/\d+/g) as string[];
  const [howMany, fromCol, toCol] = numbers;

  const cratesToMove = getCratesToMove(stack, howMany, fromCol);

  if (machine === 9001) {
    cratesToMove.reverse();
  }

  handleMove(stack, cratesToMove, toCol);
};

const handleStacks = (input: string) => {
  const [initial, instructions] = input.split("\n\n");
  const rows = initial.split("\n");
  const moves = instructions.split("\n");

  const stack = createStack(rows);

  // moves.forEach((move) => handleMoveCrates({ stack, move, machine: 9000 }));
  moves.forEach((move) => handleMoveCrates({ stack, move, machine: 9001 }));

  const output = getTopCrates(stack);
  console.log(output);
};

handleStacks(inputData);
