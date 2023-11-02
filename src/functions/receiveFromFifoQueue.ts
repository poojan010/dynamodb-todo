import { AwsFunction } from "serverless-schema";
import { MyFifoQueueArn } from "src/resources/queues";

const receiveFromFifoQueue: AwsFunction = {
  handler: "src/handlers/receiveFromFifoQueue.handler",
  events: [
    {
      sqs: {
        arn: MyFifoQueueArn,
        batchSize: 1,
      },
    },
  ],
  environment: {
    FIFO_QUEUE_URL: "${self:resources.Outputs.FifoQueueURL.Value}",
  },
};

export default receiveFromFifoQueue;
