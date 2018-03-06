const path = require('path');

const paths = {
	components: './examples/components',
	templates: './examples/templates'
};

const config = {
	directory: {
		format: 'paramCase',
		output: './new-examples/tests'
	},
	files: [
		{
			inherit: true,
			extension: '.js',
			format: 'pascalCase',
			template: `${paths.templates}/components-js`
		},
		{
			name: 'styles',
			extension: '.css',
			format: 'paramCase',
			template: `${paths.templates}/components-css`
		}
	],
	onComplete: options => {
		console.log(options);
	}
};

module.exports = config;
