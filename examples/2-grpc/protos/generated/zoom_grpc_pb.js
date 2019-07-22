// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var zoom_pb = require('./zoom_pb.js');

function serialize_ColorSchemeRequest(arg) {
  if (!(arg instanceof zoom_pb.ColorSchemeRequest)) {
    throw new Error('Expected argument of type ColorSchemeRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_ColorSchemeRequest(buffer_arg) {
  return zoom_pb.ColorSchemeRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_EchoMessage(arg) {
  if (!(arg instanceof zoom_pb.EchoMessage)) {
    throw new Error('Expected argument of type EchoMessage');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_EchoMessage(buffer_arg) {
  return zoom_pb.EchoMessage.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Image(arg) {
  if (!(arg instanceof zoom_pb.Image)) {
    throw new Error('Expected argument of type Image');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Image(buffer_arg) {
  return zoom_pb.Image.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Noop(arg) {
  if (!(arg instanceof zoom_pb.Noop)) {
    throw new Error('Expected argument of type Noop');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Noop(buffer_arg) {
  return zoom_pb.Noop.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_SystemInfo(arg) {
  if (!(arg instanceof zoom_pb.SystemInfo)) {
    throw new Error('Expected argument of type SystemInfo');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_SystemInfo(buffer_arg) {
  return zoom_pb.SystemInfo.deserializeBinary(new Uint8Array(buffer_arg));
}


var ZoomService = exports.ZoomService = {
  echo: {
    path: '/Zoom/echo',
    requestStream: false,
    responseStream: false,
    requestType: zoom_pb.EchoMessage,
    responseType: zoom_pb.EchoMessage,
    requestSerialize: serialize_EchoMessage,
    requestDeserialize: deserialize_EchoMessage,
    responseSerialize: serialize_EchoMessage,
    responseDeserialize: deserialize_EchoMessage,
  },
  systemInfo: {
    path: '/Zoom/systemInfo',
    requestStream: false,
    responseStream: true,
    requestType: zoom_pb.Noop,
    responseType: zoom_pb.SystemInfo,
    requestSerialize: serialize_Noop,
    requestDeserialize: deserialize_Noop,
    responseSerialize: serialize_SystemInfo,
    responseDeserialize: deserialize_SystemInfo,
  },
  screenShot: {
    path: '/Zoom/screenShot',
    requestStream: false,
    responseStream: false,
    requestType: zoom_pb.Noop,
    responseType: zoom_pb.Image,
    requestSerialize: serialize_Noop,
    requestDeserialize: deserialize_Noop,
    responseSerialize: serialize_Image,
    responseDeserialize: deserialize_Image,
  },
  setColorScheme: {
    path: '/Zoom/setColorScheme',
    requestStream: false,
    responseStream: false,
    requestType: zoom_pb.ColorSchemeRequest,
    responseType: zoom_pb.Noop,
    requestSerialize: serialize_ColorSchemeRequest,
    requestDeserialize: deserialize_ColorSchemeRequest,
    responseSerialize: serialize_Noop,
    responseDeserialize: deserialize_Noop,
  },
};

exports.ZoomClient = grpc.makeGenericClientConstructor(ZoomService);
