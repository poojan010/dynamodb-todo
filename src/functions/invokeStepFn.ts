import { AwsFunction } from "serverless-schema";
import { STATE_MACHINE_ARN } from "src/step-functions";

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
    STATE_MACHINE_ARN: STATE_MACHINE_ARN,
  },
};

export default invokeStepFn;
