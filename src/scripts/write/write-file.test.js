const writeFile = require('./write-file');

const optionsCorrect = {
	entry: 'components',
	directory: 'app-component',
	config: {
		components: [
			{
				output: './examples/components',
				name: 'app-component',
				directory: 'app-component',
				extension: '.js',
				format: 'pascalCase',
				template: 'examples/templates/components-js'
			}
		]
	}
};

// This test works but if you're in watch mode it runs on
// a continuous loop as creating the dir triggers a change
// which triggers the test again
describe('writeFile()', () => {
	test.skip('returns "true" if writing file fails', () => {
		const result = writeFile(optionsCorrect);
		expect(result.status).toBe(true);
	});
});
