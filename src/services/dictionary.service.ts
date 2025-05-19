import dataManager, { DataManager } from '../db/data-manager';
import Dictionary from '../models/dictionary.model';

export class DictionaryService {
	private dm: DataManager;

	constructor(dataManager: DataManager) {
		this.dm = dataManager;
	}

	public async getAll() {
		return this.dm.findDictionaries();
	}

	public async getOne(id: number): Promise<Dictionary> {
		const dict = await this.dm.findDictionary({ id });

		if (!dict) throw new Error('Something went wrong!');

		return dict;
	}

	public async create(title: string) {
		return this.dm.addDictionary({ title });
	}

	public async deleteOne(id: number) {
		return this.dm.deteleDictionary(id);
	}
}

export default new DictionaryService(dataManager);
