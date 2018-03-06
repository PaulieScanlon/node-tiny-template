const shell = require('shelljs');

const writeDir = require('./write/write-dir');
const writeFile = require('./write/write-file');

const {
	checkConfig,
	checkRequiredArgs,
	checkDirectory,
	checkFiles
} = require('./error/error-checks');

const { errors, success, onComplete, tiny } = require('./echo/echo-styles');

const defaultConfig = 'tiny-template.config.js';

let options = {
	config: null
};

const templateGenerator = (program, err) => {
	shell.echo('');
	shell.echo(`${tiny.starting(' STARTING ')} Tiny Template starting up!`);
	shell.echo('');

	// Check existance of config files either custom -c arg or the default one
	const config = checkConfig(program.config ? program.config : defaultConfig);
	shell.echo(config.message);
	if (!config.status) {
		return err();
	}

	// Set config on the options object
	options.config = config.object;

	// Check all required args have been passed in
	const requiredArgs = checkRequiredArgs(program);
	shell.echo(requiredArgs.message);

	// Check the directory key exists in the config file
	const directoryFound = checkDirectory(options.config, program);
	shell.echo(directoryFound.message);

	// Check the files key exists in the config file
	const filesFound = checkFiles(options.config);
	shell.echo(filesFound.message);

	if (requiredArgs.status && filesFound.status && directoryFound.status) {
		// 5. If onComplete is defined, execute it!
		if (options.config.onComplete) {
			shell.echo(`${onComplete.bold('OnComplete:')}`);
			options.config.onComplete(options.config);
		}

		shell.echo('');
		shell.echo(`${tiny.finished(' FINISHED ')} Tiny Template finished!`);
		shell.echo('');
	}

	return err();
};

module.exports = templateGenerator;

// // Check the passed in -e entry exists in the config file
// const entryFound = checkEntry(config, program.entry);
// shell.echo(entryFound.message);
// if (!entryFound.status) {
// 	return err();
// }

// // Set some stuff on the options object
// options.config = config.object;
// options.entry = program.entry;
// options.directory = program.directory;
// options.force = program.force ? program.force : false;

// // If no name has been passed in from config file set it to the same as the -d directory
// // and create a new options config objct
// options.config[options.entry].map((obj, i) => {
// 	obj['directory'] = options.directory;
// 	if (!obj.name) {
// 		obj['name'] = options.directory;
// 	}
// });

// // check if all keys are present in config
// let keys = checkKeys(options);
// shell.echo(keys.message);
// if (!keys.status) {
// 	return err();
// }

// // 2. write the dir
// let dir = writeDir(options);
// shell.echo(dir.message);
// if (!dir.status) {
// 	return err();
// }

// // 3. check if the template files are there before attempting to write them
// let templates = checkTemplates(options);
// shell.echo(templates.message);
// if (!templates.status) {
// 	return err();
// }

// // 4. compile and write the files using the templates
// let file = writeFile(options);
// shell.echo(file.message);
// if (!file.status) {
// 	return err();
// }
