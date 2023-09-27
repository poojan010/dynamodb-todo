import { response } from "@lib/api-gateway";
import { APIGatewayEvent, APIGatewayProxyHandler } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { QueryCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayEvent
): Promise<any> => {
  try {
    const requestBody: any = event.body;
    const parsedBody = JSON.parse(requestBody);

    const client = new DynamoDBClient({});
    const docClient = DynamoDBDocumentClient.from(client);
    const command = new QueryCommand({
      TableName: process.env.TABLE_NAME,
      IndexName: "ProjectDate",
      KeyConditionExpression: "projectID = :projId",
      ExpressionAttributeValues: {
        ":projId": parsedBody.projectID,
      },
      ScanIndexForward: true,
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
