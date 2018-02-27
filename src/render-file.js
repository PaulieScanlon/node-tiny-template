const path = require('path');
const shell = require('shelljs');
const handlebars = require('handlebars');
const changeCase = require('change-case');

const renderFile = obj => {
	const source = shell.cat(`${obj.template}.hbs`).toString();

	const template = handlebars.compile(source);

	return template({ name: `${changeCase[obj.format](obj.directory)}` });
};

module.exports = renderFile;
