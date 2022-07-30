import { APIGatewayProxyWebsocketEventV2 } from 'aws-lambda';
import { Db, Timestamp } from 'mongodb';

import { connectToDatabase } from "../services/db";

import { Connection } from "../controllers/connection";

import { Response } from "../models/response";

import { Responses } from "../utils/responses";

const handler = async (event: APIGatewayProxyWebsocketEventV2): Promise<Response> => {
    //const database: Db = await connectToDatabase();
    if(!(event.requestContext && event.requestContext.connectionId)){
      throw new Error("Error bad request: missing connectionId parameter")
    }

    if(!(event.requestContext && event.requestContext.routeKey)){
      throw new Error("Error bad request: missing routeKey parameter")
    }

    const connectionId = event.requestContext.connectionId;
    const routeKey = event.requestContext.routeKey;

    const connection = new Connection(connectionId);

    if(routeKey == '$connect'){
      await connection.subscribe();
      return Responses.generateSuccess({message: "Connection successful."});
    }

    if(routeKey == '$disconnect'){
      await connection.unsubscribe();
      return Responses.generateSuccess({message: "Disconnection successful."});
    }

    return Responses.generateSuccess({message: "Message received."});
};

export default handler;
