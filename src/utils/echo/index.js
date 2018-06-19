const chalk = require('chalk');

const errors = {
	bold: chalk.bold.red,
	highlight: chalk.red,
	underline: chalk.underline.red
};

const success = {
	bold: chalk.bold.green,
	highlight: chalk.green,
	underline: chalk.underline.green
};

const warnings = {
	bold: chalk.bold.yellowBright,
	highlight: chalk.yellowBright,
	underline: chalk.underline.yellowBright
};

const onComplete = {
	bold: chalk.bold.magentaBright,
	highlight: chalk.magentaBright,
	underline: chalk.underline.magentaBright
};

const tiny = {
	starting: chalk.bgGreen,
	success: chalk.bgMagentaBright,
	error: chalk.bgRedBright
};

module.exports = {
	errors,
	success,
	warnings,
	tiny,
	onComplete
};
