import fs from 'fs';
/**
 * @param {string} filePath filePath Reads data from "filePath"
 */
export const createFolder = (filePath) => {
	fs.mkdir(filePath, (error) => {
		if (error) {
			console.log(error);
		}
	});
	console.log(`${filePath} directory was created`);
};
