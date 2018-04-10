const shell = require('shelljs');

const defaultConfig = 'tiny-template.config.js';

const writeDir = require('./write/write-dir');
const writeFile = require('./write/write-file');

const {
	checkRequiredArgs,
	checkConfigFile,
	checkConfigObject
} = require('./error/error-checks');

const checkObjectLogic = require('./logic/objectLogic');

const templateGenerator = (program, err, success) => {
	// Check all required args have been passed in
	const requiredArgs = checkRequiredArgs(program);
	shell.echo(requiredArgs.message);
	requiredArgs.status ? null : err();

	// Check existance of config files either custom -c arg or the default one
	const configFile = checkConfigFile(
		program.config !== undefined ? program.config : defaultConfig
	);
	shell.echo(configFile.message);
	configFile.status ? null : err();

	// Check all the parts of the object exist
	const objectLogic = checkObjectLogic(program, configFile);
	objectLogic.status ? null : err();
};

module.exports = templateGenerator;
