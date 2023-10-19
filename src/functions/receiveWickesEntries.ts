import { AwsFunction } from "serverless-schema";
import { MyTopicArn } from "src/resources/SnsTopic";

const receiveWickesEntries: AwsFunction = {
  handler: "src/handlers/receiveWickesEntries.handler",
  events: [
    {
      sns: {
        arn: MyTopicArn,
        filterPolicy: {
          customer: "wickes",
        },
      },
    },
  ],
};

export default receiveWickesEntries;
