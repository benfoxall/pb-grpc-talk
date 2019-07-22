
import { toggle } from 'dark-mode';
import { Server, ServerCredentials } from 'grpc';
import { ZoomService, IZoomServer } from './protos/dist/ts/zoom_grpc_pb'
import { Noop, ColorSchemeRequest, SystemInfo, ScreenShot } from './protos/dist/ts/zoom_pb'
import { currentLoad, battery } from 'systeminformation';
import * as screenshot from 'screenshot-desktop';

const sysInfo = new SystemInfo();
const image = new ScreenShot();

// console.log(screenshot);
// screenshot().then(d => {
//   console.log("GOT SCREENSHOT")
// })

setInterval(() => {
  currentLoad((d) => {
    sysInfo.setCpuloadsList(d.cpus.map(c => c.load))
  })

  battery((d) => {
    sysInfo.setBattery(d.percent)
  })
}, 1000)

const zoomHandlers: IZoomServer = {

  // Unary Request
  setColorScheme:({request}, callback) => {

    toggle(request.getScheme() === ColorSchemeRequest.Scheme.DARK)

    callback(null, new Noop())
  },

  // Streaming Response
  getSystemInfo:(stream) => {

    stream.write(sysInfo)

    const interval = setInterval(() => {
      if(!stream.writable) {
        console.log("CLEAR")
        return clearInterval(interval);
      }


      stream.write(sysInfo)
    }, 1000)


    // stream.on("cancelled", () => {
    //   clearInterval(interval)
    // })
  },

  screenShot: (call, callback) => {

    screenshot().then((d: Buffer) => {
      console.log("GOT SCREENSHOT")
      image.setFile(new Uint8Array(d))

      callback(null, image);
      
    })
    
  }
}

var server = new Server();
server.addService(ZoomService, zoomHandlers);
server.bind('0.0.0.0:9090', ServerCredentials.createInsecure());
server.start();
