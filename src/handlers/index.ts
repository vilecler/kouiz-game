import { APIGatewayProxyResult, APIGatewayProxyEventV2WithRequestContext } from 'aws-lambda';
import { Db, Timestamp } from 'mongodb';

import { connectToDatabase } from "../services/db";
import { RequestContext } from "../models/requestcontext";

const handler = async (event: APIGatewayProxyEventV2WithRequestContext<RequestContext>): Promise<APIGatewayProxyResult> => {
    const database: Db = await connectToDatabase();

    return {
      statusCode: 200,
      body: JSON.stringify({
          message: 'Test'
      })
    };
};

export default handler;
