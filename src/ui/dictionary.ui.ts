import * as inquirer from '@inquirer/prompts';
import Table from 'cli-table3';
import dictionaryService from '../services/dictionary.service';
import { waitingForInput } from '../utils/utils';
import Dictionary from '../models/dictionary.model';
import wordService from '../services/word.service';
import { partOfSpeech, PartOfSpeechEnum } from '../utils/parts-of-speach';

const isCommand = (input: string, commands: string[]) =>
	commands.includes(input.trim().toLowerCase());

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

		const wordsList = await wordService.getAllByDictionaryId(dictionaryId);

		const isEmpty = wordsList.length === 0;

		if (isEmpty) console.log(`Don't have any words yet.\n`);
		else {
			const wordsTable = new Table({
				head: ['№', 'Word', 'Translation', 'Part of speech'],
				colWidths: [5, 20, 20, 20],
			});

			wordsList.forEach(
				(
					word: {
						term: string;
						translation: string;
						partOfSpeech: partOfSpeech;
					},
					idx: number
				) => {
					wordsTable.push([
						idx + 1,
						word.term,
						word.translation,
						PartOfSpeechEnum[word.partOfSpeech],
					]);
				}
			);

			console.log(wordsTable.toString());
		}

		const input = await inquirer.input({
			message: isEmpty
				? 'Commands list:\n a/add - add new word,\n b/back - back\n\n'
				: 'Commands list:\n a/add - add new word,\n e/edit - edit word,\n b/back - back\n\n',
			validate: (val: string) => {
				if (isCommand(val, ['a', 'add', 'b', 'back'])) return true;
				if (!isEmpty && isCommand(val, ['e', 'edit'])) return true;
				return 'Please enter a valid command!';
			},
		});

		switch (input.trim().toLowerCase()) {
			case 'a':
			case 'add':
				await addWordMenu(dictionaryId);
				break;
			case 'e':
			case 'edit':
				console.log('Edit not implemented yet.');
				break;
			case 'b':
			case 'back':
				return;
		}
	}
};

const addWordMenu = async (dictioanryId: number) => {
	while (true) {
		console.clear();

		const term = await addWordInputs.termInput();
		if (term.trim().toLowerCase() === 'x') return;

		const translation = await addWordInputs.translationInput();

		const partOfSpeechKey =
			(await addWordInputs.partOfSpeechInput()) as keyof typeof PartOfSpeechEnum;
		const partOfSpeach = PartOfSpeechEnum[partOfSpeechKey];

		try {
			await wordService.createOne(
				dictioanryId,
				term,
				translation,
				partOfSpeach
			);
		} catch (err) {
			throw new Error('Something went wrong!');
		}

		console.log('\nNew word added!');

		await waitingForInput();

		return;
	}
};

const addWordInputs = {
	termInput: async () => {
		return await inquirer.input({
			message: 'Enter word (or type "x" to cancel):',
			validate: (input: string) =>
				input.trim() !== '' || `Cant add empty string!`,
		});
	},

	translationInput: async () => {
		return await inquirer.input({
			message: 'Enter translation:',
			validate: (input: string) =>
				input.trim() !== '' || `Cant add empty string!`,
		});
	},

	partOfSpeechInput: async () => {
		return await inquirer.select({
			message: 'Choose what part of speech this is:',
			choices: Object.entries(PartOfSpeechEnum).map(
				([key, value], index: number) => ({
					name: `${index + 1} ${value}`,
					value: key,
				})
			),
			pageSize: Object.keys(PartOfSpeechEnum).length,
		});
	},
};

export default {
	main,
};
