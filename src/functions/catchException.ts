import { AwsFunction } from "serverless-schema";

const catchException: AwsFunction = {
  handler: "src/handlers/catchException.handler",
};

export default catchException;
