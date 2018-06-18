const shell = require('shelljs');

const {
	checkConfigObject,
	checkDirectoryObject,
	checkFilesObject,
	checkRequiredKeys,
	checkTemplates
} = require('../object-logic/error-checks');

let options = {
	config: null
};

const checkObjectLogic = (program, configFile) => {
	// Check config object is in config file before passing it to options.config
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
		configObject.status &&
		directoryObjectFound.status &&
		filesObjectFound.status &&
		directoryRequiredKeys.status &&
		filesRequiredKeys.status &&
		templatesFound.status
	) {
		return {
			status: true,
			config: options.config
		};
	}

	return {
		status: false,
		config: {}
	};
};

module.exports = {
	checkObjectLogic
};
