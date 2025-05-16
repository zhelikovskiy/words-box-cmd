export interface AddWordDto {
	dictionaryId: number;
	term: string;
	translation: string;
	partOfSpeech: string;
	learned: boolean;
}
