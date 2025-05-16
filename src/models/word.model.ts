import { partOfSpeech } from '../utils/parts-of-speach';

interface Word {
	id: number;
	dictionaryId: number;
	term: string;
	translation: string;
	partOfSpeech: partOfSpeech;
	learned: boolean;
}

export default Word;
