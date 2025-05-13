import { existsSync, mkdirSync } from 'fs';
import config from '../config';

const checkAppDir = () => {
	if (!existsSync(config.appDirPath)) {
		mkdirSync(config.appDirPath, { recursive: true });
	}
};

export function initApp() {
	checkAppDir();
}
