import env from "@lib/env";
import { AwsStateMachines } from "serverless-schema";
import { BucketNames, tableEntriesFile } from "src/resources/constants";

const stateMachineName = `my-state-machine-${env.STAGE}`;
// eslint-disable-next-line max-len
export const STATE_MACHINE_ARN = `arn:aws:states:ap-south-1:${env.AWS_ACCOUNT_ID}:stateMachine:my-state-machine--${env.STAGE}`;

export const MyStateMachine: AwsStateMachines = {
  MyStateMachine: {
    name: stateMachineName,
    definition: {
      StartAt: "",
      States: {
        CreateCSVForDbEntries: {
          Type: "Task",
          Resource: { "Fn::GetAtt": ["createCSVForDbEntries", "Arn"] },
          Next: "MapData",
        },
        MapData: {
          Type: "Map",
          MaxConcurrency: 5,
          ItemReader: {
            Resource: "arn:aws:states:::s3:getObject",
            ReaderConfig: {
              InputType: "CSV",
              CSVHeaderLocation: "FIRST_ROW",
            },
            Parameters: {
              Bucket: BucketNames.MyS3Bucket,
              Key: tableEntriesFile,
            },
          },
          ItemProcessor: {
            ProcessorConfig: {
              Mode: "DISTRIBUTED",
              ExecutionType: "EXPRESS",
            },
            StartAt: "Operation",
            States: {
              Operation: {
                Type: "Task",
                Resource: { "Fn::GetAtt": ["createCSVForDbEntries", "Arn"] },
                End: true,
              },
            },
          },
          Next: "Done",
        },
        Done: {
          Type: "Succeed",
        },
        Fail: {
          Type: "Fail",
        },
      },
    },
  },
};
