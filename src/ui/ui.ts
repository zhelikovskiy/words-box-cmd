import * as inquirer from '@inquirer/prompts';
import dictionaryService from '../services/dictionary.service';

const dictionarySelection = async (
	options: {
		name: string;
		value: number;
	}[] = []
): Promise<number> => {
	const dictionariesList = (await dictionaryService.getAll()).map(
		(dict: { id: number; title: string }, index: number) => {
			return { name: `${index + 1}. ${dict.title}`, value: dict.id };
		}
	);

	if (!dictionariesList)
		console.log(`Oops. You don't have any dictionary yet.\n\n`);
	return await inquirer.select({
		message: 'Select:',
		choices: [...dictionariesList, ...options],
	});
};

export default { dictionarySelection };
