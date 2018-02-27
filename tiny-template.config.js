const path = require('path');

const paths = {
	components: './examples/components'
};

const config = {
	components: [
		{
			output: paths.components,
			extension: '.js',
			format: 'pascalCase',
			template: './templates/components-js'
		},
		{
			output: paths.components,
			name: 'styles',
			extension: '.css',
			format: 'paramCase',
			template: './templates/components-css'
		}
	]
};

module.exports = config;
