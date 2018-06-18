const { errors, success } = require('../echo/echo-styles');

const requiredFilesKeys = ['extension', 'format', 'template'];
const opttionalFilesKeys = ['name'];

const checkFilesKeys = files => {
	let result = {
		status: true,
		message: `${success.bold('Success:')} all ${success.highlight(
			`"files"`
		)} required keys found ok!`
	};

	const required = files.map(object => {
		const filesKeys = Object.keys(object);

		return filesKeys.filter(key => {
			if (!opttionalFilesKeys.includes(key)) {
				return key;
			}
		});
	});

	// console.log(required);

	for (let i = 0; i < required.length; i++) {
		// console.log(required[i]);
		for (let k = 0; k < required[i].length; k++) {
			console.log(required[i][k]);
			// if (!requiredFilesKeys.includes(required[i][k])) {
			// 	console.log(required[i][k], 'should error');
			// }
		}
	}

	return result;
};

module.exports = {
	checkFilesKeys
};

// status: false,
// message: `${errors.bold('Error:')} ${errors.highlight(
//   `"${requiredFilesKeys[i]}"`
// )} is missing from ${errors.highlight(
//   `"files"`
// )} array position ${errors.highlight(`"${i}"`)}`
