
import {Server, ServerCredentials, handleUnaryCall} from 'grpc';
import {ZoomService, IZoomServer} from './protos/dist/ts/zoom_grpc_pb'
import { Noop } from './protos/dist/ts/zoom_pb'
import {toggle} from 'dark-mode';

const zoomHandlers: IZoomServer = {

  setDarkMode:({request}, callback) => {
    console.log("setDarkMode")
  
    toggle(request.getOn())
  
    callback(null, new Noop());
  },

  setBrightness:({request}, callback) => {
    console.log("setBrightness: ", request.getValue())
  
    callback(null, new Noop());
  }
}

var server = new Server();
server.addService(ZoomService, zoomHandlers);
server.bind('0.0.0.0:9090', ServerCredentials.createInsecure());
server.start();
