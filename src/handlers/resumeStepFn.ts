import { response } from "@lib/api-gateway";
import { APIGatewayProxyHandler, APIGatewayEvent } from "aws-lambda";

const aws = require("aws-sdk");
const stepFunctions = new aws.StepFunctions();

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayEvent
): Promise<any> => {
  try {
    const requestBody: any = event.body;
    const parsedBody = JSON.parse(requestBody);

    const stepFnResumeResponse = await stepFunctions
      .sendTaskSuccess({
        taskToken: parsedBody.taskToken,
        output: JSON.stringify({
          Payload: {},
        }),
      })
      .promise();

    return response(200, {
      message: "Succcess",
      ...stepFnResumeResponse,
    });
  } catch (error) {
    return response(400, {
      message: "Error occured",
      error,
    });
  }
};
