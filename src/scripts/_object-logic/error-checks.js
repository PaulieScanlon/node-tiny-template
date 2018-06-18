const path = require('path');
const shell = require('shelljs');
const flags = require('../../flags');

const { errors, success } = require('../echo/echo-styles');

const checkConfigObject = configFile => {
	let result = {
		status: false,
		message: `${errors.bold('Error:')} object ${errors.highlight(
			`"config"`
		)} not found or is empty in ${errors.highlight(
			`"${configFile.fileName}"`
		)}`,
		config: null
	};

	if (Object.keys(configFile.config).length !== 0) {
		result.status = true;
		result.message = result.message = `${success.bold(
			'Success:'
		)} object ${success.highlight('"config"')} found ok!`;
		result.config = configFile.config;
	}

	return result;
};

const checkDirectoryObject = (options, program) => {
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
		)} object found ok!`;
	}

	return result;
};

const checkFilesObject = options => {
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
		)} array found ok!`;
	}

	return result;
};

const checkRequiredKeys = (options, key) => {
	const config = {
		directory: ['format', 'output'],
		files: ['extension', 'format', 'template']
	};

	let result = {
		status: true,
		message: `${success.bold('Success:')} all ${success.highlight(
			`"${key}"`
		)} required keys found ok!`
	};

	let src = null;

	if (options[key].length === undefined) {
		src = Object.keys(options[key]);

		config[key].map(item => {
			if (!src.includes(item)) {
				result.status = false;
				result.message = `${errors.bold('Error:')} ${errors.highlight(
					`"${item}"`
				)} is missing from ${errors.highlight(`"${key}"`)} object!`;
			}
		});
	} else {
		src = options[key];

		src.map((arr, i) => {
			let arrKeys = Object.keys(arr);
			let index = i;

			config[key].map(item => {
				if (!arrKeys.includes(item)) {
					result.status = false;
					result.message = '';
					shell.echo(
						`${errors.bold('Error:')} ${errors.highlight(
							`"${item}"`
						)} is missing from ${errors.highlight(
							`"${key}"`
						)} array position ${errors.highlight(`"${index}"`)}`
					);
				}
			});
		});
	}

	return result;
};

const checkTemplates = options => {
	let result = {
		status: true,
		message: `${success.bold('Success:')} all templates found ok!`
	};

	options.files.map((obj, i) => {
		if (!shell.test('-e', `${obj.template}.hbs`)) {
			result.status = false;
			result.message = `${errors.bold('Error:')} ${errors.highlight(
				`"${obj.template}.hbs"`
			)} not found!`;
		}
	});

	return result;
};

module.exports = {
	checkConfigObject,
	checkDirectoryObject,
	checkFilesObject,
	checkRequiredKeys,
	checkTemplates
};
