import { initApp } from './utils/utils';
import UserInterface from './ui';

const main = async (): Promise<void> => {
	initApp();

	new UserInterface();
};

main();
