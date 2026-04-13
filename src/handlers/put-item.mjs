// PDC - AWS SAM workshop
// Author: Timur

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

const tableName = process.env.SAMPLE_TABLE;

export const putItemHandler = async (event) => {
    if (event.httpMethod !== 'POST') {
        throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod}.`);
    }
    console.info('received:', event);

    const body = JSON.parse(event.body);
    const id = body.id;
    const name = body.name;

    const params = { TableName: tableName, Item: { id, name } };
    await ddbDocClient.send(new PutCommand(params));

    const response = {
        statusCode: 200,
        body: JSON.stringify(body)
    };
    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
};
