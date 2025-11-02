import fs from "node:fs";

// Reads a test file with the given name from the testFiles folder and returns a File object.
// We need to implement arrayBuffer ourselves because this is not provided in jsdom.
export const getTestFile = (fileName: string): File => {
	const filePath = `${__dirname}/testFiles/${fileName}`;
	const buffer = fs.readFileSync(filePath);
	const arrayBuffer = new Uint8Array(buffer).buffer;
	const fileType = fileName.split(".").at(-1);
	const file = new File([arrayBuffer], fileName, {type: `.${fileType}`});
	file.arrayBuffer = async () => {
		return arrayBuffer;
	};
  return file;
}