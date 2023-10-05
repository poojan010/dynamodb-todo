import { AwsFunction } from "serverless-schema";

const performOperation: AwsFunction = {
  handler: "src/handlers/performOperation.handler",
  environment: {
    TABLE_NAME: "${self:resources.Outputs.MyDynamoDbTableName.Value}",
    TABLE_ARN: "${self:resources.Outputs.MyDynamoDbTableArn.Value}",
  },
};

export default performOperation;
