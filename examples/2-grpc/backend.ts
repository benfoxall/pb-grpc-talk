
import { toggle } from 'dark-mode';
import { Server, ServerCredentials } from 'grpc';
import { ZoomService, IZoomServer } from './protos/dist/ts/zoom_grpc_pb'
import { Noop, ColorSchemeRequest, SystemInfo, Image } from './protos/dist/ts/zoom_pb'
import { currentLoad, battery } from 'systeminformation';
import * as osxScreenshot from 'screenshot-desktop';

const sysInfo = new SystemInfo();
const image = new Image();

const zoomHandlers: IZoomServer = {

  // ECHO SERVICE
  echo: ({request}, callback) => {
    
    request.setText(
      request.getText().toLocaleUpperCase()
    )

    callback(null, request)
  },

  // Streaming Response
  systemInfo:(stream) => {

    stream.write(sysInfo)

    const interval = setInterval(() => {
      if(!stream.writable)  return clearInterval(interval);
    
      stream.write(sysInfo)
    }, 1000)
  },

  // More data!
  screenShot: (_, callback) => {
    
    osxScreenshot()
      .then((d: Buffer) => {

        image.setType('image/jpg')
        image.setBytes(new Uint8Array(d))

        callback(null, image);
      })
  },

  // Extra fun thing
  setColorScheme:({request}, callback) => {

    toggle(request.getScheme() === ColorSchemeRequest.Scheme.DARK)

    callback(null, new Noop())
  },
}

var server = new Server();
server.addService(ZoomService, zoomHandlers);
server.bind('0.0.0.0:9090', ServerCredentials.createInsecure());
server.start();


// Update system info
setInterval(() => {
  currentLoad((d) => {
    sysInfo.setCpuloadsList(d.cpus.map(c => c.load))
  })

  battery((d) => {
    sysInfo.setBattery(d.percent)
    sysInfo.setCharging(d.ischarging)
  })
}, 1000)
