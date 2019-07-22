import {html, render} from 'lit-html';
import { ZoomClient } from "./protos/dist/ts/ZoomServiceClientPb"
import { ColorSchemeRequest, Noop } from './protos/dist/ts/zoom_pb';

var zoomClient = new ZoomClient('/api');

const {DARK, LIGHT} = ColorSchemeRequest.Scheme;

zoomClient.getSystemInfo(new Noop())
  .on('data', (s) => {
    console.log("--s", s);

    document.querySelector('#zoom').innerHTML = JSON.stringify(s.toObject(), null, 2)
  })


zoomClient.screenShot(new Noop(), {}, (err, response) => {

  const file = new Blob([response.getFile_asU8()], {
    type: 'image/jpg'
  })
const url = URL.createObjectURL(file)

console.log(url)

  response.getFile_asB64();


})


class Fn {

  dark() {
    const request = new ColorSchemeRequest()
    request.setScheme(DARK)
    zoomClient.setColorScheme(request, {}, () => {})
  }

  light() {
    const request = new ColorSchemeRequest()
    request.setScheme(LIGHT)
    zoomClient.setColorScheme(request, {}, () => {})
  }

}

// @ts-ignore
window.fn = new Fn();