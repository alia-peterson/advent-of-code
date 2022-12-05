import { calories } from "./data/1-calorie-counting";

const testInput = `
1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

const getHighest = (calorieList: string[]) => {
  let highest = 0;
  let temp = 0;

  calorieList.forEach((entry) => {
    const numEntry = parseInt(entry);

    if (!isNaN(numEntry)) {
      temp += numEntry;
    } else {
      if (highest < temp) {
        highest = temp;
      }
      temp = 0;
    }
  });

  if (temp && temp > highest) {
    highest = temp;
  }

  return { highest };
};

const getThreeHighest = (calorieList: string[]) => {
  let low = 0;
  let mid = 0;
  let high = 0;

  let temp = 0;

  for (let i = 0; i < calorieList.length + 1; i++) {
    const numEntry = parseInt(calorieList[i]);

    if (!isNaN(numEntry)) {
      temp += numEntry;
    } else {
      if (temp > high) {
        low = mid;
        mid = high;
        high = temp;
      } else if (temp > mid) {
        mid = high;
        mid = temp;
      } else if (temp > low) {
        low = temp;
      }
      temp = 0;
    }
  }

  return { low, mid, high };
};

const findElfWithMostCalories = (input: string) => {
  const calorieList = input.split(" ")[0].split("\n");

  const { highest } = getHighest(calorieList);
  console.log(highest);

  const { low, mid, high } = getThreeHighest(calorieList);
  console.log(low + mid + high);
};

findElfWithMostCalories(calories);
