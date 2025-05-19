import Word from '../models/word.model';
import { AddWordDto } from './dto/add-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';

interface WordRepository {
	findWords(filter?: Partial<Word>): Promise<Word[]>;
	findWord(filter?: Partial<Word>): Promise<Word | undefined>;
	addWord(data: AddWordDto): Promise<void>;
	deleteWord(id: number): Promise<void>;
	updateWord(data: UpdateWordDto): Promise<void>;
}

export default WordRepository;
