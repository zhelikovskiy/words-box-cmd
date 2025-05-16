import Dictionary from '../models/dictionary.model';

interface DictionaryRepository {
	findDictionaries(filter?: Partial<Dictionary>): Promise<Dictionary[]>;
	findDictionary(
		filter: Partial<Dictionary>
	): Promise<Dictionary | undefined>;
	addDictionary(data: Dictionary): Promise<void>;
	deteleDictionary(id: number): Promise<void>;
}

export default DictionaryRepository;
