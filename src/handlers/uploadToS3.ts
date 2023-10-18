import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { APIGatewayEvent, APIGatewayProxyHandler } from "aws-lambda";
import { ScanCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

import { response } from "@lib/api-gateway";
import { readFile } from "node:fs/promises";

import { uploadFile } from "@lib/s3";
import { writeCSVRecords } from "src/utils/csvHandler";
import { BucketNames, tempEntriesFile } from "src/resources/constants";

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayEvent
): Promise<any> => {
  try {
    console.log(event);

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

    await uploadFile(BucketNames.MyS3Bucket, tempEntriesFile, bufferData);

    return response(200, {
      message: "Succcess",
      bufferData,
    });
  } catch (error) {
    return response(400, {
      message: "Error occured",
      error,
    });
  }
};
