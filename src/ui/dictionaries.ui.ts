import * as inquirer from '@inquirer/prompts';
import dictionaryService from '../services/dictionary.service';
import dictionaryUi from './dictionary.ui';
import { waitingForInput } from '../utils/utils';

const main = async () => {
	while (true) {
		console.clear();

		const dictionariesList = (await dictionaryService.getAll()).map(
			(dict: { id: number; title: string }, index: number) => {
				return { name: `${index + 1}. ${dict.title}`, value: dict.id };
			}
		);

		const choice = await inquirer.select({
			message: 'Select:',
			choices: [
				...dictionariesList,
				{
					name: ` Add new`,
					value: -1,
				},
				{
					name: ` Back`,
					value: -2,
				},
			],
		});

		switch (choice) {
			case -1:
				await addDicitonaryMenu();
				break;
			case -2:
				return;
			default:
				await dictionaryUi.main(Number(choice));
				break;
		}
	}
};

const addDicitonaryMenu = async () => {
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

		await dictionaryService
			.create(answer)
			.then(() => console.log(`Dictionary '${answer}' added!`));

		await waitingForInput();
		return;
	}
};

export default { main };
