const shell = require('shelljs');

const defaultConfig = 'tiny-template.config.js';

const writeDir = require('./write/write-dir');
const writeFile = require('./write/write-file');

const { checkRequiredArgs } = require('./required-args/');
const { checkConfigFile } = require('./config-file/');
const { checkConfigRoot } = require('./config-root');

const { checkDirectoryKeys } = require('./directory-keys');
const { checkFilesKeys } = require('./files-keys');

const templateGenerator = (program, err, success) => {
	// Check all required args have been passed in

	const requiredArgs = checkRequiredArgs(program.rawArgs);
	shell.echo(requiredArgs.message);
	requiredArgs.status ? null : err();

	//Check existance of config files either custom -c arg or the default one
	const configFile = checkConfigFile(
		program.config !== undefined ? program.config : defaultConfig
	);
	shell.echo(configFile.message);
	configFile.status ? null : err();

	// Check directory object
	const directoryObject = checkConfigRoot(configFile, 'directory');
	shell.echo(directoryObject.message);
	directoryObject.status ? null : err();

	// Check files array
	const filesArray = checkConfigRoot(configFile, 'files');
	shell.echo(filesArray.message);
	filesArray.status ? null : err();

	// Check directory object contains required keys
	const directoryKeys = checkDirectoryKeys(configFile.config.directory);
	shell.echo(directoryKeys.message);
	directoryKeys.status ? null : err();

	// Check files array contains required keys
	const filesKeys = checkFilesKeys(configFile.config.files);
	shell.echo(filesKeys.message);
	filesKeys.status ? null : err();
};

module.exports = templateGenerator;
