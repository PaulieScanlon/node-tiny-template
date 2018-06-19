const fs = require('fs');
const shell = require('shelljs');
const handlebars = require('handlebars');
const changeCase = require('change-case');

const { errors, success } = require('../../utils/echo');

const checkWriteFile = (directory, output, files) => {
	let result = {
		status: false,
		message: `${errors.bold('Error:')} something went wrong ¯_(ツ)_/¯`
	};

	const options = files.map(object => {
		return {
			path: `${process.cwd()}/${output}/${directory}`,
			dir: directory,
			name: object.name
				? `${changeCase[object.format](object.name)}`
				: `${changeCase[object.format](directory)}`,
			extension: object.extension,
			template: handlebars.compile(
				shell.cat(`${process.cwd()}/${object.template}`).toString()
			),
			safeName: object.name
				? `${changeCase.pascalCase(object.name)}`
				: `${changeCase.pascalCase(directory)}`
		};
	});

	const results = [];
	for (let i = 0; i < options.length; i++) {
		fs.writeFileSync(
			`${options[i].path}/${options[i].name}.${options[i].extension}`,
			options[i].template({
				name: options[i].name,
				directory: options[i].dir,
				safeName: options[i].safeName
			})
		);
		results.push([`${options[i].name}.${options[i].extension}`]);

		if (i === options.length - 1) {
			return {
				status: true,
				message: `${success.bold('Success:')} ${success.highlight(
					`"${results}"`
				)} created ok!`,
				options: options
			};
		}
	}

	return result;
};

module.exports = {
	checkWriteFile
};
