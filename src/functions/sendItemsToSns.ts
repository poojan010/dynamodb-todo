import { AwsFunction } from "serverless-schema";
import { BucketNames, tempEntriesFile } from "src/resources/constants";

const sendItemsToSns: AwsFunction = {
  handler: "src/handlers/sendItemsToSns.handler",
  events: [
    {
      s3: {
        bucket: BucketNames.MyS3Bucket,
        event: "s3:ObjectCreated:*",
        rules: [{ prefix: tempEntriesFile }],
        existing: true,
      },
    },
  ],
};

export default sendItemsToSns;
