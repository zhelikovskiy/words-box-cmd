import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { join } from 'path';
import config from '../config';
import Data from './data.model';

export class DataManager {
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

	public async getData(): Promise<Data> {
		await this.db.read();
		return this.db.data;
	}
}

export default new DataManager();
