import { Resources } from "serverless-schema";

import { MyS3Bucket } from "./s3";
import { MyDynamoDbTable } from "./dynamodb";
import { MyScheduledRule } from "./scheduler";

const MyResources: Resources = {
  MyDynamoDbTable,
  MyS3Bucket,
  MyScheduledRule,
};

export default MyResources;
