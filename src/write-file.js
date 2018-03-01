const fs = require('fs');
const shell = require('shelljs');
const handlebars = require('handlebars');
const changeCase = require('change-case');

const { errors, success } = require('./error-styles');

const writeFile = options => {
	let results = [];

	let result = {
		status: false,
		message: `${errors.bold('Error:')} something went wrong ¯_(ツ)_/¯`
	};

	options.config[options.entry].map((obj, i) => {
		const source = shell.cat(`${obj.template}.hbs`).toString();
		const template = handlebars.compile(source);

		let writeTemplate = `${process.cwd()}/${obj.output}/${obj.directory}/${
			obj.name
		}${obj.extension}`;

		fs.writeFileSync(
			writeTemplate,
			template({ name: `${changeCase[obj.format](obj.directory)}` })
		);
		results.push(`"${obj.name}${obj.extension}"`);
	});

	result.status = true;
	result.message = `${success.bold('Hooray:')} ${success.highlight(
		`${results}`
	)} created ok`;

	return result;
};

module.exports = writeFile;
