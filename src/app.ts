import { initApp } from './utils/utils';
import mainUi from './ui/main.ui';

const main = async (): Promise<void> => {
	initApp();

	await mainUi.main();
};

main();
