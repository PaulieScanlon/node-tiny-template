const path = require('path');

const paths = {
	templates: 'examples/templates'
};

const config = {
	directory: {
		format: 'paramCase',
		output: 'examples/components'
	},
	files: [
		{
			extension: 'js',
			format: 'camelCase',
			template: `${paths.templates}/components-js.hbs`
		},
		{
			name: 'styles',
			extension: 'css',
			format: 'paramCase',
			template: `${paths.templates}/components-css.hbs`
		}
	],
	onComplete: options => {
		console.log(options);
	}
};

module.exports = config;
