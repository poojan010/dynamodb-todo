import { AwsFunction } from "serverless-schema";

const getByProjectId: AwsFunction = {
  handler: "src/handlers/getByTaskId.handler",
  events: [
    {
      http: {
        method: "POST",
        path: "/getByTaskId",
        cors: true,
      },
    },
  ],
  environment: {
    TABLE_NAME: "${self:resources.Outputs.MyDynamoDbTableName.Value}",
    TABLE_ARN: "${self:resources.Outputs.MyDynamoDbTableArn.Value}",
  },
};

export default getByProjectId;
