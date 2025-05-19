import * as inquirer from '@inquirer/prompts';
import ui from './ui';
import TrainingService from '../services/training.service';

const main = async () => {
	while (true) {
		console.clear();

		const choice = await ui.dictionarySelection([
			{ name: ' Back', value: -1 },
		]);

		switch (choice) {
			case -1:
				return;
			default:
				await trainingMenu(choice);
				break;
		}
	}
};

const trainingMenu = async (dictionaryId: number) => {
	const trainingService = await TrainingService.create(dictionaryId);

	while (true) {
		console.clear();

		console.log('Enter translation (or "x" to skip, "s" to stop):\n');

		const word = await trainingService.getWord();

		const showTerm = Math.random() < 0.5;
		const question = showTerm ? word.term : word.translation;
		const correctAnswer = showTerm ? word.translation : word.term;

		const answer = await inquirer.input({
			message: question,
		});

		const trimmedAnswer = answer.trim().toLowerCase();

		if (trimmedAnswer === 's') {
			console.log('Exiting training...');
			await inquirer.input({ message: 'Press Enter to continue...' });
			break;
		}

		if (trimmedAnswer === 'x') {
			console.log(`Skipped. Correct answer: ${correctAnswer}`);
			await inquirer.input({ message: 'Press Enter to continue...' });
			continue;
		}

		if (trimmedAnswer === correctAnswer.trim().toLowerCase()) {
			console.log('Correct!');
			const markInput = await inquirer.input({
				message: 'Mark this word as learned? (y - yes/enter - no):',
			});
			if (markInput.trim().toLowerCase() === 'y') {
				await trainingService.markAsLearned();
				console.log('Word marked as learned.');
			}
		} else {
			console.log(`Incorrect. Correct answer: ${correctAnswer}`);
		}
		await inquirer.input({ message: 'Press Enter to continue...' });
	}
};

export default { main };
