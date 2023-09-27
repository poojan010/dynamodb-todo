import { uploadFile } from "@lib/s3";
import { response } from "@lib/api-gateway";
import * as multipart from "aws-lambda-multipart-parser";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { APIGatewayEvent, APIGatewayProxyHandler } from "aws-lambda";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

import { BucketNames } from "src/resources/constants";

const genrateFileNameKey = () => {
  return "file_" + Date.now() + ".csv";
};

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayEvent
): Promise<any> => {
  try {
    const requestBody = multipart.parse(event, true);

    const fileNameKey = genrateFileNameKey();

    const filUploadData = await uploadFile(
      BucketNames.MyS3Bucket,
      fileNameKey,
      requestBody.file.content
    );

    const fileLocation = filUploadData.Location;

    const client = new DynamoDBClient({});
    const docClient = DynamoDBDocumentClient.from(client);
    const command = new PutCommand({
      TableName: process.env.TABLE_NAME,
      Item: {
        projectID: requestBody.projectID,
        taskId: requestBody.taskId,
        date: new Date().toISOString(),
        description: requestBody.description,
        fileLocation,
      },
    });

    const tableResponse = await docClient.send(command);
    return response(200, {
      message: "Succcess",
      tableResponse,
    });
  } catch (error) {
    return response(400, {
      message: "Error occured",
      error,
    });
  }
};
