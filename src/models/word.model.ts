interface Word {
	id: number;
	dictionaryId: number;
	translation1: string;
	translation2: string;
	partOfSpeech: string;
	priority: number;
	learned: boolean;
}

export default Word;
