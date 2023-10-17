import { AwsFunction } from "serverless-schema";
import { MyQueueArn } from "src/resources/queues";

const receiveFromQueue: AwsFunction = {
  handler: "src/handlers/receiveFromQueue.handler",
  events: [
    {
      sqs: {
        arn: MyQueueArn,
        batchSize: 1,
      },
    },
  ],
};

export default receiveFromQueue;
