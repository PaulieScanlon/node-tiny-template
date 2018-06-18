const shell = require('shelljs');

const requiredKeys = [
	'directory',
	'format',
	'output',
	'files',
	'extension',
	'format',
	'template',
	'onComplete'
];

const checkProperty = key => {
	console.log('key', key);
	// if (!requiredKeys.includes(key)) {
	// 	shell.echo(`error: ${key} not found`);
	// }

	return null;
};

module.exports = checkProperty;
