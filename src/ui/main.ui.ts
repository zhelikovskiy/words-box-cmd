import * as inquirer from '@inquirer/prompts';
import dictionariesUi from './dictionaries.ui';
import trainingUi from './training.ui';

const main = async () => {
	while (true) {
		console.clear();

		const choice = await inquirer.select({
			message: 'Select:',
			choices: [
				{
					name: '1. Dictionaries',
					value: 1,
				},
				{
					name: '2. Learning',
					value: 2,
				},
				{
					name: '3. Exit',
					value: 3,
				},
			],
		});

		switch (choice) {
			case 1:
				await dictionariesUi.main();
				break;
			case 2:
				await trainingUi.main();
				break;
			case 3:
				console.log('Goodbye!');
				process.exit(0);
		}
	}
};

export default { main };
