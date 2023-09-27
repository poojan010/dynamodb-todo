export const BucketNames = {
  MyS3Bucket: `my-graphics-s3-bucket${process.env.STAGE}`,
};

export const DynamoDBTableNames = {
  MyDynamoDbTable: `my-dynamo-db-table${process.env.STAGE}`,
};
