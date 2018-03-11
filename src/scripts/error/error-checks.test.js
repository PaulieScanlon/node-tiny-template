const {
	checkConfigFile,
	checkRequiredArgs,
	checkConfigObject,
	checkDirectoryObject,
	checkFilesObject,
	checkRequiredKeys,
	checkTemplates
} = require('./error-checks');

describe('checkConfigFile()', () => {
	test('status returns "false" if missing config file', () => {
		const result = checkConfigFile('missing.config.js');
		expect(result.status).toBe(false);
	});
	test('status returns "true" if finds config file', () => {
		const result = checkConfigFile('tiny-template.config.js');
		expect(result.status).toBe(true);
	});
});

describe('checkRequiredArgs()', () => {
	test('it returns "false" if missing required args', () => {
		const result = checkRequiredArgs(
			(program = {
				options: [
					{
						flags: '-d --directory <required>',
						short: '-d'
					}
				],
				rawArgs: [],
				directory: 'new-component'
			})
		);
		expect(result.status).toBe(false);
	});
	test('it returns "true" if finds required args', () => {
		const result = checkRequiredArgs(
			(program = {
				options: [
					{
						flags: '-d --directory <required>',
						short: '-d'
					}
				],
				rawArgs: ['-d'],
				directory: 'new-component'
			})
		);
		expect(result.status).toBe(true);
	});
});

describe('checkConfigObject()', () => {
	test('status returns "false" if config object is empty', () => {
		const result = checkConfigObject((options = { config: {} }));
		expect(result.status).toBe(false);
	});
});

describe('checkDirectoryObject()', () => {
	test('status returns "false" if directory object is missing ', () => {
		const result = checkConfigObject((options = { config: {} }));
		expect(result.status).toBe(false);
	});
});

describe('checkFilesObject()', () => {
	test('status returns "false" if files object is missing ', () => {
		const result = checkFilesObject((options = { config: {} }));
		expect(result.status).toBe(false);
	});
});

describe('checkRequiredKeys() - directory', () => {
	test('status returns "false" if "directory" is missing required keys', () => {
		const result = checkRequiredKeys(
			(config = {
				directory: {}
			}),
			'directory'
		);
		expect(result.status).toBe(false);
	});
});

describe('checkRequiredKeys() - files', () => {
	test('status returns "false" if "files" is missing required keys', () => {
		const result = checkRequiredKeys(
			(config = {
				files: {}
			}),
			'files'
		);
		expect(result.status).toBe(false);
	});
});

describe('checkTemplates()', () => {
	test('status returns "false" if templates not found', () => {
		const result = checkTemplates(
			(config = {
				files: [{ template: './examples/templates/missing-template' }]
			})
		);
		expect(result.status).toBe(false);
	});
});
