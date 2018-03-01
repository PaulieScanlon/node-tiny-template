const path = require('path');
const shell = require('shelljs');

const checkConfig = (config, type) => {
	if (!shell.test('-e', config)) {
		shell.echo(`Error: "${config}" not found`);
		process.exit();
	}
	return require(path.resolve(process.cwd(), `${config}`));
};

const checkRequiredFlags = program => {
	let requiredFlags = [];

	let result = {
		status: false,
		message: 'Error: Missing one or more <required> flags!'
	};

	program.options.map((opts, i) => {
		if (opts.flags.includes('<required>')) {
			requiredFlags.push(program[opts.long.replace('--', '')]);
		}
	});

	if (!requiredFlags.includes(undefined)) {
		result.status = true;
		result.message = 'Hooray: looks like we have all <required> flags!';
	}

	return result;
};

const checkEntry = (configObject, entry) => {
	let result = {
		status: false,
		message: `Error: "${entry}" array not found in config file!`
	};

	if (configObject.hasOwnProperty(`${entry}`)) {
		// TODO and check the entry array has at least 1 object in it
		result.status = true;
		result.message = `Hooray: "${entry}" array found in config file!`;
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
		message: 'Hooray: all object keys are ok!'
	};

	options.config[options.entry].map((object, i) => {
		let keys = Object.keys(object);
		let index = i;
		requiredKeys.every(item => {
			if (!object.hasOwnProperty(item)) {
				result.status = false;
				result.message = `Error: "${item}" is ${
					keys[item]
				}! The Problem occoured in "${options.entry}" array at index ${index}!`;
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
