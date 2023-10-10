import { AwsFunction } from "serverless-schema";

const catchException: AwsFunction = {
  handler: "src/handlers/waitForToken.handler",
};

export default catchException;
