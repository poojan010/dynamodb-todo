import env from "@lib/env";
import { AWSSQSQueue } from "serverless-schema";

import { MYQueueName, MYFifoQueueName } from "./constants";

// eslint-disable-next-line max-len
export const MyQueueArn = `arn:aws:sqs:ap-south-1:${env.AWS_ACCOUNT_ID}:${MYQueueName}`;
// eslint-disable-next-line max-len
export const MyFifoQueueArn = `arn:aws:sqs:ap-south-1:${env.AWS_ACCOUNT_ID}:${MYFifoQueueName}`;

export const MyStandardQueue: AWSSQSQueue = {
  Type: "AWS::SQS::Queue",
  Properties: {
    QueueName: MYQueueName,
  },
};

export const MyFifoQueue: AWSSQSQueue = {
  Type: "AWS::SQS::Queue",
  Properties: {
    QueueName: MYFifoQueueName,
    FifoQueue: true,
  },
};
