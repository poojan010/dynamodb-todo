import { SQS } from "aws-sdk";

import { getFileStream } from "@lib/s3";
import { BucketNames, tempEntriesFile } from "src/resources/constants";

const csv = require("csv-parser");

export const handler = async (): Promise<any> => {
  try {
    const s3Stream = await getFileStream(
      BucketNames.MyS3Bucket,
      tempEntriesFile
    );

    const records = await new Promise((resolve, reject) => {
      const objects = [];
      s3Stream
        .pipe(csv())
        .on("data", (data) => objects.push(data))
        .on("end", () => resolve(objects))
        .on("error", (error) => {
          reject(error);
        });
    });

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
