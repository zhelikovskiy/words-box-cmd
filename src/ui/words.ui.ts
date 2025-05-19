import * as inquirer from '@inquirer/prompts';
import Table from 'cli-table3';
import wordService from '../services/word.service';
import { isCommand, waitingForInput } from '../utils/utils';
import Word from '../models/word.model';
import { PartOfSpeech } from '../utils/parts-of-speach';

const showWordsTable = async (words: Word[]) => {
	const wordsTable = new Table({
		head: ['№', 'Word', 'Translation', 'Part of speech'],
		colWidths: [5, 20, 20, 20],
	});

	words.forEach((word: Word, index: number) => {
		wordsTable.push([
			index + 1,
			word.term,
			word.translation,
			word.partOfSpeech,
		]);
	});

	console.log(wordsTable.toString());
};

const main = async (dictionaryId: number) => {
	while (true) {
		console.clear();

		const wordsList = await wordService.getAllByDictionaryId(dictionaryId);

		const isEmpty = wordsList.length === 0;

		if (isEmpty) console.log(`Don't have any words yet.\n`);
		else {
			await showWordsTable(wordsList);
		}

		const input = await inquirer.input({
			message: isEmpty
				? 'Commands list:\n a/add - add new word,\n b/back - back\n\n'
				: 'Commands list:\n a/add - add new word,\n d/delete - delete word,\n b/back - back\n\n',
			validate: (val: string) => {
				if (isCommand(val, ['a', 'add', 'b', 'back'])) return true;
				if (!isEmpty && isCommand(val, ['d', 'delete'])) return true;
				return 'Please enter a valid command!';
			},
		});

		switch (input.trim().toLowerCase()) {
			case 'a':
			case 'add':
				await addWordMenu(dictionaryId);
				break;
			case 'd':
			case 'delete':
				await deleteWordMenu(wordsList);
				break;
			case 'b':
			case 'back':
				return;
		}
	}
};

const addWordMenu = async (dictionaryId: number) => {
	while (true) {
		console.clear();

		const term = await addWordInputs.termInput();
		if (term.trim().toLowerCase() === 'x') return;

		const translation = await addWordInputs.translationInput();

		const partOfSpeechKey =
			(await addWordInputs.partOfSpeechInput()) as keyof typeof PartOfSpeech;
		const partOfSpeach = PartOfSpeech[partOfSpeechKey];

		try {
			await wordService.createOne(
				dictionaryId,
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

const deleteWordMenu = async (words: Word[]) => {
	console.clear();

	await showWordsTable(words);

	const input = await inquirer.input({
		message:
			'Enter the number of the word to delete (or type "x" to cancel):',
		validate: (val: string) => {
			if (val.trim().toLowerCase() === 'x') return true;
			const num = Number(val);
			if (!Number.isInteger(num) || num < 1 || num > words.length) {
				return `Please enter a valid number between 1 and ${words.length}, or "x" to cancel.`;
			}
			return true;
		},
	});

	if (input.trim().toLowerCase() === 'x') return;

	const index = Number(input) - 1;
	const wordToDelete = words[index];

	try {
		await wordService.deleteOne(wordToDelete.id);
		console.log('\nWord deleted!');
	} catch (err) {
		console.log('Failed to delete the word.');
	}

	await waitingForInput();
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
			choices: Object.entries(PartOfSpeech).map(
				([key, value], index: number) => ({
					name: `${index + 1} ${value}`,
					value: key,
				})
			),
			pageSize: Object.keys(PartOfSpeech).length,
		});
	},
};

export default { main };
