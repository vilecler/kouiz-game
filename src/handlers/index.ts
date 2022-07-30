import { APIGatewayProxyWebsocketEventV2 } from 'aws-lambda';
import { ApiGatewayManagementApi } from 'aws-sdk'

import { connectToDatabase } from "../services/db";
import { AppSettings } from '../config/constants';

import { Connection } from "../controllers/connection";

import { Response } from "../models/response";
import { Responses } from "../utils/responses";

const handler = async (event: APIGatewayProxyWebsocketEventV2): Promise<any> => {
    //const database: Db = await connectToDatabase();
    if(!(event.requestContext && event.requestContext.connectionId)){
      throw new Error("Error bad request: missing connectionId parameter")
    }

    if(!(event.requestContext && event.requestContext.routeKey)){
      throw new Error("Error bad request: missing routeKey parameter")
    }

    // Configure variables
    const connectionId = event.requestContext.connectionId;
    const routeKey = event.requestContext.routeKey;

    const endpoint = AppSettings.ENDPOINT_URL.substring(6); //Remove "wss://"
    const apigwManagementApi = new ApiGatewayManagementApi({
      apiVersion: '2018-11-29',
      endpoint: endpoint
    });

    // Create a connection object
    const connection = new Connection(connectionId);

    if(routeKey == '$connect'){
      await connection.subscribe();
      return Responses.generateSuccess({message: "Connection successful."});
    }

    if(routeKey == '$disconnect'){
      await connection.unsubscribe();
      return Responses.generateSuccess({message: "Disconnection successful."});
    }


    await connection.send({
      action: 'test',
      data: 'hello'
    }, apigwManagementApi);

    return Responses.generateSuccess({message: "No function found."});
};

export default handler;
