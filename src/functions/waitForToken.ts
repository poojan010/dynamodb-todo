import { AwsFunction } from "serverless-schema";

const waitForToken: AwsFunction = {
  handler: "src/handlers/waitForToken.handler",
};

export default waitForToken;
