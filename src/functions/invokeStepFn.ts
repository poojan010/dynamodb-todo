import env from "@lib/env";
import { AwsFunction } from "serverless-schema";

const invokeStepFn: AwsFunction = {
  handler: "src/handlers/invokeStepFn.handler",
  events: [
    {
      http: {
        method: "GET",
        path: "/invokeStepFn",
        cors: true,
      },
    },
  ],
  environment: {
    // eslint-disable-next-line max-len
    STATE_MACHINE_ARN: `arn:aws:states:ap-south-1:${env.AWS_ACCOUNT_ID}:stateMachine:my-state-machine--${env.STAGE}`,
  },
};

export default invokeStepFn;
