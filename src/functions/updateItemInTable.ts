import { AwsFunction } from "serverless-schema";

const updateItemInTable: AwsFunction = {
  handler: "src/handlers/updateItemInTable.handler",
  events: [
    {
      http: {
        method: "POST",
        path: "/updateItemInTable",
        cors: true,
      },
    },
  ],
  environment: {
    TABLE_NAME: "${self:resources.Outputs.MyDynamoDbTableName.Value}",
    TABLE_ARN: "${self:resources.Outputs.MyDynamoDbTableArn.Value}",
  },
};

export default updateItemInTable;
