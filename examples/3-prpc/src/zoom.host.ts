import CameraPhoto from 'jslib-html5-camera-photo';
import { PeerServiceServer } from "./lib/peerService";
import { Zoom } from "./lib/protos/generated/zoom_pb_service";
import dataUriToBuffer from 'data-uri-to-buffer';

export default (room: string) => {

  const main = document.querySelector('main')

  let cameraPhoto
  const getCamera = async () => {
    if(cameraPhoto) return cameraPhoto;

    const video = document.createElement('video')
    video.autoplay = true
    video.style.maxWidth = '50%'
    main.appendChild(video);

    cameraPhoto = new CameraPhoto(video);

    await cameraPhoto.startCamera()

    await new Promise(d => setTimeout(d, 700))

    return cameraPhoto;
  }




  new PeerServiceServer(room, Zoom, {
    echo: (req, res) => {
      res.setText(
        req.getText() + '!'
      )
    },

    systemInfo: (req, res) => {

      const n = Date.now();

      const v = Array.from({length: 4}, (_, i) => i)
        .map(i => (Math.sin(i * 10 + (n/1000)) + 1) * 50)

      res.setCpuloadsList(v)

      res.setBattery(Math.random() * 100|0)
    },

    screenShot: async (req, res) => {

      const camera = await getCamera()

      const dui = camera.getDataUri({
        sizeFactor: 0.5,
      });

      const buff = dataUriToBuffer(dui);

      res.setBytes(new Uint8Array(buff))
      res.setType(buff.type)
    },

    setColorScheme: (req) => {
      
      if(req.getScheme() === 1) {
        document.body.style.background = '#333'
        document.body.style.color = '#ccc'
      } else {
        document.body.style.background = '#ccc'
        document.body.style.color = '#333'
      }
    }
  })

}