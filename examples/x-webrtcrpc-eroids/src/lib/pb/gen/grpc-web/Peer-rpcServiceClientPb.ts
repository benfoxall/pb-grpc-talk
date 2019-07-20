/**
 * @fileoverview gRPC-Web generated client stub for 
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


import * as grpcWeb from 'grpc-web';

import {
  MathsRequest,
  MathsResponse,
  RPCWrapper} from './peer-rpc_pb';

export class DemoServiceClient {
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
    MathsResponse,
    (request: MathsRequest) => {
      return request.serializeBinary();
    },
    MathsResponse.deserializeBinary
  );

  add(
    request: MathsRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: MathsResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/DemoService/Add',
      request,
      metadata || {},
      this.methodInfoAdd,
      callback);
  }

  methodInfoOtherThing = new grpcWeb.AbstractClientBase.MethodInfo(
    RPCWrapper,
    (request: RPCWrapper) => {
      return request.serializeBinary();
    },
    RPCWrapper.deserializeBinary
  );

  otherThing(
    request: RPCWrapper,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: RPCWrapper) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/DemoService/OtherThing',
      request,
      metadata || {},
      this.methodInfoOtherThing,
      callback);
  }

}

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
    MathsResponse,
    (request: MathsRequest) => {
      return request.serializeBinary();
    },
    MathsResponse.deserializeBinary
  );

  add(
    request: MathsRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: MathsResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/Calculator/Add',
      request,
      metadata || {},
      this.methodInfoAdd,
      callback);
  }

  methodInfoMultiply = new grpcWeb.AbstractClientBase.MethodInfo(
    MathsResponse,
    (request: MathsRequest) => {
      return request.serializeBinary();
    },
    MathsResponse.deserializeBinary
  );

  multiply(
    request: MathsRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: MathsResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/Calculator/Multiply',
      request,
      metadata || {},
      this.methodInfoMultiply,
      callback);
  }

  methodInfoDivide = new grpcWeb.AbstractClientBase.MethodInfo(
    MathsResponse,
    (request: MathsRequest) => {
      return request.serializeBinary();
    },
    MathsResponse.deserializeBinary
  );

  divide(
    request: MathsRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: MathsResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/Calculator/Divide',
      request,
      metadata || {},
      this.methodInfoDivide,
      callback);
  }

}

