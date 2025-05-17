import dataManager, { DataManager } from '../db/data-manager';
import { AddWordDto } from '../db/dto/add-word.dto';
import { PartOfSpeech } from '../utils/parts-of-speach';

class WordService {
	private dm: DataManager;

	constructor(dataManager: DataManager) {
		this.dm = dataManager;
	}

	public async getAll() {
		return this.dm.findWords();
	}

	public async getAllByDictionaryId(dictionaryId: number) {
		return this.dm.findWords({ dictionaryId: dictionaryId });
	}

	public async getOneById(id: number) {
		return this.dm.findWord({ id });
	}

	public async createOne(
		dictionaryId: number,
		term: string,
		translation: string,
		partOfSpeech: PartOfSpeech
	) {
		const existingWord = await this.dm.findWord({
			dictionaryId: dictionaryId,
			term: term,
			translation: translation,
		});

		if (existingWord)
			throw new Error('This word already exist in this dictionary.');

		const word: AddWordDto = {
			dictionaryId: dictionaryId,
			term: term,
			translation: translation,
			partOfSpeech: partOfSpeech,
			learned: false,
		};

		return this.dm.addWord(word);
	}

	public async deleteOne(id: number) {
		return this.dm.deleteWord(id);
	}
}

export default new WordService(dataManager);
