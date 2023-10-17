import { SQS } from "aws-sdk";

import { getFileStream } from "@lib/s3";
import { extractCSVRecords } from "src/utils/csvHandler";
import { BucketNames, tempEntriesFile } from "src/resources/constants";

export const handler = async (): Promise<any> => {
  try {
    const data = await getFileStream(BucketNames.MyS3Bucket, tempEntriesFile);
    const records = await extractCSVRecords(data);

    const sqs = new SQS();

    //@ts-ignore
    for (const record of records) {
      await sqs
        .sendMessage({
          QueueUrl: process.env.QUEUE_URL,
          MessageBody: JSON.stringify(record),
        })
        .promise();
      console.log(`Message successfully sent to my standard queue`);
    }
  } catch (err) {
    console.error("Error in Sending Items to Queue", err);
  }
};
