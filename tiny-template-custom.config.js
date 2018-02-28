const path = require('path');

const paths = {
	containers: './examples/containers',
	templates: './examples/templates'
};

const config = {
	containers: [
		{
			output: paths.containers,
			name: 'app-container',
			extension: '.js',
			format: 'pascalCase',
			template: `${paths.templates}/container-js`
		}
	]
};

module.exports = config;
