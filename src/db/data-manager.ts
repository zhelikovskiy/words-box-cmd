import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { join } from 'path';
import config from '../config';
import Data from '../models/data.model';
import IDictionaryRepository from './i-dictionary.repo';
import Dictionary from '../models/dictionary.model';
import { AddDictionaryDto } from './dto/add-dictionary.dto';

export class DataManager implements IDictionaryRepository {
	private db: Low<Data>;

	constructor(
		db: Low<Data> = new Low<Data>(
			new JSONFile<Data>(join(config.appDirPath, 'data.json')),
			{
				dictionaries: {
					lastId: 0,
					data: [],
				},
				words: {
					lastId: 0,
					data: [],
				},
			}
		)
	) {
		this.db = db;
		this.db.read();
	}

	public async findDictionaries(): Promise<Dictionary[]> {
		await this.db.read();
		return this.db.data.dictionaries.data;
	}
	public async findDictionary(id: number): Promise<Dictionary | undefined> {
		return this.db.data.dictionaries.data.find((item) => item.id === id);
	}
	public async addDictionary(data: AddDictionaryDto): Promise<void> {
		await this.db.read();

		const dictionary: Dictionary = {
			id: this.db.data.dictionaries.lastId + 1,
			title: data.title,
		};

		this.db.data.dictionaries.data.push(dictionary);
		this.db.data.dictionaries.lastId = dictionary.id;

		await this.db.write();
	}
	public async deteleDictionary(id: number): Promise<void> {
		await this.db.read();

		this.db.data.dictionaries.data = this.db.data.dictionaries.data.filter(
			(item) => item.id !== id
		);

		await this.db.write();
	}
}

export default new DataManager();
