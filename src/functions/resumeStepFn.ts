import { AwsFunction } from "serverless-schema";

const resumeStepFn: AwsFunction = {
  handler: "src/handlers/resumeStepFn.handler",
  events: [
    {
      http: {
        method: "POST",
        path: "/resumeStepFn",
        cors: true,
      },
    },
  ],
};

export default resumeStepFn;
