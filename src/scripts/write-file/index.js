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
			camelCase: object.name
				? `${changeCase.camelCase(object.name)}`
				: `${changeCase.camelCase(directory)}`,
			constantCase: object.name
				? `${changeCase.constantCase(object.name)}`
				: `${changeCase.constantCase(directory)}`,
			paramCase: object.name
				? `${changeCase.paramCase(object.name)}`
				: `${changeCase.paramCase(directory)}`,
			pascalCase: object.name
				? `${changeCase.pascalCase(object.name)}`
				: `${changeCase.pascalCase(directory)}`,
			snakeCase: object.name
				? `${changeCase.snakeCase(object.name)}`
				: `${changeCase.snakeCase(directory)}`
		};
	});

	const results = [];
	for (let i = 0; i < options.length; i++) {
		fs.writeFileSync(
			`${options[i].path}/${options[i].name}.${options[i].extension}`,
			options[i].template({
				directory: options[i].dir,
				name: options[i].name,
				extension: options[i].extension,
				camelCase: options[i].camelCase,
				constantCase: options[i].constantCase,
				paramCase: options[i].paramCase,
				pascalCase: options[i].pascalCase,
				snakeCase: options[i].snakeCase
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
