// package: 
// file: demo.proto

var demo_pb = require("./demo_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var Demo = (function () {
  function Demo() {}
  Demo.serviceName = "Demo";
  return Demo;
}());

Demo.MouseMove = {
  methodName: "MouseMove",
  service: Demo,
  requestStream: false,
  responseStream: false,
  requestType: demo_pb.MoveEvent,
  responseType: demo_pb.MoveResponse
};

Demo.Background = {
  methodName: "Background",
  service: Demo,
  requestStream: false,
  responseStream: false,
  requestType: demo_pb.Color,
  responseType: demo_pb.ColorResponse
};

exports.Demo = Demo;

function DemoClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

DemoClient.prototype.mouseMove = function mouseMove(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Demo.MouseMove, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

DemoClient.prototype.background = function background(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Demo.Background, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.DemoClient = DemoClient;

