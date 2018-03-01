const path = require('path');
const shell = require('shelljs');

const { errors, success } = require('./error-styles');

const checkConfig = (config, type) => {
	if (!shell.test('-e', config)) {
		shell.echo(
			`${errors.bold('Error:')} config ${errors.highlight(
				`"${config}"`
			)} not found`
		);
		process.exit();
	}
	return require(path.resolve(process.cwd(), `${config}`));
};

const checkRequiredFlags = program => {
	let requiredFlags = [];

	let result = {
		status: false,
		message: `${errors.bold('Error:')} Missing one or more ${errors.highlight(
			'<required>'
		)} flags`
	};

	program.options.map((opts, i) => {
		if (opts.flags.includes('<required>')) {
			requiredFlags.push(program[opts.long.replace('--', '')]);
		}
	});

	if (!requiredFlags.includes(undefined)) {
		result.status = true;
		result.message = `${success.bold('Success:')} all ${success.highlight(
			'<required>'
		)} flags found`;
	}

	return result;
};

const checkEntry = (configObject, entry) => {
	let result = {
		status: false,
		message: `${errors.bold('Error:')} array ${errors.highlight(
			`"${entry}"`
		)} not found in config file`
	};

	if (configObject.hasOwnProperty(`${entry}`)) {
		// TODO and check the entry array has at least 1 object in it
		result.status = true;
		result.message = `${success.bold('Success:')} array ${success.highlight(
			`"${entry}"`
		)} found in config file`;
	}

	return result;
};

const checkKeys = options => {
	const requiredKeys = [
		'output',
		'extension',
		'format',
		'template',
		'directory',
		'name'
	];

	let result = {
		status: true,
		message: `${success.bold('Success:')} all object keys found`
	};

	options.config[options.entry].map((object, i) => {
		let keys = Object.keys(object);
		let index = i;
		requiredKeys.every(item => {
			if (!object.hasOwnProperty(item)) {
				result.status = false;
				result.message = `${errors.bold('Error:')} ${errors.highlight(
					`"${item}"`
				)} is ${errors.underline(
					`${keys[item]}`
				)} The Problem occoured in the ${errors.highlight(
					`"${options.entry}"`
				)} array at index ${errors.highlight(`${index}`)}`;
			}
			return object.hasOwnProperty(item);
		});
	});

	return result;
};

module.exports = {
	checkConfig,
	checkRequiredFlags,
	checkEntry,
	checkKeys
};
