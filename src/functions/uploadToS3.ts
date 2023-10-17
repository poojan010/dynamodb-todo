import { AwsFunction } from "serverless-schema";

const uploadToS3: AwsFunction = {
  handler: "src/handlers/uploadToS3.handler",
  events: [
    {
      http: {
        method: "GET",
        path: "/uploadToS3",
        cors: true,
      },
    },
  ],
  environment: {
    TABLE_NAME: "${self:resources.Outputs.MyDynamoDbTableName.Value}",
    TABLE_ARN: "${self:resources.Outputs.MyDynamoDbTableArn.Value}",
  },
};

export default uploadToS3;
