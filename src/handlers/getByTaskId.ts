import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { APIGatewayEvent, APIGatewayProxyHandler } from "aws-lambda";
import { QueryCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

import { response } from "@lib/api-gateway";
import { BucketNames } from "src/resources/constants";
import { addPresignedUrlInItems } from "src/utils/dynamodbItems";

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayEvent
): Promise<any> => {
  try {
    const requestBody: any = event.body;
    const parsedBody = JSON.parse(requestBody);

    const hasProjectId = "projectID" in parsedBody;

    const client = new DynamoDBClient({});
    const docClient = DynamoDBDocumentClient.from(client);

    const commandWithoutProjectId = new QueryCommand({
      TableName: process.env.TABLE_NAME,
      KeyConditionExpression: "taskId = :tId",
      ExpressionAttributeValues: {
        ":tId": parsedBody.taskId,
      },
    });

    const commandWithProjectId = new QueryCommand({
      IndexName: "TaskProject",
      TableName: process.env.TABLE_NAME,
      KeyConditionExpression: "taskId = :tId AND projectID = :projId",
      ExpressionAttributeValues: {
        ":tId": parsedBody.taskId,
        ":projId": parsedBody.projectID,
      },
    });

    const command = hasProjectId
      ? commandWithProjectId
      : commandWithoutProjectId;

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
