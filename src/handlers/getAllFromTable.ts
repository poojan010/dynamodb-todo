import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { APIGatewayEvent, APIGatewayProxyHandler } from "aws-lambda";
import { ScanCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

import { response } from "@lib/api-gateway";
import { BucketNames } from "src/resources/constants";
import { addPresignedUrlInItems } from "src/utils/dynamodbItems";

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

    const updatedTableItems = await addPresignedUrlInItems(
      tableResponse.Items,
      BucketNames.MyS3Bucket
    );

    return response(200, {
      message: "Succcess",
      items: updatedTableItems,
    });
  } catch (error) {
    return response(400, {
      message: "Error occured",
      error,
    });
  }
};
