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

const tiny = {
	starting: chalk.bgCyanBright,
	finished: chalk.bgCyanBright
};

module.exports = {
	errors,
	success,
	tiny
};
