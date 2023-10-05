import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { UpdateCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

export const handler = async (event: any): Promise<any> => {
  try {
    const client = new DynamoDBClient({});
    const docClient = DynamoDBDocumentClient.from(client);

    const parsedDescription = parseFloat(event.description);

    const newDescription = !isNaN(parsedDescription)
      ? (parsedDescription + 1).toString()
      : "1";

    const command = new UpdateCommand({
      TableName: process.env.TABLE_NAME,
      Key: {
        taskId: event.taskId,
      },
      UpdateExpression: "set status = :status",
      ExpressionAttributeValues: {
        ":status": newDescription,
      },
      ReturnValues: "ALL_NEW",
    });

    const tableResponse = await docClient.send(command);

    return {
      ...tableResponse,
    };
  } catch (error) {
    console.log(error);
  }
};
