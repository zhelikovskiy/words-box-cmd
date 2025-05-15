import Word from '../models/word.model';

interface IWordRepository {
	addWord(data: Word): Promise<void>;
	getWords(): Promise<Word[]>;
}

export default IWordRepository;
