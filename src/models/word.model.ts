import { PartOfSpeech } from '../utils/parts-of-speach';

interface Word {
	id: number;
	dictionaryId: number;
	term: string;
	translation: string;
	partOfSpeech: PartOfSpeech;
	learned: boolean;
	createdAt: Date;
}

export default Word;
