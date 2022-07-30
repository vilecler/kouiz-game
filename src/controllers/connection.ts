export class Connection{


  constructor(
    public connectionId: string
  ) { }


  async subscribe() {

  }

  async unsubscribe() {

  }

  async send(data: any, api: ApiGatewayManagementApi){
    // Send a WebSocket message to client.
    return api.postToConnection({
      ConnectionId: this.connectionId,
      Data: data
    }).promise();
  }

}
