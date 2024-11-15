import express, {Request} from 'express';
export enum ResponseStatus {
  Success = 200,
  Created = 201,
  NoContent = 204,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  Conflict = 409,
  InternalServerError = 500,
  NotImplemented = 501,
  BadGateway = 502,
  ServiceUnavailable = 503,
  GatewayTimeout = 504
}

export enum Categories {
  "urgent" = 9,
  "important" = 6,
  "nicetohave"= 3
}
export interface CustomRequest extends Request { 
    userId?: string;
}


