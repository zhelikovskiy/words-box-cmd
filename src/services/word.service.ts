import dataManager, { DataManager } from '../db/data-manager';

class WordService {
	private dm: DataManager;

	constructor(dataManager: DataManager) {
		this.dm = dataManager;
	}
}

export default new WordService(dataManager);
