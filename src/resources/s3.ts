import { AWSS3Bucket } from "serverless-schema";
import { BucketNames } from "./constants";

export const MyS3Bucket: AWSS3Bucket = {
  Type: "AWS::S3::Bucket",
  Properties: {
    BucketName: BucketNames.MyS3Bucket,
    CorsConfiguration: {
      CorsRules: [
        {
          AllowedMethods: ["GET", "PUT", "POST"],
          AllowedOrigins: ["*"],
        },
      ],
    },
  },
};
