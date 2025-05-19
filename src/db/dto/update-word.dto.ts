import { PartOfSpeech } from '../../utils/parts-of-speach';

export interface UpdateWordDto {
	id: number;
	term?: string;
	translation?: string;
	partOfSpeech?: PartOfSpeech;
	learned?: boolean;
}
