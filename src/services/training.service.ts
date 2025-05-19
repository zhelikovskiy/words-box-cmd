import Dictionary from '../models/dictionary.model';
import Word from '../models/word.model';
import { PartOfSpeech } from '../utils/parts-of-speach';
import dictionaryService from './dictionary.service';
import wordService from './word.service';

class TrainingService {
	private words: Word[];
	private dictionary: Dictionary;
	private index: number;

	private constructor(dictionary: Dictionary, words: Word[]) {
		this.dictionary = dictionary;
		this.words = words;
		this.index = 0;
	}

	static async create(dicitonaryId: number): Promise<TrainingService> {
		const dictionary = await dictionaryService.getOne(dicitonaryId);
		const words = await wordService.getAllByFilter(
			dictionary.id,
			{
				learned: false,
			},
			20
		);
		return new TrainingService(dictionary, words);
	}

	public async markAsLearned() {
		await wordService.updateOne(this.words[this.index].id, {
			learned: true,
		});
		await this.setWords();
	}

	private async setWords() {
		this.words = await wordService.getAllByFilter(
			this.dictionary.id,
			{
				learned: false,
			},
			20
		);
	}

	public getWord() {
		const word = this.words[this.index];
		const maxIndex = Math.min(this.words.length, 20) - 1;
		this.index = this.index + 1 > maxIndex ? 0 : this.index + 1;
		return word;
	}
}

export default TrainingService;
