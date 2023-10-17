import { AwsFunction } from "serverless-schema";
import { BucketNames, tempEntriesFile } from "src/resources/constants";

const sendItemsToQueue: AwsFunction = {
  handler: "src/handlers/sendItemsToQueue.handler",
  events: [
    {
      s3: {
        bucket: BucketNames.MyS3Bucket,
        event: "s3:ObjectCreated:*",
        rules: [{ prefix: tempEntriesFile }],
      },
    },
  ],
};

export default sendItemsToQueue;
