import { PartOfSpeech } from '../../utils/parts-of-speach';

export interface AddWordDto {
	dictionaryId: number;
	term: string;
	translation: string;
	partOfSpeech: PartOfSpeech;
	learned: boolean;
}
