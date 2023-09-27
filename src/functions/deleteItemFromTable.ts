import { AwsFunction } from "serverless-schema";

const deleteItemFromTable: AwsFunction = {
  handler: "src/handlers/deleteItemFromTable.handler",
  events: [
    {
      http: {
        method: "POST",
        path: "/deleteItemFromTable",
        cors: true,
      },
    },
  ],
  environment: {
    TABLE_NAME: "${self:resources.Outputs.MyDynamoDbTableName.Value}",
    TABLE_ARN: "${self:resources.Outputs.MyDynamoDbTableArn.Value}",
  },
};

export default deleteItemFromTable;
