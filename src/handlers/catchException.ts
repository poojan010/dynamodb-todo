import { APIGatewayEvent, APIGatewayProxyHandler } from "aws-lambda";

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayEvent
): Promise<any> => {
  console.error(
    `Error occurred in step function workflow: ${JSON.stringify(event)}`
  );

  return event;
};
