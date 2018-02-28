const path = require('path');

const paths = {
	components: './examples/components',
	templates: './examples/templates'
};

const config = {
	components: [
		{
			output: paths.components,
			name: 'my-component',
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
	]
};

module.exports = config;
