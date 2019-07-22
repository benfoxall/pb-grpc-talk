// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var calculator_pb = require('./calculator_pb.js');

function serialize_AddRequest(arg) {
  if (!(arg instanceof calculator_pb.AddRequest)) {
    throw new Error('Expected argument of type AddRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_AddRequest(buffer_arg) {
  return calculator_pb.AddRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_AddResult(arg) {
  if (!(arg instanceof calculator_pb.AddResult)) {
    throw new Error('Expected argument of type AddResult');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_AddResult(buffer_arg) {
  return calculator_pb.AddResult.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_GraphRequest(arg) {
  if (!(arg instanceof calculator_pb.GraphRequest)) {
    throw new Error('Expected argument of type GraphRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_GraphRequest(buffer_arg) {
  return calculator_pb.GraphRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_GraphResult(arg) {
  if (!(arg instanceof calculator_pb.GraphResult)) {
    throw new Error('Expected argument of type GraphResult');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_GraphResult(buffer_arg) {
  return calculator_pb.GraphResult.deserializeBinary(new Uint8Array(buffer_arg));
}


var CalculatorService = exports.CalculatorService = {
  add: {
    path: '/Calculator/Add',
    requestStream: false,
    responseStream: false,
    requestType: calculator_pb.AddRequest,
    responseType: calculator_pb.AddResult,
    requestSerialize: serialize_AddRequest,
    requestDeserialize: deserialize_AddRequest,
    responseSerialize: serialize_AddResult,
    responseDeserialize: deserialize_AddResult,
  },
  graph: {
    path: '/Calculator/Graph',
    requestStream: false,
    responseStream: false,
    requestType: calculator_pb.GraphRequest,
    responseType: calculator_pb.GraphResult,
    requestSerialize: serialize_GraphRequest,
    requestDeserialize: deserialize_GraphRequest,
    responseSerialize: serialize_GraphResult,
    responseDeserialize: deserialize_GraphResult,
  },
};

exports.CalculatorClient = grpc.makeGenericClientConstructor(CalculatorService);
