import { initApp } from './utils/utils';
import ui from './ui/ui';

const main = async (): Promise<void> => {
	initApp();

	await ui.main();
};

main();
