import * as inquirer from '@inquirer/prompts';
import dictionaryService from './services/dictionary.service';

class UserInterface {
	constructor() {
		console.log('Welcome!');

		this.menu();
	}

	private async menu() {
		while (true) {
			console.clear();

			const choice = await inquirer.select({
				message: 'Select:',
				choices: [
					{
						name: '1. Dictionaries',
						value: 1,
					},
					{
						name: '2. Learning',
						value: 2,
					},
					{
						name: '3. Exit',
						value: 3,
					},
				],
			});

			switch (choice) {
				case 1:
					await this.dictionariesMenu();
					break;
				case 2:
					console.log('not implemented');
					break;
				case 3:
					console.log('Goodbye!');
					process.exit(0);
					break;
			}
		}
	}

	private async dictionariesMenu() {
		while (true) {
			console.clear();

			const dictionaries = await dictionaryService.getAll();

			const choice = await inquirer.select({
				message: 'Select:',
				choices: [
					...dictionaries.map(
						(dict: { title: string }, index: number) => ({
							name: `${index + 1}. ${dict.title}`,
							value: index,
						})
					),
					{
						name: `${dictionaries.length + 1}. Add new`,
						value: dictionaries.length + 1,
					},
					{
						name: `${dictionaries.length + 2}. Back`,
						value: dictionaries.length + 2,
					},
				],
			});

			switch (choice) {
				case dictionaries.length + 1:
					await this.addDictionaryMenu();
					break;
				case dictionaries.length + 2:
					return;
				default:
					break;
			}
		}
	}

	//TODO implement dictionary addition processing
	private async addDictionaryMenu() {
		while (true) {
			console.clear();

			const answer = await inquirer.input({
				message: 'Enter dictionary title (or type "X" to cancel):',
				validate: (input: string) => {
					if (input.toLocaleLowerCase() === 'x') return true;
					const isValid = /^[a-zA-Z-]{3,}$/.test(input);
					return (
						isValid ||
						'Title must be at least 3 characters long and contain only letters and the "-" character.'
					);
				},
			});

			if (answer.toLocaleLowerCase() === 'x') return;

			// await dictionaryService
			// 	.create(answer)
			// 	.then(() => console.log(`Dictionary '${answer}' added!`));

			await inquirer.input({
				message: 'Press any key to continue...',
				transformer: () => '',
			});
			return;
		}
	}

	//TODO finish
	private async dictionaryMenu() {
		while (true) {
			const answer = await inquirer.select({
				message: 'Select option:',
				choices: [
					{
						name: '1. View words list',
						value: 1,
					},
					{
						name: '2. Delete',
						value: 2,
					},
					{
						name: '3. Back',
						value: 3,
					},
				],
			});

			switch (answer) {
				case 1:
					break;
				case 2:
					break;
				case 3:
					return;
			}
		}
	}
}

export default UserInterface;
