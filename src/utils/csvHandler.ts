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
