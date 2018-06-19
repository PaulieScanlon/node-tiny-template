const shell = require('shelljs');

const defaultConfig = 'tiny-template.config.js';

const { onComplete } = require('../utils/echo');

// TODO change all to default export
const { checkRequiredArgs } = require('./required-args/');
const { checkConfigFile } = require('./config-file/');
const { checkConfigRoot } = require('./config-root/');
const { checkDirectoryKeys } = require('./directory-keys/');
const { checkFilesKeys } = require('./files-keys/');
const { checkTemplates } = require('./templates/');

const { checkWriteDir } = require('./write-dir/');
const { checkWriteFile } = require('./write-file/');

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

	// Check templates exist
	const templates = checkTemplates(configFile.config.files);
	shell.echo(templates.message);
	templates.status ? null : err();

	// Write the dirrectory
	const writeDir = checkWriteDir(
		program.directory,
		program.force,
		configFile.config
	);
	shell.echo(writeDir.message);
	writeDir.status ? null : err();

	// Write the file
	const writeFile = checkWriteFile(
		program.directory,
		configFile.config.directory.output,
		configFile.config.files
	);
	shell.echo(writeFile.message);
	writeFile.status ? null : err();

	// Run the onComplete if it's there
	if (configFile.config.onComplete) {
		shell.echo(`${onComplete.bold('OnComplete:')}`);
		configFile.config.onComplete(writeFile.options);
	}
};

module.exports = templateGenerator;
