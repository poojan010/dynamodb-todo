import { AwsFunction } from "serverless-schema";
import { MyTopicArn } from "src/resources/SnsTopic";

const receiveOnmoEntries: AwsFunction = {
  handler: "src/handlers/receiveOnmoEntries.handler",
  events: [
    {
      sns: {
        arn: MyTopicArn,
        filterPolicy: {
          customer: ["onmo"],
        },
      },
    },
  ],
};

export default receiveOnmoEntries;
