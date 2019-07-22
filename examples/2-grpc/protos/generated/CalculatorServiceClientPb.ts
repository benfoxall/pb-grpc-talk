/**
 * @fileoverview gRPC-Web generated client stub for 
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


import * as grpcWeb from 'grpc-web';

import {
  AddRequest,
  AddResult,
  GraphRequest,
  GraphResult} from './calculator_pb';

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
    AddResult,
    (request: AddRequest) => {
      return request.serializeBinary();
    },
    AddResult.deserializeBinary
  );

  add(
    request: AddRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: AddResult) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/Calculator/Add',
      request,
      metadata || {},
      this.methodInfoAdd,
      callback);
  }

  methodInfoGraph = new grpcWeb.AbstractClientBase.MethodInfo(
    GraphResult,
    (request: GraphRequest) => {
      return request.serializeBinary();
    },
    GraphResult.deserializeBinary
  );

  graph(
    request: GraphRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: GraphResult) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/Calculator/Graph',
      request,
      metadata || {},
      this.methodInfoGraph,
      callback);
  }

}

