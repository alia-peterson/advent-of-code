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

/*

Part 1

const findElfWithMostCalories = (input) => {
  const calorieList = input.split(" ")[0].split("\n");

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

  console.log(highest);
};

findElfWithMostCalories(input);
*/

const findElfWithMostCalories = (input) => {
  const calorieList = input.split(" ")[0].split("\n");

  let low = 0;
  let mid = 0;
  let highest = 0;

  let temp = 0;

  for (let i = 0; i < calorieList.length + 1; i++) {
    const numEntry = parseInt(calorieList[i]);

    if (!isNaN(numEntry)) {
      temp += numEntry;
    } else {
      if (temp > highest) {
        low = mid;
        mid = highest;
        highest = temp;
      } else if (temp > mid) {
        mid = highest;
        mid = temp;
      } else if (temp > low) {
        low = temp;
      }
      temp = 0;
    }
  }

  console.log(low + mid + highest);
};

findElfWithMostCalories(calories);
