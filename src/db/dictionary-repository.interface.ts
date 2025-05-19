import Dictionary from '../models/dictionary.model';
import { AddDictionaryDto } from './dto/add-dictionary.dto';

interface DictionaryRepository {
	findDictionaries(filter?: Partial<Dictionary>): Promise<Dictionary[]>;
	findDictionary(
		filter: Partial<Dictionary>
	): Promise<Dictionary | undefined>;
	addDictionary(data: AddDictionaryDto): Promise<void>;
	deteleDictionary(id: number): Promise<void>;
}

export default DictionaryRepository;
