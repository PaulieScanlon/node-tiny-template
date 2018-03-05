const path = require('path');
const { exec } = require('child_process');

const paths = {
	components: './examples/components',
	templates: './examples/templates'
};

const config = {
	components: [
		{
			output: paths.components,
			extension: '.js',
			format: 'pascalCase',
			template: `${paths.templates}/components-js`
		},
		{
			output: paths.components,
			name: 'styles',
			extension: '.css',
			format: 'paramCase',
			template: `${paths.templates}/components-css`
		}
	],
	onComplete: options => {
		exec(
			'node ./tiny-template-on-complete.js',
			{ env: options },
			(err, stdout, stderr) => {
				if (err) {
					console.error(err);
					return;
				}
				console.log(stdout);
			}
		);
	}
};

module.exports = config;
