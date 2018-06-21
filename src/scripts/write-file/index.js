const fs = require('fs');
const shell = require('shelljs');
const handlebars = require('handlebars');
const changeCase = require('change-case');

const { errors, success } = require('../../utils/echo');

// TODO put this somehwere helpful
handlebars.registerHelper('raw', function(options) {
	return options.fn(this);
});

// TODO make this less gross!
const returnCase = (name, format) => {
	return changeCase[format](name);
};

const checkWriteFile = (directory, output, files) => {
	let result = {
		status: false,
		message: `${errors.bold('Error:')} something went wrong ¯_(ツ)_/¯`
	};

	const options = files.map(object => {
		return {
			path: `${process.cwd()}/${output}/${directory}`,
			directory: {
				unformatted: directory,
				camelCase: returnCase(directory, 'camelCase'),
				constantCase: returnCase(directory, 'constantCase'),
				paramCase: returnCase(directory, 'paramCase'),
				pascalCase: returnCase(directory, 'pascalCase'),
				snakeCase: returnCase(directory, 'snakeCase'),
				noCase: returnCase(directory, 'noCase')
			},
			name: {
				unformatted: object.name ? object.name : directory,
				formatted: object.name
					? `${changeCase[object.format](object.name)}`
					: `${changeCase[object.format](directory)}`,
				camelCase: object.name
					? returnCase(object.name, 'camelCase')
					: returnCase(directory, 'camelCase'),
				constantCase: object.name
					? returnCase(object.name, 'constantCase')
					: returnCase(directory, 'constantCase'),
				paramCase: object.name
					? returnCase(object.name, 'paramCase')
					: returnCase(directory, 'paramCase'),
				pascalCase: object.name
					? returnCase(object.name, 'pascalCase')
					: returnCase(directory, 'pascalCase'),
				snakeCase: object.name
					? returnCase(object.name, 'snakeCase')
					: returnCase(directory, 'snakeCase'),
				noCase: object.name
					? returnCase(object.name, 'noCase')
					: returnCase(directory, 'noCase')
			},
			extension: object.extension,
			template: handlebars.compile(
				shell.cat(`${process.cwd()}/${object.template}`).toString()
			)
		};
	});

	const results = [];
	for (let i = 0; i < options.length; i++) {
		fs.writeFileSync(
			`${options[i].path}/${options[i].name.formatted}.${options[i].extension}`,
			options[i].template({
				directory: options[i].directory,
				name: options[i].name,
				extension: options[i].extension
			})
		);
		results.push([`${options[i].name.formatted}.${options[i].extension}`]);

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
