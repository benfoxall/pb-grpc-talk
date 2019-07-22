
import {Server, ServerCredentials, handleUnaryCall} from 'grpc';
import {ZoomService} from './protos/dist/ts/zoom_grpc_pb'
import { DarkModeRequest, Noop, BrightnessRequest } from './protos/dist/ts/zoom_pb'
import {toggle} from 'dark-mode';


const setDarkMode: handleUnaryCall<DarkModeRequest, Noop> = (call, callback) => {
  console.log("setDarkMode")

  toggle(call.request.getOn())

  callback(null, new Noop());
}

const setBrightness: handleUnaryCall<BrightnessRequest, Noop> = (call, callback) => {
  console.log("setBrightness: ", call.request.getValue())

  


  callback(null, new Noop());
}


var server = new Server();
server.addService(ZoomService, {setDarkMode, setBrightness});
server.bind('0.0.0.0:9090', ServerCredentials.createInsecure());
server.start();
