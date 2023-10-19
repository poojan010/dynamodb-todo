import { Resources } from "serverless-schema";

import { MyS3Bucket } from "./s3";
import { MyDynamoDbTable } from "./dynamodb";
import { MyStandardQueue } from "./queues";
import { MySnsTopic } from "./SnsTopic";

const MyResources: Resources = {
  MyDynamoDbTable,
  MyS3Bucket,
  MyStandardQueue,
  MySnsTopic,
};

export default MyResources;
