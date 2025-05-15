import * as inquirer from '@inquirer/prompts';
import dictionaryService from '../services/dictionary.service';
import { waitingForInput } from '../utils/utils';
import Dictionary from '../models/dictionary.model';

const main = async (id: number) => {
	const dictionary: Dictionary | undefined = await dictionaryService.getOne(
		id
	);
	if (!dictionary) throw new Error('Something went wrong.');

	while (true) {
		console.clear();

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
				await deleteDictionaryMenu(dictionary);
				return;
			case 3:
				return;
		}
	}
};

const deleteDictionaryMenu = async (dictionary: Dictionary) => {
	console.clear();

	const answer = await inquirer.confirm({
		message: `Confirm '${dictionary.title}' deleting?`,
	});

	if (answer) {
		console.clear();

		await dictionaryService.deleteOne(dictionary.id);

		console.log(
			`Dictionary '${dictionary.title}' was successfully deleted!`
		);

		await waitingForInput();

		return;
	}
};

export default {
	main,
};
