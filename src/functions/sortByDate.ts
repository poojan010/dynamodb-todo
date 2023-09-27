import { AwsFunction } from "serverless-schema";

const sortByDate: AwsFunction = {
  handler: "src/handlers/sortByDate.handler",
  events: [
    {
      http: {
        method: "POST",
        path: "/sortByDate",
        cors: true,
      },
    },
  ],
  environment: {
    TABLE_NAME: "${self:resources.Outputs.MyDynamoDbTableName.Value}",
    TABLE_ARN: "${self:resources.Outputs.MyDynamoDbTableArn.Value}",
  },
};

export default sortByDate;
