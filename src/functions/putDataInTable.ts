import { AwsFunction } from "serverless-schema";

const putDataInTable: AwsFunction = {
  handler: "src/handlers/putDataInTable.handler",
  events: [
    {
      http: {
        method: "POST",
        path: "/putDataInTable",
        cors: true,
      },
    },
  ],
  environment: {
    TABLE_NAME: "${self:resources.Outputs.MyDynamoDbTableName.Value}",
    TABLE_ARN: "${self:resources.Outputs.MyDynamoDbTableArn.Value}",
  },
};

export default putDataInTable;
