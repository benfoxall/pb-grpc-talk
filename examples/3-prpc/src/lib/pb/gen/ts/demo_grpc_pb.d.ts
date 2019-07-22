// package: 
// file: demo.proto

/* tslint:disable */

import * as grpc from "grpc";
import * as demo_pb from "./demo_pb";

interface IDemoService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    mouseMove: IDemoService_IMouseMove;
    background: IDemoService_IBackground;
}

interface IDemoService_IMouseMove extends grpc.MethodDefinition<demo_pb.MoveEvent, demo_pb.MoveResponse> {
    path: string; // "/.Demo/MouseMove"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<demo_pb.MoveEvent>;
    requestDeserialize: grpc.deserialize<demo_pb.MoveEvent>;
    responseSerialize: grpc.serialize<demo_pb.MoveResponse>;
    responseDeserialize: grpc.deserialize<demo_pb.MoveResponse>;
}
interface IDemoService_IBackground extends grpc.MethodDefinition<demo_pb.Color, demo_pb.ColorResponse> {
    path: string; // "/.Demo/Background"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<demo_pb.Color>;
    requestDeserialize: grpc.deserialize<demo_pb.Color>;
    responseSerialize: grpc.serialize<demo_pb.ColorResponse>;
    responseDeserialize: grpc.deserialize<demo_pb.ColorResponse>;
}

export const DemoService: IDemoService;

export interface IDemoServer {
    mouseMove: grpc.handleUnaryCall<demo_pb.MoveEvent, demo_pb.MoveResponse>;
    background: grpc.handleUnaryCall<demo_pb.Color, demo_pb.ColorResponse>;
}

export interface IDemoClient {
    mouseMove(request: demo_pb.MoveEvent, callback: (error: grpc.ServiceError | null, response: demo_pb.MoveResponse) => void): grpc.ClientUnaryCall;
    mouseMove(request: demo_pb.MoveEvent, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: demo_pb.MoveResponse) => void): grpc.ClientUnaryCall;
    mouseMove(request: demo_pb.MoveEvent, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: demo_pb.MoveResponse) => void): grpc.ClientUnaryCall;
    background(request: demo_pb.Color, callback: (error: grpc.ServiceError | null, response: demo_pb.ColorResponse) => void): grpc.ClientUnaryCall;
    background(request: demo_pb.Color, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: demo_pb.ColorResponse) => void): grpc.ClientUnaryCall;
    background(request: demo_pb.Color, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: demo_pb.ColorResponse) => void): grpc.ClientUnaryCall;
}

export class DemoClient extends grpc.Client implements IDemoClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public mouseMove(request: demo_pb.MoveEvent, callback: (error: grpc.ServiceError | null, response: demo_pb.MoveResponse) => void): grpc.ClientUnaryCall;
    public mouseMove(request: demo_pb.MoveEvent, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: demo_pb.MoveResponse) => void): grpc.ClientUnaryCall;
    public mouseMove(request: demo_pb.MoveEvent, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: demo_pb.MoveResponse) => void): grpc.ClientUnaryCall;
    public background(request: demo_pb.Color, callback: (error: grpc.ServiceError | null, response: demo_pb.ColorResponse) => void): grpc.ClientUnaryCall;
    public background(request: demo_pb.Color, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: demo_pb.ColorResponse) => void): grpc.ClientUnaryCall;
    public background(request: demo_pb.Color, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: demo_pb.ColorResponse) => void): grpc.ClientUnaryCall;
}
