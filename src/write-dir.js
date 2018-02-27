const path = require('path');
const shell = require('shelljs');

const renderFile = require('./render-file');

const writeDir = obj => {
	const renderReturn = renderFile(obj);
	const writeLocation = path.join(`${obj.output}/${obj.directory}`);

	shell.mkdir('-p', writeLocation);
	//special case for json with the quote marks for echo -- TODO needs investigation
	if (obj.extension === '.json') {
		shell.exec(
			`echo '${renderReturn}' > ${writeLocation}/${obj.name}${obj.extension}`
		);
	} else {
		shell.exec(
			`echo "${renderReturn}" > ${writeLocation}/${obj.name}${obj.extension}`
		);
	}

	//TODO check if dir and files already exist
	// if (!shell.test('-e', writeLocation)) {
	// 	shell.echo(`> ${obj.name}${obj.extension} created ok!`);
	// } else {
	// 	shell.echo(`> ${obj.name}${obj.extension} already exists!`);
	// }
};

module.exports = writeDir;
