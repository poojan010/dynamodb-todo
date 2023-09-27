import { AWSDynamoDBTable } from "serverless-schema";
import { DynamoDBTableNames } from "./constants";

export const MyDynamoDbTable: AWSDynamoDBTable = {
  Type: "AWS::DynamoDB::Table",
  Properties: {
    TableName: DynamoDBTableNames.MyDynamoDbTable,
    BillingMode: "PAY_PER_REQUEST",
    AttributeDefinitions: [
      {
        AttributeName: "projectID",
        AttributeType: "S",
      },
      {
        AttributeName: "taskId",
        AttributeType: "S",
      },
      {
        AttributeName: "date",
        AttributeType: "S",
      },
    ],
    KeySchema: [
      {
        AttributeName: "taskId",
        KeyType: "HASH",
      },
    ],
    GlobalSecondaryIndexes: [
      {
        IndexName: "TaskProject",
        Projection: {
          ProjectionType: "ALL",
        },
        KeySchema: [
          {
            AttributeName: "taskId",
            KeyType: "HASH",
          },
          {
            AttributeName: "projectID",
            KeyType: "RANGE",
          },
        ],
      },
      {
        IndexName: "ProjectDate",
        Projection: {
          ProjectionType: "ALL",
        },
        KeySchema: [
          {
            AttributeName: "projectID",
            KeyType: "HASH",
          },
          {
            AttributeName: "date",
            KeyType: "RANGE",
          },
        ],
      },
    ],
  },
};
