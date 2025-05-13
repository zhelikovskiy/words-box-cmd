import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { join } from 'path';
import config from '../config';
import Data from '../models/data.model';
import IDictionaryRepository from './i-dictionary.repo';
import IWordRepository from './i-word.repo';
import Dictionary from '../models/dictionary.model';

export class DataManager implements IDictionaryRepository, IWordRepository {
	private db: Low<Data>;

	constructor(
		db: Low<Data> = new Low<Data>(
			new JSONFile<Data>(join(config.appDirPath, 'data.json')),
			{
				dictionaries: [],
				words: [],
			}
		)
	) {
		this.db = db;
	}

	public async getDictionaries(): Promise<Dictionary[]> {
		await this.db.read();
		return this.db.data.dictionaries;
	}

	public async addDictionary(dictionary: Dictionary): Promise<void> {
		await this.db.read();
		this.db.data.dictionaries.push(dictionary);
		await this.db.write();
	}
}

export default new DataManager();
