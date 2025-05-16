import Word from '../models/word.model';

interface WordRepository {
	findWords(filter?: Partial<Word>): Promise<Word[]>;
	findWord(filter?: Partial<Word>): Promise<Word | undefined>;
	addWord(data: Word): Promise<void>;
	deleteWord(id: number): Promise<void>;
}

export default WordRepository;
