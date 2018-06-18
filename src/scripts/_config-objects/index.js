const shell = require('shelljs');
const { errors, success } = require('../echo/echo-styles');

const checkProperty = require('./check-property');

const checkKeys = property => {
	Object.keys(property).forEach(key => {
		checkProperty(key);
	});
};

const checkConfigObjects = (program, configFile) => {
	// console.log(program);
	// console.log(configFile);
	// 1. Check directory is there && has format & output keys
	Object.keys(configFile.config).forEach(key => {
		const asd = configFile.config[key];
		// console.log(asd);
		if (Array.isArray(asd)) {
			asd.forEach(a => {
				// console.log(a);
				checkKeys(a);
			});
		} else {
			checkProperty(key);
			checkKeys(asd);
		}
	});

	//move out into another check in template-gen.js
	// 5. Check templates
};

module.exports = {
	checkConfigObjects
};

// 1. Check the directory object exists in the config file

// 2. Check the files array/object exists in the config file

// 3. Check required keys // directory

// 4. Check required keys // files
