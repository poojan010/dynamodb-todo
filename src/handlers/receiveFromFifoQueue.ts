import { SQS } from "aws-sdk";

const sqs = new SQS();

export const handler: any = async (messages: any[]): Promise<any> => {
  console.log("Recived data from fifo queue", messages);

  if (messages.length === 1) {
    await sqs
      .deleteMessage({
        QueueUrl: process.env.FIFO_QUEUE_URL,
        ReceiptHandle: messages[0].receiptHandle,
      })
      .promise()
      .then((response) => {
        console.log("Fifo Queue message deleted successfully", response);
      })
      .catch((error) => {
        console.log("Fifo Queue message deleting failed", error);
      });
  } else if (messages.length > 1) {
    await sqs
      .deleteMessageBatch({
        QueueUrl: process.env.FIFO_QUEUE_URL,
        Entries: messages.map((message) => ({
          Id: message.messageId,
          ReceiptHandle: message.receiptHandle,
        })),
      })
      .promise()
      .then((response) => {
        console.log("Fifo Queue batch messages deleted successfully", response);
      })
      .catch((error) => {
        console.log("Fifo Queue batch messages deleting failed", error);
      });
  } else {
    console.log("No messages found", messages);
  }
};
