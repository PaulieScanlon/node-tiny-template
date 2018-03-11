const shell = require('shelljs');

const writeDir = require('./write/write-dir');
const writeFile = require('./write/write-file');

const {
	checkConfigFile,
	checkConfigObject,
	checkRequiredArgs,
	checkDirectoryObject,
	checkFilesObject,
	checkRequiredKeys,
	checkTemplates
} = require('./error/error-checks');

const { errors, onComplete, tiny } = require('./echo/echo-styles');

const defaultConfig = 'tiny-template.config.js';

let options = {
	config: null
};

const templateGenerator = (program, err, success) => {
	// Check existance of config files either custom -c arg or the default one
	const configFile = checkConfigFile(
		program.config !== undefined ? program.config : defaultConfig
	);
	shell.echo(configFile.message);

	// Check all required args have been passed in
	const requiredArgs = checkRequiredArgs(program);
	shell.echo(requiredArgs.message);

	// Check config object is in config file before assing it to options.config
	const configObject = checkConfigObject(configFile);
	shell.echo(configObject.message);

	let directoryObjectFound = null;
	let filesObjectFound = null;
	let directoryRequiredKeys = null;
	let filesRequiredKeys = null;
	let templatesFound = null;

	if (configObject.status) {
		// Set assign config to options.config
		options.config = configObject.config;

		// Check the directory object exists in the config file
		directoryObjectFound = checkDirectoryObject(options.config, program);
		shell.echo(directoryObjectFound.message);

		// Check the files array/object exists in the config file
		filesObjectFound = checkFilesObject(options.config);
		shell.echo(filesObjectFound.message);

		// Check required keys // directory
		if (directoryObjectFound.status) {
			directoryRequiredKeys = checkRequiredKeys(options.config, 'directory');
			shell.echo(directoryRequiredKeys.message);
		}

		// Check required keys // files
		if (filesObjectFound.status) {
			filesRequiredKeys = checkRequiredKeys(options.config, 'files');
			filesRequiredKeys.status && shell.echo(filesRequiredKeys.message);

			// Check templates
			templatesFound = checkTemplates(options.config);
			shell.echo(templatesFound.message);
		}
	}

	if (
		configFile.status &&
		configObject.status &&
		requiredArgs.status &&
		directoryObjectFound.status &&
		filesObjectFound.status &&
		directoryRequiredKeys.status &&
		filesRequiredKeys.status &&
		templatesFound.status
	) {
		// Write the directory
		const directoryWritten = writeDir(program, options.config);
		shell.echo(directoryWritten.message);

		// Write the files if the dir doesnt' already exist
		if (directoryWritten.status) {
			const fileWritten = writeFile(program, options.config);
			shell.echo(fileWritten.message);
		}

		if (options.config.onComplete) {
			shell.echo(`${onComplete.bold('onComplete:')}`);
			options.config.onComplete(options.config);
		}

		if (!directoryWritten.status) {
			return err();
		} else {
			return success();
		}
	}

	return err();
};

module.exports = templateGenerator;
