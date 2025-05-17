import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { join } from 'path';
import config from '../config';
import Data from '../models/data.model';
import DictionaryRepository from './dictionary-repository.interface';
import Dictionary from '../models/dictionary.model';
import { AddDictionaryDto } from './dto/add-dictionary.dto';
import WordRepository from './word-repository.interface';
import Word from '../models/word.model';
import { AddWordDto } from './dto/add-word.dto';
import { WordsFilterType } from '../utils/utils';

export class DataManager implements DictionaryRepository, WordRepository {
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

	public async findDictionaries(
		filter?: Partial<Dictionary>
	): Promise<Dictionary[]> {
		await this.db.read();

		return this.db.data.dictionaries.data.filter((item) =>
			Object.entries(filter ?? {}).every(
				([key, value]) => item[key as keyof Dictionary] === value
			)
		);
	}
	public async findDictionary(
		filter: Partial<Dictionary>
	): Promise<Dictionary | undefined> {
		await this.db.read();

		return this.db.data.dictionaries.data.find((item) =>
			Object.entries(filter).every(
				([key, value]) => item[key as keyof Dictionary] === value
			)
		);
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

		this.db.data.words.data = this.db.data.words.data.filter(
			(item) => item.dictionaryId !== id
		);

		await this.db.write();
	}

	public async findWords(
		filter?: WordsFilterType,
		options?: {
			sortBy?: keyof Word;
			sortOrder?: 'asc' | 'desc';
			limit?: number;
		}
	): Promise<Word[]> {
		await this.db.read();

		let result = this.db.data.words.data.filter((item) =>
			Object.entries(filter ?? {}).every(([key, value]) => {
				if (key === 'partOfSpeech') {
					if (Array.isArray(value)) {
						return value.includes(item.partOfSpeech);
					}
				}
				return item[key as keyof Word] === value;
			})
		);

		if (options?.sortBy) {
			result = result.sort((a, b) => {
				const aValue = a[options.sortBy!];
				const bValue = b[options.sortBy!];
				if (aValue === bValue) return 0;
				if (options.sortOrder === 'desc') {
					return aValue < bValue ? 1 : -1;
				}
				return aValue > bValue ? 1 : -1;
			});
		}

		if (options?.limit !== undefined)
			(result = result.slice(0)), options.limit;

		return result;
	}
	public async findWord(filter: Partial<Word>): Promise<Word | undefined> {
		await this.db.read();

		return this.db.data.words.data.find((item) =>
			Object.entries(filter).every(
				([key, value]) => item[key as keyof Word] === value
			)
		);
	}
	public async addWord(data: AddWordDto): Promise<void> {
		await this.db.read();

		const word: Word = {
			id: this.db.data.words.lastId + 1,
			dictionaryId: data.dictionaryId,
			term: data.term,
			translation: data.translation,
			partOfSpeech: data.partOfSpeech,
			learned: data.learned,
			createdAt: new Date(),
		};

		this.db.data.words.data.push(word);
		this.db.data.words.lastId = word.id;

		await this.db.write();
	}
	public async deleteWord(id: number): Promise<void> {
		await this.db.read();

		this.db.data.words.data = this.db.data.words.data.filter(
			(item) => item.id !== id
		);

		await this.db.write();
	}
}

export default new DataManager();
