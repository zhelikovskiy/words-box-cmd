type partOfSpeech =
	| 'noun'
	| 'verb'
	| 'adjective'
	| 'adverb'
	| 'pronoun'
	| 'preposition'
	| 'conjunction'
	| 'interjection'
	| 'other';

interface Word {
	id: number;
	dictionaryId: number;
	term: string;
	translation: string;
	partOfSpeech: string;
	learned: boolean;
}

export default Word;
