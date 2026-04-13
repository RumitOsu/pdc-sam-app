// PDC - AWS SAM workshop
// Author: Timur
//
// Handler that scans the DynamoDB table referenced by SAMPLE_TABLE and
// returns every item. Wired up to GET / by template.yaml.

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

const tableName = process.env.SAMPLE_TABLE;

export const getAllItemsHandler = async (event) => {
    if (event.httpMethod !== 'GET') {
        throw new Error(`getAllItems only accepts GET method, you tried: ${event.httpMethod}`);
    }
    console.info('received:', event);

    const params = { TableName: tableName };
    const data = await ddbDocClient.send(new ScanCommand(params));
    const items = data.Items;

    const response = {
        statusCode: 200,
        body: JSON.stringify(items)
    };

    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
};
