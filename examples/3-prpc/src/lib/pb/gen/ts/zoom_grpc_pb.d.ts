// package: 
// file: zoom.proto

/* tslint:disable */

import * as grpc from "grpc";
import * as zoom_pb from "./zoom_pb";

interface IZoomService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    echo: IZoomService_Iecho;
    systemInfo: IZoomService_IsystemInfo;
    screenShot: IZoomService_IscreenShot;
    setColorScheme: IZoomService_IsetColorScheme;
}

interface IZoomService_Iecho extends grpc.MethodDefinition<zoom_pb.EchoMessage, zoom_pb.EchoMessage> {
    path: string; // "/.Zoom/echo"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<zoom_pb.EchoMessage>;
    requestDeserialize: grpc.deserialize<zoom_pb.EchoMessage>;
    responseSerialize: grpc.serialize<zoom_pb.EchoMessage>;
    responseDeserialize: grpc.deserialize<zoom_pb.EchoMessage>;
}
interface IZoomService_IsystemInfo extends grpc.MethodDefinition<zoom_pb.Noop, zoom_pb.SystemInfo> {
    path: string; // "/.Zoom/systemInfo"
    requestStream: boolean; // false
    responseStream: boolean; // true
    requestSerialize: grpc.serialize<zoom_pb.Noop>;
    requestDeserialize: grpc.deserialize<zoom_pb.Noop>;
    responseSerialize: grpc.serialize<zoom_pb.SystemInfo>;
    responseDeserialize: grpc.deserialize<zoom_pb.SystemInfo>;
}
interface IZoomService_IscreenShot extends grpc.MethodDefinition<zoom_pb.Noop, zoom_pb.Image> {
    path: string; // "/.Zoom/screenShot"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<zoom_pb.Noop>;
    requestDeserialize: grpc.deserialize<zoom_pb.Noop>;
    responseSerialize: grpc.serialize<zoom_pb.Image>;
    responseDeserialize: grpc.deserialize<zoom_pb.Image>;
}
interface IZoomService_IsetColorScheme extends grpc.MethodDefinition<zoom_pb.ColorSchemeRequest, zoom_pb.Noop> {
    path: string; // "/.Zoom/setColorScheme"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<zoom_pb.ColorSchemeRequest>;
    requestDeserialize: grpc.deserialize<zoom_pb.ColorSchemeRequest>;
    responseSerialize: grpc.serialize<zoom_pb.Noop>;
    responseDeserialize: grpc.deserialize<zoom_pb.Noop>;
}

export const ZoomService: IZoomService;

export interface IZoomServer {
    echo: grpc.handleUnaryCall<zoom_pb.EchoMessage, zoom_pb.EchoMessage>;
    systemInfo: grpc.handleServerStreamingCall<zoom_pb.Noop, zoom_pb.SystemInfo>;
    screenShot: grpc.handleUnaryCall<zoom_pb.Noop, zoom_pb.Image>;
    setColorScheme: grpc.handleUnaryCall<zoom_pb.ColorSchemeRequest, zoom_pb.Noop>;
}

export interface IZoomClient {
    echo(request: zoom_pb.EchoMessage, callback: (error: grpc.ServiceError | null, response: zoom_pb.EchoMessage) => void): grpc.ClientUnaryCall;
    echo(request: zoom_pb.EchoMessage, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: zoom_pb.EchoMessage) => void): grpc.ClientUnaryCall;
    echo(request: zoom_pb.EchoMessage, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: zoom_pb.EchoMessage) => void): grpc.ClientUnaryCall;
    systemInfo(request: zoom_pb.Noop, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<zoom_pb.SystemInfo>;
    systemInfo(request: zoom_pb.Noop, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<zoom_pb.SystemInfo>;
    screenShot(request: zoom_pb.Noop, callback: (error: grpc.ServiceError | null, response: zoom_pb.Image) => void): grpc.ClientUnaryCall;
    screenShot(request: zoom_pb.Noop, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: zoom_pb.Image) => void): grpc.ClientUnaryCall;
    screenShot(request: zoom_pb.Noop, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: zoom_pb.Image) => void): grpc.ClientUnaryCall;
    setColorScheme(request: zoom_pb.ColorSchemeRequest, callback: (error: grpc.ServiceError | null, response: zoom_pb.Noop) => void): grpc.ClientUnaryCall;
    setColorScheme(request: zoom_pb.ColorSchemeRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: zoom_pb.Noop) => void): grpc.ClientUnaryCall;
    setColorScheme(request: zoom_pb.ColorSchemeRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: zoom_pb.Noop) => void): grpc.ClientUnaryCall;
}

export class ZoomClient extends grpc.Client implements IZoomClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public echo(request: zoom_pb.EchoMessage, callback: (error: grpc.ServiceError | null, response: zoom_pb.EchoMessage) => void): grpc.ClientUnaryCall;
    public echo(request: zoom_pb.EchoMessage, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: zoom_pb.EchoMessage) => void): grpc.ClientUnaryCall;
    public echo(request: zoom_pb.EchoMessage, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: zoom_pb.EchoMessage) => void): grpc.ClientUnaryCall;
    public systemInfo(request: zoom_pb.Noop, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<zoom_pb.SystemInfo>;
    public systemInfo(request: zoom_pb.Noop, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<zoom_pb.SystemInfo>;
    public screenShot(request: zoom_pb.Noop, callback: (error: grpc.ServiceError | null, response: zoom_pb.Image) => void): grpc.ClientUnaryCall;
    public screenShot(request: zoom_pb.Noop, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: zoom_pb.Image) => void): grpc.ClientUnaryCall;
    public screenShot(request: zoom_pb.Noop, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: zoom_pb.Image) => void): grpc.ClientUnaryCall;
    public setColorScheme(request: zoom_pb.ColorSchemeRequest, callback: (error: grpc.ServiceError | null, response: zoom_pb.Noop) => void): grpc.ClientUnaryCall;
    public setColorScheme(request: zoom_pb.ColorSchemeRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: zoom_pb.Noop) => void): grpc.ClientUnaryCall;
    public setColorScheme(request: zoom_pb.ColorSchemeRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: zoom_pb.Noop) => void): grpc.ClientUnaryCall;
}
