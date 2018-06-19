const shell = require('shelljs');
const handlebars = require('handlebars');

const { errors, success } = require('../../utils/echo');

const checkTemplates = files => {
	// console.log(files);

	let result = {
		status: true,
		message: `${success.bold('Success:')} all ${success.highlight(
			'"templates"'
		)} found ok!`
	};

	for (let i = 0; i < files.length; i++) {
		let file = shell.test('-f', `${process.cwd()}/${files[i].template}`);
		if (!file) {
			return {
				status: false,
				message: `${errors.bold('Error:')} Cannot find file ${errors.highlight(
					`"${files[i].template}!"`
				)}`
			};
		}
	}

	return result;
};

module.exports = {
	checkTemplates
};
