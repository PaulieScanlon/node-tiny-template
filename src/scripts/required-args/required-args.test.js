const { checkRequiredArgs } = require('./');

const rawArgs = ['-d', 'new-component'];

const flags = require('../../utils/flags/');

describe('checkRequiredArgs()', () => {
	test('errors if -d not found', () => {
		const result = checkRequiredArgs(rawArgs);
		expect(result.status).toEqual(true);
	});
});
