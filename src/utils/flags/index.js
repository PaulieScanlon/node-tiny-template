const flags = {
  directory: {
    short: '-d',
    long: '--directory <required>',
		isRequired: true,
    description: 'required output directory',
    validate: (rawArgs) => {
      return rawArgs.includes(flags.directory.short);
    }
  },
  config: {
    short: '-c',
    long: '--config [optional]',
		isRequired: false,
    description: 'optional path to config file',
  },
  force: {
    short: '-f',
    long: '--force [optional]',
		isRequired: true,
    description: 'force writes a directory'
  }
};

module.exports = flags;