import { join } from 'path';

const config = {
	appDirPath: join(
		process.env.LOCALAPPDATA ||
			process.env.HOME ||
			process.env.USERPROFILE ||
			'',
		'word-box'
	),
};

export default config;
