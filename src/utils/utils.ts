import { existsSync, mkdirSync } from 'fs';
import config from '../config';
import * as inquirer from '@inquirer/prompts';
import Word from '../models/word.model';
import { PartOfSpeech } from './parts-of-speach';

const checkAppDir = () => {
	if (!existsSync(config.appDirPath)) {
		mkdirSync(config.appDirPath, { recursive: true });
	}
};

export async function waitingForInput() {
	await inquirer.input({
		message: `Press any key to continue...`,
		transformer: () => '',
	});
}

export function isCommand(input: string, commands: string[]): boolean {
	return commands.includes(input.trim().toLowerCase());
}

export type WordsFilterType = Partial<Omit<Word, 'partOfSpeech'>> & {
	partOfSpeech?: PartOfSpeech | PartOfSpeech[];
};

export function initApp() {
	checkAppDir();
}
