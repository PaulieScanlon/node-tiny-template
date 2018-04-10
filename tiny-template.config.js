const path = require('path');

const paths = {
	templates: './examples/templates'
};

const config = {
	directory: {
		format: 'paramCase',
		output: './new-examples'
	},
	files: [
		{
			extension: '.js',
			format: 'paramCase',
			template: `${paths.templates}/components-js`
		}
		// {
		// 	name: 'styles',
		// 	extension: '.css',
		// 	format: 'paramCase',
		// 	template: `${paths.templates}/components-css`
		// }
	],
	onComplete: options => {
		console.log(options);
	}
};

module.exports = config;
