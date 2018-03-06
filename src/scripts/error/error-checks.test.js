const { checkConfig } = require('./error-checks');

const configFileCorrect = 'tiny-template.config.js';
const configFileInCorrect = 'missing.config.js';

describe('checkConfig()', () => {
	test('returns "false" if missing config file', () => {
		const result = checkConfig(configFileInCorrect);
		expect(result.status).toEqual(false);
	});
	test('returns "true" if finds config file', () => {
		const result = checkConfig(configFileCorrect);
		expect(result.status).toEqual(true);
	});
});
