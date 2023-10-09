import { Resources } from "serverless-schema";

import { MyS3Bucket } from "./s3";
import { MyDynamoDbTable } from "./dynamodb";

const MyResources: Resources = {
  MyDynamoDbTable,
  MyS3Bucket,
};

export default MyResources;
