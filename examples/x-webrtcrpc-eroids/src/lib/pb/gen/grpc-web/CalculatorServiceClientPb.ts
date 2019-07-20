/**
 * @fileoverview gRPC-Web generated client stub for 
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


import * as grpcWeb from 'grpc-web';

import {
  Request,
  Response} from './calculator_pb';

export class CalculatorClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: string; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: string; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodInfoAdd = new grpcWeb.AbstractClientBase.MethodInfo(
    Response,
    (request: Request) => {
      return request.serializeBinary();
    },
    Response.deserializeBinary
  );

  add(
    request: Request,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: Response) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/Calculator/Add',
      request,
      metadata || {},
      this.methodInfoAdd,
      callback);
  }

  methodInfoMultiply = new grpcWeb.AbstractClientBase.MethodInfo(
    Response,
    (request: Request) => {
      return request.serializeBinary();
    },
    Response.deserializeBinary
  );

  multiply(
    request: Request,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: Response) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/Calculator/Multiply',
      request,
      metadata || {},
      this.methodInfoMultiply,
      callback);
  }

  methodInfoDivide = new grpcWeb.AbstractClientBase.MethodInfo(
    Response,
    (request: Request) => {
      return request.serializeBinary();
    },
    Response.deserializeBinary
  );

  divide(
    request: Request,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: Response) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/Calculator/Divide',
      request,
      metadata || {},
      this.methodInfoDivide,
      callback);
  }

}

