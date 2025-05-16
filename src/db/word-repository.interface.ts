import Word from '../models/word.model';

interface WordRepository {
	addWord(data: Word): Promise<void>;
	getWords(): Promise<Word[]>;
}

export default WordRepository;
