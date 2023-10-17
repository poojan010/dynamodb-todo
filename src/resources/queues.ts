import env from "@lib/env";
import { AWSSQSQueue } from "serverless-schema";

import { MYQueueName } from "./constants";

// eslint-disable-next-line max-len
export const MyQueueArn = `arn:aws:sqs:ap-south-1:${env.AWS_ACCOUNT_ID}:${MYQueueName}`;

export const MyStandardQueue: AWSSQSQueue = {
  Type: "AWS::SQS::Queue",
  Properties: {
    QueueName: MYQueueName,
  },
};
