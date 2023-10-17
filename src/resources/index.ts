import { Resources } from "serverless-schema";

import { MyS3Bucket } from "./s3";
import { MyDynamoDbTable } from "./dynamodb";
import { MyStandardQueue } from "./queues";

const MyResources: Resources = {
  MyDynamoDbTable,
  MyS3Bucket,
  MyStandardQueue,
};

export default MyResources;
