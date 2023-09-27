export const functions = {
  putDataInTable: {
    handler: "src/functions/putDataInTable.handler",
    events: [
      {
        http: {
          method: "POST",
          path: "/putDataInTable",
          cors: true,
        },
      },
    ],
    environment: {
      TABLE_NAME: "${self:resources.Outputs.MyDynamoDbTableName.Value}",
      TABLE_ARN: "${self:resources.Outputs.MyDynamoDbTableArn.Value}",
    },
  },
  getAllFromTable: {
    handler: "src/functions/getAllFromTable.handler",
    events: [
      {
        http: {
          method: "GET",
          path: "/getAllFromTable",
          cors: true,
        },
      },
    ],
    environment: {
      TABLE_NAME: "${self:resources.Outputs.MyDynamoDbTableName.Value}",
      TABLE_ARN: "${self:resources.Outputs.MyDynamoDbTableArn.Value}",
    },
  },
  getByProjectId: {
    handler: "src/functions/getByProjectId.handler",
    events: [
      {
        http: {
          method: "POST",
          path: "/getByProjectId",
          cors: true,
        },
      },
    ],
    environment: {
      TABLE_NAME: "${self:resources.Outputs.MyDynamoDbTableName.Value}",
      TABLE_ARN: "${self:resources.Outputs.MyDynamoDbTableArn.Value}",
    },
  },
  updateItemInTable: {
    handler: "src/functions/updateItemInTable.handler",
    events: [
      {
        http: {
          method: "POST",
          path: "/updateItemInTable",
          cors: true,
        },
      },
    ],
    environment: {
      TABLE_NAME: "${self:resources.Outputs.MyDynamoDbTableName.Value}",
      TABLE_ARN: "${self:resources.Outputs.MyDynamoDbTableArn.Value}",
    },
  },
  deleteItemFromTable: {
    handler: "src/functions/deleteItemFromTable.handler",
    events: [
      {
        http: {
          method: "POST",
          path: "/deleteItemFromTable",
          cors: true,
        },
      },
    ],
    environment: {
      TABLE_NAME: "${self:resources.Outputs.MyDynamoDbTableName.Value}",
      TABLE_ARN: "${self:resources.Outputs.MyDynamoDbTableArn.Value}",
    },
  },
  sortByDate: {
    handler: "src/functions/sortByDate.handler",
    events: [
      {
        http: {
          method: "POST",
          path: "/sortByDate",
          cors: true,
        },
      },
    ],
    environment: {
      TABLE_NAME: "${self:resources.Outputs.MyDynamoDbTableName.Value}",
      TABLE_ARN: "${self:resources.Outputs.MyDynamoDbTableArn.Value}",
    },
  },
};
