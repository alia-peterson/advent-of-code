import data from './data';

const example = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

const example2 = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

const test = `one7bpqltzf9ninesix`;

const digitMap = {
	one: '1',
	two: '2',
	three: '3',
	four: '4',
	five: '5',
	six: '6',
	seven: '7',
	eight: '8',
	nine: '9',
};

const main = () => {
	const split = data.split('\n');
	return split.reduce((acc, entry) => {
		let stringsToNum = entry;

		for (let i = 0; i <= stringsToNum.length; i++) {
			const sliced = stringsToNum.slice(0, i + 1);

			Object.entries(digitMap).forEach(([string, num]) => {
				if (sliced.includes(string)) {
					stringsToNum = stringsToNum.replace(string, num);
				}
			});
			// console.log(sliced, stringsToNum);
		}

		const onlyNum = stringsToNum.replace(/\D/g, '');
		const firstDigit = onlyNum[0];
		const lastDigit = onlyNum[onlyNum.length - 1];

		const value = parseInt(firstDigit + lastDigit);
		console.log(entry, stringsToNum, onlyNum, value);
		acc += value;

		return acc;
	}, 0);
};
console.log(main());


// 53311, 53286