import { readFile } from "node:fs/promises";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { ScanCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

import { uploadFile } from "@lib/s3";
import { writeCSVRecords } from "src/utils/csvHandler";
import { BucketNames, tableEntriesFile } from "src/resources/constants";

export const handler = async (): Promise<any> => {
  try {
    const client = new DynamoDBClient({});
    const docClient = DynamoDBDocumentClient.from(client);
    const command = new ScanCommand({
      ProjectionExpression: "projectID, taskId, #d, description, fileLocation",
      ExpressionAttributeNames: { "#d": "date" },
      TableName: process.env.TABLE_NAME,
    });

    const tableResponse = await docClient.send(command);

    const csvPath = await writeCSVRecords(tableResponse.Items);
    const bufferData = await readFile(csvPath);

    await uploadFile(BucketNames.MyS3Bucket, tableEntriesFile, bufferData);
  } catch (error) {
    console.log(error);
  }
};
