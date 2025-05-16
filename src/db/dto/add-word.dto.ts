import { partOfSpeech } from '../../utils/parts-of-speach';

export interface AddWordDto {
	dictionaryId: number;
	term: string;
	translation: string;
	partOfSpeech: partOfSpeech;
	learned: boolean;
}
