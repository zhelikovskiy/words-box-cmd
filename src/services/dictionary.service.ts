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

	public async create(title: string) {
		return this.dm.addDictionary({ title });
	}
}

export default new DictionaryService(dataManager);
