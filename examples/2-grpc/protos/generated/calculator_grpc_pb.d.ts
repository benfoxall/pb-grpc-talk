// package: 
// file: calculator.proto

/* tslint:disable */

import * as grpc from "grpc";
import * as calculator_pb from "./calculator_pb";

interface ICalculatorService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    add: ICalculatorService_IAdd;
    graph: ICalculatorService_IGraph;
}

interface ICalculatorService_IAdd extends grpc.MethodDefinition<calculator_pb.AddRequest, calculator_pb.AddResult> {
    path: string; // "/.Calculator/Add"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<calculator_pb.AddRequest>;
    requestDeserialize: grpc.deserialize<calculator_pb.AddRequest>;
    responseSerialize: grpc.serialize<calculator_pb.AddResult>;
    responseDeserialize: grpc.deserialize<calculator_pb.AddResult>;
}
interface ICalculatorService_IGraph extends grpc.MethodDefinition<calculator_pb.GraphRequest, calculator_pb.GraphResult> {
    path: string; // "/.Calculator/Graph"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<calculator_pb.GraphRequest>;
    requestDeserialize: grpc.deserialize<calculator_pb.GraphRequest>;
    responseSerialize: grpc.serialize<calculator_pb.GraphResult>;
    responseDeserialize: grpc.deserialize<calculator_pb.GraphResult>;
}

export const CalculatorService: ICalculatorService;

export interface ICalculatorServer {
    add: grpc.handleUnaryCall<calculator_pb.AddRequest, calculator_pb.AddResult>;
    graph: grpc.handleUnaryCall<calculator_pb.GraphRequest, calculator_pb.GraphResult>;
}

export interface ICalculatorClient {
    add(request: calculator_pb.AddRequest, callback: (error: grpc.ServiceError | null, response: calculator_pb.AddResult) => void): grpc.ClientUnaryCall;
    add(request: calculator_pb.AddRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: calculator_pb.AddResult) => void): grpc.ClientUnaryCall;
    add(request: calculator_pb.AddRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: calculator_pb.AddResult) => void): grpc.ClientUnaryCall;
    graph(request: calculator_pb.GraphRequest, callback: (error: grpc.ServiceError | null, response: calculator_pb.GraphResult) => void): grpc.ClientUnaryCall;
    graph(request: calculator_pb.GraphRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: calculator_pb.GraphResult) => void): grpc.ClientUnaryCall;
    graph(request: calculator_pb.GraphRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: calculator_pb.GraphResult) => void): grpc.ClientUnaryCall;
}

export class CalculatorClient extends grpc.Client implements ICalculatorClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public add(request: calculator_pb.AddRequest, callback: (error: grpc.ServiceError | null, response: calculator_pb.AddResult) => void): grpc.ClientUnaryCall;
    public add(request: calculator_pb.AddRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: calculator_pb.AddResult) => void): grpc.ClientUnaryCall;
    public add(request: calculator_pb.AddRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: calculator_pb.AddResult) => void): grpc.ClientUnaryCall;
    public graph(request: calculator_pb.GraphRequest, callback: (error: grpc.ServiceError | null, response: calculator_pb.GraphResult) => void): grpc.ClientUnaryCall;
    public graph(request: calculator_pb.GraphRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: calculator_pb.GraphResult) => void): grpc.ClientUnaryCall;
    public graph(request: calculator_pb.GraphRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: calculator_pb.GraphResult) => void): grpc.ClientUnaryCall;
}
