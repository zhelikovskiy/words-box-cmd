import Dictionary from '../models/dictionary.model';

interface IDictionaryRepository {
	findDictionaries(filter?: any): Promise<Dictionary[]>;
	findDictionary(filter: any): Promise<Dictionary | undefined>;
	addDictionary(data: Dictionary): Promise<void>;
	deteleDictionary(id: number): Promise<void>;
}

export default IDictionaryRepository;
