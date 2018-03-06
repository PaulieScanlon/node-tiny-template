const path = require('path');
const shell = require('shelljs');

const { errors, success } = require('../echo/echo-styles');

const checkConfig = config => {
	let result = {
		status: false,
		message: `${errors.bold('Error:')} config ${errors.highlight(
			`"${config}"`
		)} not found`,
		object: null
	};

	if (shell.test('-e', config)) {
		result.status = true;
		result.message = `${success.bold('Success:')} file ${success.highlight(
			`"${config}"`
		)} ok`;
		result.object = require(path.resolve(process.cwd(), `${config}`));
	}

	return result;
};

const checkRequiredArgs = program => {
	let requiredArgs = [];
	let flatStatus = false;

	let result = {
		status: false,
		message: `${errors.bold('Error:')} Missing one or more ${errors.highlight(
			'"<required>"'
		)} args`
	};

	program.options.map((opts, i) => {
		if (opts.flags.includes('<required>')) {
			requiredArgs.push(opts.short);
		}
	});

	requiredArgs.map((rf, i) => {
		argStatus = program.rawArgs.includes(rf);
	});

	if (argStatus) {
		result.status = true;
		result.message = `${success.bold('Success:')} all ${success.highlight(
			'"<required>"'
		)} args ok`;
	}

	return result;
};

const checkDirectory = (options, program) => {
	let result = {
		status: false,
		message: `${errors.bold('Error:')} config ${errors.highlight(
			`"directory"`
		)} not found or is empty`
	};

	if (options.directory && Object.keys(options.directory).length !== 0) {
		result.status = true;
		result.message = `${success.bold('Success:')} config ${success.highlight(
			'"directory"'
		)} ok`;
	}

	return result;
};

const checkFiles = options => {
	let result = {
		status: false,
		message: `${errors.bold('Error:')} config ${errors.highlight(
			`"files"`
		)} not found or is empty`
	};

	if (options.files && options.files.length !== 0) {
		result.status = true;
		result.message = `${success.bold('Success:')} config ${success.highlight(
			'"files"'
		)} ok`;
	}

	return result;
};

module.exports = {
	checkConfig,
	checkRequiredArgs,
	checkDirectory,
	checkFiles
};

// const path = require('path');
// const shell = require('shelljs');

// const { errors, success } = require('../echo/echo-styles');

// const checkConfig = config => {
// 	let result = {
// 		status: false,
// 		message: `${errors.bold('Error:')} config ${errors.highlight(
// 			`"${config}"`
// 		)} not found`,
// 		object: null
// 	};

// 	if (shell.test('-e', config)) {
// 		result.status = true;
// 		result.message = `${success.bold('Success:')} ${success.highlight(
// 			`${config}`
// 		)} found`;
// 		result.object = require(path.resolve(process.cwd(), `${config}`));
// 	}

// 	return result;
// };

// const checkEntry = (config, entry) => {
// 	let result = {
// 		status: false,
// 		message: `${errors.bold('Error:')} array ${errors.highlight(
// 			`"${entry}"`
// 		)} not found in config file`
// 	};

// 	if (config.object.hasOwnProperty(`${entry}`)) {
// 		// TODO and check the entry array has at least 1 object in it
// 		result.status = true;
// 		result.message = `${success.bold('Success:')} array ${success.highlight(
// 			`"${entry}"`
// 		)} found in config file`;
// 	}

// 	return result;
// };

// const checkKeys = options => {
// 	const requiredKeys = [
// 		'output',
// 		'extension',
// 		'format',
// 		'template',
// 		'directory',
// 		'name'
// 	];

// 	let result = {
// 		status: true,
// 		message: `${success.bold('Success:')} all object keys found`
// 	};

// 	options.config[options.entry].map((object, i) => {
// 		let keys = Object.keys(object);
// 		let index = i;
// 		requiredKeys.every(item => {
// 			if (!object.hasOwnProperty(item)) {
// 				result.status = false;
// 				result.message = `${errors.bold('Error:')} ${errors.highlight(
// 					`"${item}"`
// 				)} is ${errors.underline(
// 					`${keys[item]}`
// 				)} The Problem occoured in the ${errors.highlight(
// 					`"${options.entry}"`
// 				)} array at index ${errors.highlight(`${index}`)}`;
// 			}
// 			return object.hasOwnProperty(item);
// 		});
// 	});

// 	return result;
// };

// const checkTemplates = options => {
// 	let result = {
// 		status: true,
// 		message: `${success.bold('Success:')} all templates found`
// 	};

// 	options.config[options.entry].map((obj, i) => {
// 		if (!shell.test('-e', `${obj.template}.hbs`)) {
// 			result.status = false;
// 			result.message = `${errors.bold('Error:')} ${errors.highlight(
// 				`"${obj.template}.hbs"`
// 			)} not found`;
// 		}
// 	});

// 	return result;
// };

// module.exports = {
// 	checkConfig,
// 	checkRequiredFlags,
// 	checkEntry,
// 	checkKeys,
// 	checkTemplates
// };
