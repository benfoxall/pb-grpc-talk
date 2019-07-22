// package: 
// file: calculator.proto

/* tslint:disable */

import * as grpc from "grpc";
import * as calculator_pb from "./calculator_pb";

interface ICalculatorService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    add: ICalculatorService_IAdd;
    multiply: ICalculatorService_IMultiply;
    divide: ICalculatorService_IDivide;
}

interface ICalculatorService_IAdd extends grpc.MethodDefinition<calculator_pb.Request, calculator_pb.Response> {
    path: string; // "/.Calculator/Add"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<calculator_pb.Request>;
    requestDeserialize: grpc.deserialize<calculator_pb.Request>;
    responseSerialize: grpc.serialize<calculator_pb.Response>;
    responseDeserialize: grpc.deserialize<calculator_pb.Response>;
}
interface ICalculatorService_IMultiply extends grpc.MethodDefinition<calculator_pb.Request, calculator_pb.Response> {
    path: string; // "/.Calculator/Multiply"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<calculator_pb.Request>;
    requestDeserialize: grpc.deserialize<calculator_pb.Request>;
    responseSerialize: grpc.serialize<calculator_pb.Response>;
    responseDeserialize: grpc.deserialize<calculator_pb.Response>;
}
interface ICalculatorService_IDivide extends grpc.MethodDefinition<calculator_pb.Request, calculator_pb.Response> {
    path: string; // "/.Calculator/Divide"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<calculator_pb.Request>;
    requestDeserialize: grpc.deserialize<calculator_pb.Request>;
    responseSerialize: grpc.serialize<calculator_pb.Response>;
    responseDeserialize: grpc.deserialize<calculator_pb.Response>;
}

export const CalculatorService: ICalculatorService;

export interface ICalculatorServer {
    add: grpc.handleUnaryCall<calculator_pb.Request, calculator_pb.Response>;
    multiply: grpc.handleUnaryCall<calculator_pb.Request, calculator_pb.Response>;
    divide: grpc.handleUnaryCall<calculator_pb.Request, calculator_pb.Response>;
}

export interface ICalculatorClient {
    add(request: calculator_pb.Request, callback: (error: grpc.ServiceError | null, response: calculator_pb.Response) => void): grpc.ClientUnaryCall;
    add(request: calculator_pb.Request, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: calculator_pb.Response) => void): grpc.ClientUnaryCall;
    add(request: calculator_pb.Request, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: calculator_pb.Response) => void): grpc.ClientUnaryCall;
    multiply(request: calculator_pb.Request, callback: (error: grpc.ServiceError | null, response: calculator_pb.Response) => void): grpc.ClientUnaryCall;
    multiply(request: calculator_pb.Request, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: calculator_pb.Response) => void): grpc.ClientUnaryCall;
    multiply(request: calculator_pb.Request, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: calculator_pb.Response) => void): grpc.ClientUnaryCall;
    divide(request: calculator_pb.Request, callback: (error: grpc.ServiceError | null, response: calculator_pb.Response) => void): grpc.ClientUnaryCall;
    divide(request: calculator_pb.Request, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: calculator_pb.Response) => void): grpc.ClientUnaryCall;
    divide(request: calculator_pb.Request, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: calculator_pb.Response) => void): grpc.ClientUnaryCall;
}

export class CalculatorClient extends grpc.Client implements ICalculatorClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public add(request: calculator_pb.Request, callback: (error: grpc.ServiceError | null, response: calculator_pb.Response) => void): grpc.ClientUnaryCall;
    public add(request: calculator_pb.Request, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: calculator_pb.Response) => void): grpc.ClientUnaryCall;
    public add(request: calculator_pb.Request, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: calculator_pb.Response) => void): grpc.ClientUnaryCall;
    public multiply(request: calculator_pb.Request, callback: (error: grpc.ServiceError | null, response: calculator_pb.Response) => void): grpc.ClientUnaryCall;
    public multiply(request: calculator_pb.Request, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: calculator_pb.Response) => void): grpc.ClientUnaryCall;
    public multiply(request: calculator_pb.Request, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: calculator_pb.Response) => void): grpc.ClientUnaryCall;
    public divide(request: calculator_pb.Request, callback: (error: grpc.ServiceError | null, response: calculator_pb.Response) => void): grpc.ClientUnaryCall;
    public divide(request: calculator_pb.Request, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: calculator_pb.Response) => void): grpc.ClientUnaryCall;
    public divide(request: calculator_pb.Request, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: calculator_pb.Response) => void): grpc.ClientUnaryCall;
}
