import { APIGatewayEvent, APIGatewayProxyHandler } from "aws-lambda";

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayEvent
): Promise<any> => {
  console.log("Recived data from Sns wickes topic", event);

  return event;
};
