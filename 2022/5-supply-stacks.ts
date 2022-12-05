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

const moveCrates9000 = (stack: IRow[], move: string) => {
  const numbers = move.match(/\d+/g) as string[];

  for (let i = 0; i < parseInt(numbers[0]); i++) {
    // minus 1 to get the row above the one that has a value
    let targetRow = stack.findIndex((row) => row[numbers[2]]) - 1;

    if (targetRow === -1) {
      stack.unshift(JSON.parse(JSON.stringify(emptyRow)));
      targetRow = 0;
    } else if (targetRow === -2) {
      targetRow = stack.length - 1;
    }

    const rowWithCrate = stack.findIndex((row) => row[numbers[1]]);
    stack[targetRow][numbers[2]] = stack[rowWithCrate][numbers[1]];
    stack[rowWithCrate][numbers[1]] = "";
  }
};

const moveCrates9001 = (stack: IRow[], move: string) => {};

const handleStacks = (input: string) => {
  const [initial, instructions] = input.split("\n\n");
  const rows = initial.split("\n");
  const moves = instructions.split("\n");

  const stack = createStack(rows);

  //   moves.forEach((move) => moveCrates9000(stack, move));
  moves.forEach((move) => moveCrates9001(stack, move));

  const output = getTopCrates(stack);
  console.log(output);
};

handleStacks(testInput);
