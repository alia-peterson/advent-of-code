import { inputData } from "./data/5-supply-stacks";

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

type TType = {
  stack: IRow[];
  fromCol: string;
  toCol: string;
  toRow: number;
};

const moveCrates = ({ stack, fromCol, toCol, toRow }: TType) => {
  const rowWithCrate = stack.findIndex((row) => row[fromCol]);

  stack[toRow][toCol] = stack[rowWithCrate][fromCol];
  stack[rowWithCrate][fromCol] = "";
};

const moveCrates9000 = (stack: IRow[], numbers: string[]) => {
  // minus 1 to get the row above the one that has a value
  let toRow = stack.findIndex((row) => row[numbers[2]]) - 1;
  console.log({ toRow });

  if (toRow === -1) {
    stack.unshift(JSON.parse(JSON.stringify(emptyRow)));
    toRow = 0;
  } else if (toRow < -1) {
    toRow = stack.length - 1;
  }
  return toRow;
};

// const moveCrates9001 = () => {};

const handleMoveCrates = (stack: IRow[], move: string, machine: number) => {
  const numbers = move.match(/\d+/g) as string[];
  console.log({ move });

  for (let i = 0; i < parseInt(numbers[0]); i++) {
    const toRow = moveCrates9000(stack, numbers);

    console.log({ stack });
    moveCrates({
      stack,
      fromCol: numbers[1],
      toCol: numbers[2],
      toRow,
    });
    console.log({ stack });
  }
};

const handleStacks = (input: string) => {
  const [initial, instructions] = input.split("\n\n");
  const rows = initial.split("\n");
  const moves = instructions.split("\n");

  const stack = createStack(rows);

  moves.forEach((move) => handleMoveCrates(stack, move, 9000));

  const output = getTopCrates(stack);
  console.log(output);
};

handleStacks(testInput);
