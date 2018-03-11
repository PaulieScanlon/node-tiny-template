const path = require('path');
// const shell = require('shelljs');
// const exec = require('child_process').exec;

const writeDir = require('./write-dir');

const config = {
	directory: {
		format: 'paramCase',
		output: './examples/components'
	}
};

describe('writeDir()', () => {
	test('status returns "false" if writing dir error', () => {
		const result = writeDir(
			(program = {
				force: false,
				directory: 'app-component'
			}),
			config
		);
		expect(result.status).toBe(false);
	});

	// TODO how can a test be written if it actually runs and creates the dir
	// It'll pass first time but then every subsequent time it'll fail because the dir now exists
	// maybe some kind of promise thing that will await the creation of the dir then delete it?

	// const delDir = () => {
	// 	console.log('//////// delDir');
	// 	exec(
	// 		`rm -r ${path.join(process.cwd(), `examples/components/new-component`)}`
	// 	);
	// };

	// test('status returns "true" if writing dir success', () => {
	// 	const result = writeDir(
	// 		(program = {
	// 			force: false,
	// 			directory: 'new-component'
	// 		}),
	// 		config
	// 	);
	// 	expect(result.status).toBe(true);
	// 	delDir();
	// });

	test('status returns "true" if write dir is forced', () => {
		const result = writeDir(
			(program = {
				force: true,
				directory: 'app-component'
			}),
			config
		);
		expect(result.status).toBe(true);
	});
});
