import env from "@lib/env";
import { AwsStateMachines } from "serverless-schema";

const stateMachineName = `my-state-machine-${env.STAGE}`;
// eslint-disable-next-line max-len
export const STATE_MACHINE_ARN = `arn:aws:states:ap-south-1:${env.AWS_ACCOUNT_ID}:stateMachine:my-state-machine-${env.STAGE}`;

export const MyStateMachine: AwsStateMachines = {
  MyStateMachine: {
    name: stateMachineName,
    definition: {
      StartAt: "WaitForToken",
      States: {
        WaitForToken: {
          Type: "Task",
          Next: "CreateCSVForDbEntries",
          Resource: "arn:aws:states:::lambda:invoke.waitForTaskToken",
          Parameters: {
            Payload: {
              "input.$": "$",
              "taskToken.$": "$$.Task.Token",
            },
            FunctionName: {
              "Fn::Sub":
                // eslint-disable-next-line max-len
                "arn:aws:lambda:${AWS::Region}:${AWS::AccountId}:function:${self:service}-${self:provider.stage}-waitForToken",
            },
          },
          Catch: [
            {
              ErrorEquals: ["States.ALL"],
              Next: "CatchExceptionFromWaitForTokenState",
              ResultPath: "$.error",
            },
          ],
        },
        CreateCSVForDbEntries: {
          Type: "Task",
          Resource: { "Fn::GetAtt": ["createCSVForDbEntries", "Arn"] },
          Next: "MapData",
          Catch: [
            {
              ErrorEquals: ["States.ALL"],
              Next: "CatchExceptionFromCreateCSV",
              ResultPath: "$.error",
            },
          ],
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
              "Bucket.$": "$.bucketName",
              "Key.$": "$.key",
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
                Resource: { "Fn::GetAtt": ["performOperation", "Arn"] },
                End: true,
              },
            },
          },
          Next: "Done",
          Catch: [
            {
              ErrorEquals: ["States.ALL"],
              Next: "CatchExceptionFromMapState",
              ResultPath: "$.error",
            },
          ],
        },
        Done: {
          Type: "Succeed",
        },
        CatchExceptionFromCreateCSV: {
          Type: "Task",
          InputPath: "$",
          Resource: {
            "Fn::GetAtt": ["catchException", "Arn"],
          },
          ResultPath: "$",
          Next: "Fail",
        },
        CatchExceptionFromMapState: {
          Type: "Task",
          InputPath: "$",
          Resource: {
            "Fn::GetAtt": ["catchException", "Arn"],
          },
          ResultPath: "$",
          Next: "Fail",
        },
        CatchExceptionFromWaitForTokenState: {
          Type: "Task",
          InputPath: "$",
          Resource: {
            "Fn::GetAtt": ["catchException", "Arn"],
          },
          ResultPath: "$",
          Next: "Fail",
        },
        Fail: {
          Type: "Fail",
        },
      },
    },
  },
};
