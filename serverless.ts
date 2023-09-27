import { Dynamodb, S3 } from "iam-floyd";
import { ServerlessFrameworkConfiguration } from "serverless-schema";

import MyResources from "src/resources";
import { functions } from "@functions/index";
import { DynamoDBTableNames } from "src/resources/constants";

const serverlessConfiguration: ServerlessFrameworkConfiguration = {
  service: "dynamodb-todo",
  useDotenv: true,
  custom: {
    esbuild: {
      bundle: true,
      minify: true,
      sourcemap: true,
    },
    stage: "${opt:stage, self:provider.stage}",
    stages: ["uat", "alpha", "prod"],
    prune: {
      automatic: true,
      number: 3,
    },
  },
  plugins: ["serverless-esbuild", "serverless-prune-plugin"],
  provider: {
    name: "aws",
    runtime: "nodejs16.x",
    region: "us-west-2",
    stage: '${opt:stage, "uat"}',
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      STAGE: "${self:provider.stage}",
    },
    iamRoleStatements: [
      new Dynamodb()
        .allow()
        .toConditionCheckItem()
        .toGetItem()
        .toPutItem()
        .toScan()
        .toQuery()
        .toUpdateItem()
        .toDeleteItem()
        .onTable(DynamoDBTableNames.MyDynamoDbTable)
        .onIndex(DynamoDBTableNames.MyDynamoDbTable, "TaskProject")
        .onIndex(DynamoDBTableNames.MyDynamoDbTable, "ProjectDate")
        .toJSON(),
      new S3()
        .allow()
        .toPutObject()
        .toGetObject()
        .toDeleteObject()
        .toListBucket()
        .on(
          ...[
            "${self:resources.Outputs.MyS3BucketArn.Value}",
            "${self:resources.Outputs.MyS3BucketResourcesArn.Value}",
          ]
        )
        .toJSON(),
    ],
  },
  functions,
  package: {
    individually: true,
  },
  resources: {
    Resources: MyResources,
    Outputs: {
      MyDynamoDbTableName: {
        Value: {
          Ref: "MyDynamoDbTable",
        },
      },
      MyDynamoDbTableArn: {
        Description: "ARN for dynamodb table",
        Value: {
          "Fn::GetAtt": ["MyDynamoDbTable", "Arn"],
        },
      },
      MyDynamoDbGSITaskProjectArn: {
        Description:
          "ARN for dynamodb table global secondary index - TaskProject ",
        Value: {
          "Fn::Join": [
            "",
            [
              { "Fn::GetAtt": ["MyDynamoDbTable", "Arn"] },
              "/index/TaskProject",
            ],
          ],
        },
      },
      MyDynamoDbGSIProjecDateArn: {
        Description:
          "ARN for dynamodb table global secondary index - ProjecDate ",
        Value: {
          "Fn::Join": [
            "",
            [
              { "Fn::GetAtt": ["MyDynamoDbTable", "Arn"] },
              "/index/ProjectDate",
            ],
          ],
        },
      },
      MyS3BucketName: {
        Value: {
          Ref: "MyS3Bucket",
        },
      },
      MyS3BucketArn: {
        Value: {
          "Fn::GetAtt": ["MyS3Bucket", "Arn"],
        },
      },
      MyS3BucketResourcesArn: {
        Value: {
          "Fn::Join": ["", [{ "Fn::GetAtt": ["MyS3Bucket", "Arn"] }, "/*"]],
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
