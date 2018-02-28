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
	const requiredKeys = new Set([
		'output',
		'extension',
		'format',
		'template',
		'directory',
		'name'
	]);

	let results = [];

	let result = {
		status: false,
		message: 'Error: Missing one or more required object keys!'
	};

	// This is gross!
	// need to find a nicer way to compare keys in config to keys in above requiredKeys array
	options.config[options.entry].map((obj, i) => {
		const configKeys = new Set(Object.getOwnPropertyNames(obj));

		const areSetsEqual = (requiredKeys, configKeys) =>
			requiredKeys.size === configKeys.size &&
			[...requiredKeys].every(value => configKeys.has(value));

		results.push(areSetsEqual(requiredKeys, configKeys));
	});

	if (!results.includes(false)) {
		//nothing is missing return true
		result.status = true;
		result.message = 'Hooray: all object keys are ok!';
	}

	return result;
};

module.exports = {
	checkConfig,
	checkRequiredFlags,
	checkEntry,
	checkKeys
};
