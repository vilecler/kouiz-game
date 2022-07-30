import { Response } from "../models/response";

export class Responses{

  static generateSuccess(data: any): Response{
    return new Response(
      200,
      JSON.stringify(data)
    );
  }

}
