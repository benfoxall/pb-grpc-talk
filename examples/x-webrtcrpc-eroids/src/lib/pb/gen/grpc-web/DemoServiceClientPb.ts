/**
 * @fileoverview gRPC-Web generated client stub for 
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


import * as grpcWeb from 'grpc-web';

import {
  Color,
  ColorResponse,
  MoveEvent,
  MoveResponse} from './demo_pb';

export class DemoClient {
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

  methodInfoMouseMove = new grpcWeb.AbstractClientBase.MethodInfo(
    MoveResponse,
    (request: MoveEvent) => {
      return request.serializeBinary();
    },
    MoveResponse.deserializeBinary
  );

  mouseMove(
    request: MoveEvent,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: MoveResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/Demo/MouseMove',
      request,
      metadata || {},
      this.methodInfoMouseMove,
      callback);
  }

  methodInfoBackground = new grpcWeb.AbstractClientBase.MethodInfo(
    ColorResponse,
    (request: Color) => {
      return request.serializeBinary();
    },
    ColorResponse.deserializeBinary
  );

  background(
    request: Color,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: ColorResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/Demo/Background',
      request,
      metadata || {},
      this.methodInfoBackground,
      callback);
  }

}

