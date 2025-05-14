import Dictionary from './dictionary.model';
import Word from './word.model';

interface Data {
	dictionaries: {
		lastId: number;
		data: Dictionary[];
	};
	words: {
		lastId: number;
		data: Word[];
	};
}

export default Data;
