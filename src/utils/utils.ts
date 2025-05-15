import { existsSync, mkdirSync } from 'fs';
import config from '../config';
import * as inquirer from '@inquirer/prompts';

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

export function initApp() {
	checkAppDir();
}
