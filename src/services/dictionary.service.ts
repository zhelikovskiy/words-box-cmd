import dataManager, { DataManager } from '../db/data-manager';
import Dictionary from '../models/dictionary.model';

class DictionaryService {
	private dm: DataManager;

	constructor(dataManager: DataManager) {
		this.dm = dataManager;
	}

	public async getAll() {
		return this.dm.getDictionaries();
	}

	//TODO implement id generation
	public async create(title: string) {
		const dictionary: Dictionary = {
			id: Math.random(),
			title: title,
		};

		return this.dm.addDictionary(dictionary);
	}
}

export default new DictionaryService(dataManager);
