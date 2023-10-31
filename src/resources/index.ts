import { Resources } from "serverless-schema";

import { MyS3Bucket } from "./s3";
import { MyDynamoDbTable } from "./dynamodb";
import { MyStandardQueue, MyFifoQueue } from "./queues";
import { MySnsTopic } from "./SnsTopic";

const MyResources: Resources = {
  MyDynamoDbTable,
  MyS3Bucket,
  MyStandardQueue,
  MyFifoQueue,
  MySnsTopic,
};

export default MyResources;
