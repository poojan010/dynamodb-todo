import { AwsFunction } from "serverless-schema";

const getAllFromTable: AwsFunction = {
  handler: "src/handlers/getAllFromTable.handler",
  events: [
    {
      http: {
        method: "GET",
        path: "/getAllFromTable",
        cors: true,
      },
    },
  ],
  environment: {
    TABLE_NAME: "${self:resources.Outputs.MyDynamoDbTableName.Value}",
    TABLE_ARN: "${self:resources.Outputs.MyDynamoDbTableArn.Value}",
  },
};

export default getAllFromTable;
