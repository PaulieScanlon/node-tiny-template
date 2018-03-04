const writeDir = require('./write-dir');

const optionsCorrect = {
	entry: 'components',
	directory: 'app-component',
	config: {
		components: [
			{
				output: './examples/components',
				extension: '.js',
				format: 'pascalCase',
				template: './examples/templates/components-js'
			}
		]
	}
};

describe('writeDir()', () => {
	test('returns "false" if writing dir fails', () => {
		const result = writeDir(optionsCorrect);
		expect(result.status).toBe(false);
	});
});
