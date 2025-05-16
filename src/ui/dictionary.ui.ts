import * as inquirer from '@inquirer/prompts';
import dictionaryService from '../services/dictionary.service';
import { waitingForInput } from '../utils/utils';
import Dictionary from '../models/dictionary.model';
import wordService from '../services/word.service';

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
				await wordsListMenu(dictionary.id);
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

const wordsListMenu = async (dictionaryId: number) => {
	while (true) {
		console.clear();

		const wordsList = (
			await wordService.getAllByDictionaryId(dictionaryId)
		).map(
			(
				word: { id: number; term: string; translation: string },
				index: number
			) => {
				return {
					name: `${index + 1}. ${word.term} - ${word.translation}`,
					value: word.id,
				};
			}
		);

		const choice = await inquirer.select({
			message: 'Select:',
			choices: [
				...wordsList,
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
				break;
			case -2:
				return;
			default:
				break;
		}
	}
};

export default {
	main,
};
