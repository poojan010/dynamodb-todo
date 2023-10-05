import { AwsFunction } from "serverless-schema";

const createCSVForDbEntries: AwsFunction = {
  handler: "src/handlers/createCSVForDbEntries.handler",
  environment: {
    TABLE_NAME: "${self:resources.Outputs.MyDynamoDbTableName.Value}",
    TABLE_ARN: "${self:resources.Outputs.MyDynamoDbTableArn.Value}",
  },
};

export default createCSVForDbEntries;
