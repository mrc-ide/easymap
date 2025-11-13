import * as XLSX from "xlsx";

export class DataFile {
    private readonly _data: object;
    private readonly _columns: string[] | undefined;
    private readonly _loadError: string | undefined;
    private readonly _loadWarning: string | undefined;

    constructor(buffer: ArrayBuffer) {
        try {
            const workbook = XLSX.read(buffer, { type: "buffer" });
            if (workbook.SheetNames.length > 1) {
                this._loadWarning = "This file has multiple sheets, using the first one";
            }
            const firstSheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[firstSheetName];
            this._data = XLSX.utils.sheet_to_json(sheet);

            if (this._data.length) {
                this._columns = Object.keys(this._data[0]);
            } else {
                this._loadError = "No data rows in file";
            }
        } catch (e) {
            this._loadError = e.message;
        }
    }

    get columns() {
        return this._columns;
    }

    get loadError() {
        return this._loadError;
    }

    get loadWarning() {
        return this._loadWarning;
    }
}
