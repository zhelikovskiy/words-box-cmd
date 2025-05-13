import Dictionary from '../models/dictionary.model';

interface IDictionaryRepository {
	getDictionaries(): Promise<Dictionary[]>;
	addDictionary(data: Dictionary): Promise<void>;
}

export default IDictionaryRepository;
