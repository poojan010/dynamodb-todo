import env from "@lib/env";
import { AWSSNSTopic } from "serverless-schema";

import { MyTopicName } from "./constants";

// eslint-disable-next-line max-len
export const MyTopicArn = `arn:aws:sqs:ap-south-1:${env.AWS_ACCOUNT_ID}:${MyTopicName}`;

export const MySnsTopic: AWSSNSTopic = {
  Type: "AWS::SNS::Topic",
  Properties: {
    TopicName: MyTopicName,
  },
};
