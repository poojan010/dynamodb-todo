import env from "@lib/env";

export const BucketNames = {
  deploymentBucket: "serverless-deployment-bucket-backend",
  MyS3Bucket: `my-graphics-s3-bucket-${env.STAGE}`,
};

export const DynamoDBTableNames = {
  MyDynamoDbTable: `my-dynamo-db-table-${env.STAGE}`,
};
