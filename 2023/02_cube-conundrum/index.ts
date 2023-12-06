import data from './data';

const example = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

const main = (red: number, green: number, blue: number) => {
	const games = data.split('\n');
	const initialData: { [key: string]: number } = { red, green, blue };

	return games.reduce((total, entry) => {
		const [game, data] = entry.split(': ');
		const [, gameId] = game.split(' ');
		const rounds = data.split('; ');

		const isValid = rounds.reduce((acc, round) => {
			const byColor = round.split(', ');
			byColor.forEach((set) => {
				const [num, color] = set.split(' ');
				if (initialData[color] < parseInt(num)) {
					acc = false;
				}
			});
			return acc;
		}, true);

		if (isValid) {
			total += parseInt(gameId);
		}

		return total;
	}, 0);
};
// console.log(main(12, 13, 14));

const second = () => {
	const games = data.split('\n');

	return games.reduce((output, entry) => {
		const [, data] = entry.split(': ');

		const rounds = data.split('; ');
		const needed = rounds.reduce(
			(acc: { [key: string]: number }, round) => {
				const byColor = round.split(', ');

				byColor.forEach((set) => {
					const [num, color] = set.split(' ');
					const int = parseInt(num);
					if (acc[color] < int) {
						acc[color] = int;
					}
				});
				return acc;
			},
			{ red: 0, green: 0, blue: 0 }
		);

		output += Object.values(needed).reduce((total, num) => (total *= num));
		return output;
	}, 0);
};

console.log(second());
