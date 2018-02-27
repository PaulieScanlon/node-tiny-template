const shell = require('shelljs');

const writeDir = require('./write-dir');

const templateGenerator = options => {
	// TODO error checking and object refactor should be done before we get here
	options.config[options.entry].map((obj, i) => {
		obj['directory'] = options.directory;
		if (!obj.name) {
			obj['name'] = options.directory;
		}
		writeDir(obj);
	});
};

module.exports = templateGenerator;
