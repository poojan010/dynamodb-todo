import { response } from "@lib/api-gateway";
import { APIGatewayProxyHandler } from "aws-lambda";

const aws = require("aws-sdk");
const stepFunctions = new aws.StepFunctions();

export const handler: APIGatewayProxyHandler = async (): Promise<any> => {
  try {
    const params = {
      stateMachineArn: process.env.STATE_MACHINE_ARN,
      input: JSON.stringify({}),
    };

    const stepFnExecutionResponse = await stepFunctions
      .startExecution(params)
      .promise();

    return response(200, {
      message: "Succcess",
      ...stepFnExecutionResponse,
    });
  } catch (error) {
    return response(400, {
      message: "Error occured",
      error,
    });
  }
};
