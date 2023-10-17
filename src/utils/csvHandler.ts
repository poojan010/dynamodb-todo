import * as csvParser from "csv-parser";
import * as internal from "stream";

const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const TEMP_PATH = "/tmp";
const FILE_PATH = TEMP_PATH + "/file.csv";

const csvWriter = createCsvWriter({
  path: FILE_PATH,
  header: [
    { id: "taskId", title: "taskId" },
    { id: "projectID", title: "projectID" },
    { id: "date", title: "date" },
    { id: "description", title: "description" },
    { id: "fileLocation", title: "fileLocation" },
  ],
});

export const writeCSVRecords = async (items: any[]) => {
  await csvWriter.writeRecords(items);
  return FILE_PATH;
};

export const extractCSVRecords = async (data: internal.Readable) => {
  const records: { [key: string]: string }[] = [];
  return new Promise((resolve, reject) => {
    data
      .pipe(csvParser())
      .on("data", (row) => {
        records.push(row);
      })
      .on("end", () => {
        resolve(records);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};
