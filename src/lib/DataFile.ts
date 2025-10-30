import * as XLSX from "xlsx";

export class DataFile {
	private readonly _data: Object;
	private readonly _columns: string[];

	constructor(buffer: ArrayBuffer) {
		const workbook = XLSX.read(buffer);
		// TODO: show a warning if there are multiple sheets
		const firstSheetName = workbook.SheetNames[0];
		const sheet = workbook.Sheets[firstSheetName];
		this._data = XLSX.utils.sheet_to_json(sheet);
		// TODO: show an error if there are no data rows
		this._columns = Object.keys(this._data[0]);
	}

	get columns() {
		return this._columns;
	}
}