const shell = require('shelljs');

let constants = require('./constants');

const configErrors = {
	programConfig: 'Error: custom config file/path not found',
	defaultConfig: `Error: default config file ${constants.defaultName} not found`
};

const checkConfig = (config, type) => {
	if (!shell.test('-e', config)) {
		shell.echo(configErrors[type]);
		process.exit();
	}

	return shell.test('-e', config);
};

const checkEntry = entry => {
	if (entry === undefined) {
		shell.echo(`Error: entry '-e' is required`);
		return false;
	}
	return true;
};

const checkArray = (configFile, entry) => {
	if (!configFile.hasOwnProperty(`${entry}`)) {
		shell.echo(`${entry} array not found in config file!`);
		return false;
	}
	return true;
};

const checkDirectory = directory => {
	console.log('checkDirectory: ', directory);
	if (directory === undefined) {
		shell.echo(`Error: directory '-d' is required`);
		return false;
	}
	return true;
};

module.exports = {
	checkConfig,
	checkEntry,
	checkArray,
	checkDirectory
};
