const fs = require('fs');
const shell = require('shelljs');
const handlebars = require('handlebars');
const changeCase = require('change-case');

const { errors, success } = require('../echo/echo-styles');

const writeFile = (program, options) => {
	let results = [];

	let result = {
		status: false,
		message: `${errors.bold('Error:')} something went wrong ¯_(ツ)_/¯`
	};

	options.files.map((obj, i) => {
		if (!obj.name) {
			obj.name = `${changeCase[obj.format](program.directory)}`;
		} else {
			obj.name = `${changeCase[obj.format](obj.name)}`;
		}

		const source = shell.cat(`${obj.template}.hbs`).toString();
		const template = handlebars.compile(source);

		let writeTemplate = `${process.cwd()}/${options.directory.output}/${
			program.directory
		}/${obj.name}${obj.extension}`;

		fs.writeFileSync(
			writeTemplate,
			template({
				name: `${obj.name}`,
				directory: `${changeCase[obj.format](program.directory)}`,
				safeName: `${changeCase.pascalCase(obj.name)}`
			})
		);
		results.push(`"${obj.name}${obj.extension}"`);
	});

	result.status = true;
	result.message = `${success.bold('Success:')} ${success.highlight(
		`${results}`
	)} created ok`;

	return result;
};

module.exports = writeFile;
