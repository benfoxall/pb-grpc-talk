// package: 
// file: demo.proto

import * as demo_pb from "./demo_pb";
import {grpc} from "@improbable-eng/grpc-web";

type DemoMouseMove = {
  readonly methodName: string;
  readonly service: typeof Demo;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof demo_pb.MoveEvent;
  readonly responseType: typeof demo_pb.MoveResponse;
};

type DemoBackground = {
  readonly methodName: string;
  readonly service: typeof Demo;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof demo_pb.Color;
  readonly responseType: typeof demo_pb.ColorResponse;
};

export class Demo {
  static readonly serviceName: string;
  static readonly MouseMove: DemoMouseMove;
  static readonly Background: DemoBackground;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class DemoClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  mouseMove(
    requestMessage: demo_pb.MoveEvent,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: demo_pb.MoveResponse|null) => void
  ): UnaryResponse;
  mouseMove(
    requestMessage: demo_pb.MoveEvent,
    callback: (error: ServiceError|null, responseMessage: demo_pb.MoveResponse|null) => void
  ): UnaryResponse;
  background(
    requestMessage: demo_pb.Color,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: demo_pb.ColorResponse|null) => void
  ): UnaryResponse;
  background(
    requestMessage: demo_pb.Color,
    callback: (error: ServiceError|null, responseMessage: demo_pb.ColorResponse|null) => void
  ): UnaryResponse;
}

