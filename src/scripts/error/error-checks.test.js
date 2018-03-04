const {
	checkConfig,
	checkRequiredFlags,
	checkEntry,
	checkKeys,
	checkTemplates
} = require('./error-checks');

const programIncorrect = {
	options: []
};

const programCorrect = {
	options: [
		{
			flags: '-e, --entry <required>',
			short: '-e'
		},
		{
			flags: '-d, --directory <required>',
			short: '-d'
		}
	],
	rawArgs: ['-e', '-d']
};

const configFileCorrect = 'tiny-template.config.js';
const configFileInCorrect = 'missing.config.js';

const configCorrect = {
	status: true,
	object: {
		entryCorrect: [
			{
				output: './examples/components',
				extension: '.js',
				format: 'pascalCase',
				template: './examples/templates/components-js'
			}
		]
	}
};

const configIncorrect = {
	status: false,
	object: {
		entryIncorrect: [
			{
				output: '',
				extension: '.js',
				format: 'pascalCase',
				template: './examples/templates/missing-js'
			}
		]
	}
};

const optionsCorrect = {
	entry: 'configCorrect',
	config: {
		configCorrect: [
			{
				output: '',
				extension: '.js',
				format: 'pascalCase',
				template: './examples/templates/components-js',
				name: 'correct-name',
				directory: 'correct-directory'
			}
		]
	}
};

const optionsIncorrect = {
	entry: 'configIncorrect',
	config: {
		configIncorrect: [
			{
				output: '',
				extension: '.js',
				format: 'pascalCase',
				template: './examples/templates/missing-js'
			}
		]
	}
};

describe('checkConfig', () => {
	test('returns "false" if missing config file', () => {
		const result = checkConfig(configFileInCorrect);
		expect(result.status).toEqual(false);
	});
	test('returns "true" if finds config file', () => {
		const result = checkConfig(configFileCorrect);
		expect(result.status).toEqual(true);
	});
});

describe('checkRequiredFlags()', () => {
	test('returns "false" if missing <required> flags', () => {
		const result = checkRequiredFlags(programIncorrect);
		expect(result.status).toEqual(false);
	});
	test('returns "true" if finds <required> flags', () => {
		const result = checkRequiredFlags(programCorrect);
		expect(result.status).toEqual(true);
	});
});

describe('checkEntry()', () => {
	test('returns "false" if entry array missing in config', () => {
		const result = checkEntry(configIncorrect, 'entry');
		expect(result.status).toEqual(false);
	});
	test('returns "true" if entry array found in config', () => {
		const result = checkEntry(configCorrect, 'entryCorrect');
		expect(result.status).toEqual(true);
	});
});

describe('checkKeys()', () => {
	test('returns "false" if some keys missing in entry', () => {
		const result = checkKeys(optionsIncorrect);
		expect(result.status).toEqual(false);
	});
	test('returns "true" if all keys found in entry', () => {
		const result = checkKeys(optionsCorrect);
		expect(result.status).toEqual(true);
	});
});

describe('checkTemplate()', () => {
	test('returns "false" if missing template', () => {
		const result = checkTemplates(optionsIncorrect);
		expect(result.status).toEqual(false);
	});
	test('returns "true" if finds template', () => {
		const result = checkTemplates(optionsIncorrect);
		expect(result.status).toEqual(false);
	});
});
