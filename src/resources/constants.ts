import env from "@lib/env";

export const BucketNames = {
  deploymentBucket: "serverless-deployment-bucket-backend",
  MyS3Bucket: `my-graphics-s3-bucket-${env.STAGE}`,
};

export const DynamoDBTableNames = {
  MyDynamoDbTable: `my-dynamo-db-table-${env.STAGE}`,
};

export const tableEntriesFile = "table_entries.csv";

export const tempEntriesFile = "temp_entries.csv";

export const MYQueueName = `my-standard-queue-${env.STAGE}`;
export const MYFifoQueueName = `my-fifo-queue-${env.STAGE}.fifo`;

export const MyTopicName = `my-custom-topic-${env.STAGE}`;
