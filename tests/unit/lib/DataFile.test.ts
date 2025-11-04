import { describe, expect, test } from "vitest";
import { getArrayBufferForTestFile } from "../utils";
import { DataFile } from "$lib/DataFile";

describe("DataFile", () => {
    const getDataFileForTestFile = (fileName: string) => {
        const arrayBuffer = getArrayBufferForTestFile(fileName);
        return new DataFile(arrayBuffer);
    };

    test("reads valid data file and sets columns property", () => {
        const expectedColumns = ["region", "value"];
        expect(getDataFileForTestFile("example_data.csv").columns).toStrictEqual(expectedColumns);
        expect(getDataFileForTestFile("example_data.xls").columns).toStrictEqual(expectedColumns);
        expect(getDataFileForTestFile("example_data.xlsx").columns).toStrictEqual(expectedColumns);
    });

    test("sets loadWarning when file has multiple sheets", () => {
        expect(getDataFileForTestFile("multiple_sheets_data.xlsx").loadWarning).toBe("This file has multiple sheets");
    });

    test("sets loadError when file has no data rows", () => {
        expect(getDataFileForTestFile("no_example_data.csv").loadError).toBe("No data rows in file");
    });

    test("sets loadError when file is wrong type", () => {
        expect(getDataFileForTestFile("not_a_data_file.png").loadError).toBe("PNG Image File is not a spreadsheet");
    });
});
