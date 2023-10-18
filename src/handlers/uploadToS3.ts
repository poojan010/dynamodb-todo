// import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { APIGatewayEvent, APIGatewayProxyHandler } from "aws-lambda";
// import { ScanCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

import { response } from "@lib/api-gateway";
// import { readFile } from "node:fs/promises";

import { getFileStream } from "@lib/s3";
// import { extractCSVRecords } from "src/utils/csvHandler";
import { BucketNames, tempEntriesFile } from "src/resources/constants";

const csv = require("csv-parser");

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayEvent
): Promise<any> => {
  try {
    console.log(event);

    const s3Stream = await getFileStream(
      BucketNames.MyS3Bucket,
      tempEntriesFile
    );
    const results = await new Promise((resolve, reject) => {
      const objects = [];
      s3Stream
        .pipe(csv())
        .on("data", (data) => objects.push(data))
        .on("end", () => {
          resolve(objects);
        })
        .on("error", (error) => {
          reject(error);
        });
    });
    // const records = await extractCSVRecords(data);

    // const client = new DynamoDBClient({});
    // const docClient = DynamoDBDocumentClient.from(client);
    // const command = new ScanCommand({
    // eslint-disable-next-line max-len
    //   ProjectionExpression: "projectID, taskId, #d, description, fileLocation",
    //   ExpressionAttributeNames: { "#d": "date" },
    //   TableName: process.env.TABLE_NAME,
    // });

    // const tableResponse = await docClient.send(command);

    // const csvPath = await writeCSVRecords(tableResponse.Items);
    // const bufferData = await readFile(csvPath);

    // await uploadFile(BucketNames.MyS3Bucket, tempEntriesFile, bufferData);

    return response(200, {
      message: "Succcess",
      results,
    });
  } catch (error) {
    return response(400, {
      message: "Error occured",
      error,
    });
  }
};
