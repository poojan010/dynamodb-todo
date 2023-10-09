import { AWSEventsRule } from "serverless-schema";
import { STATE_MACHINE_ARN } from "src/step-functions";

export const MyScheduledRule: AWSEventsRule = {
  Type: "AWS::Events::Rule",
  Properties: {
    Name: "MyScheduledRule",
    ScheduleExpression: "cron(0 12 * * ? *)",
    State: "ENABLED",
    Targets: [
      {
        Arn: STATE_MACHINE_ARN,
        Id: "MyStateMachineId",
      },
    ],
  },
};
