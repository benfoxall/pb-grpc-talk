
import { toggle } from 'dark-mode';
import { Server, ServerCredentials } from 'grpc';
import { ZoomService, IZoomServer } from './protos/generated/zoom_grpc_pb'
import { Noop, ColorSchemeRequest, SystemInfo, Image } from './protos/generated/zoom_pb'
import { currentLoad, battery } from 'systeminformation';
import osxScreenshot from 'screenshot-desktop';

const sysInfo = new SystemInfo();
const image = new Image();

const zoomHandlers: IZoomServer = {

  // ECHO SERVICE
  echo: ({ request }, callback) => {

    let t = request.getText();
    if (t) {
      const post = Array.from("🤟💕🦖☘️💥🥙🍢🍪⛸🕹📟📪📕6️⃣🧬🎛🏋️‍♀️🍻🌜🦐🐺").slice(0, t.length);

      t = post.join('') + t.toLocaleUpperCase() + post.reverse().join('');

    }

    request.setText(
      t || ''
    )

    callback(null, request)
  },

  // Streaming Response
  systemInfo: (stream) => {

    stream.write(sysInfo)

    const interval = setInterval(() => {
      if (!stream.writable) return clearInterval(interval);

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
  setColorScheme: ({ request }, callback) => {

    toggle(request.getScheme() === ColorSchemeRequest.Scheme.DARK)

    callback(null, new Noop())
  },
}

var server = new Server();
server.addService(ZoomService, zoomHandlers);
server.bind('0.0.0.0:9990', ServerCredentials.createInsecure());
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



/**
 * RUN GRPC PROXY FROM HERE.
 * 
 * (NEEDS grpcwebproxy to be installed (see dev-steps.md))
 * 
 * 
 */
import { spawn } from 'child_process';

const proxy = spawn('grpcwebproxy', [
  '--backend_addr=localhost:9990',
  '--server_http_debug_port=9991',
  '--run_tls_server=false',
  '--server_http_max_write_timeout=1h',
  '--allow_all_origins',
])

proxy.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

proxy.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});

proxy.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
