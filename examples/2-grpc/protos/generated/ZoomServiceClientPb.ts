/**
 * @fileoverview gRPC-Web generated client stub for 
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


import * as grpcWeb from 'grpc-web';

import {
  ColorSchemeRequest,
  EchoMessage,
  Image,
  Noop,
  SystemInfo} from './zoom_pb';

export class ZoomClient {
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

  methodInfoecho = new grpcWeb.AbstractClientBase.MethodInfo(
    EchoMessage,
    (request: EchoMessage) => {
      return request.serializeBinary();
    },
    EchoMessage.deserializeBinary
  );

  echo(
    request: EchoMessage,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: EchoMessage) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/Zoom/echo',
      request,
      metadata || {},
      this.methodInfoecho,
      callback);
  }

  methodInfosystemInfo = new grpcWeb.AbstractClientBase.MethodInfo(
    SystemInfo,
    (request: Noop) => {
      return request.serializeBinary();
    },
    SystemInfo.deserializeBinary
  );

  systemInfo(
    request: Noop,
    metadata?: grpcWeb.Metadata) {
    return this.client_.serverStreaming(
      this.hostname_ +
        '/Zoom/systemInfo',
      request,
      metadata || {},
      this.methodInfosystemInfo);
  }

  methodInfoscreenShot = new grpcWeb.AbstractClientBase.MethodInfo(
    Image,
    (request: Noop) => {
      return request.serializeBinary();
    },
    Image.deserializeBinary
  );

  screenShot(
    request: Noop,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: Image) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/Zoom/screenShot',
      request,
      metadata || {},
      this.methodInfoscreenShot,
      callback);
  }

  methodInfosetColorScheme = new grpcWeb.AbstractClientBase.MethodInfo(
    Noop,
    (request: ColorSchemeRequest) => {
      return request.serializeBinary();
    },
    Noop.deserializeBinary
  );

  setColorScheme(
    request: ColorSchemeRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: Noop) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/Zoom/setColorScheme',
      request,
      metadata || {},
      this.methodInfosetColorScheme,
      callback);
  }

}

