import fs from "node:fs";

export const waitForOnMount = async (waitFor = 200) => {
    // Unfortunately, onMount is not called synchronously with testing-library's render
    // so we need to give it a little time to happen
    await new Promise((resolve) => setTimeout(resolve, waitFor));
};

export const getArrayBufferForTestFile = (fileName: string) => {
	const filePath = `${__dirname}/../testFiles/${fileName}`;
	const buffer = fs.readFileSync(filePath);
	return new Uint8Array(buffer).buffer;
}

// Reads a test file with the given name from the testFiles folder and returns a File object.
// We need to implement arrayBuffer ourselves because this is not provided in jsdom.
export const getTestFile = (fileName: string): File => {
	const arrayBuffer = getArrayBufferForTestFile(fileName);
	const fileType = fileName.split(".").at(-1);
	const file = new File([arrayBuffer], fileName, {type: `.${fileType}`});
	file.arrayBuffer = async () => {
		return arrayBuffer;
	};
	return file;
}
