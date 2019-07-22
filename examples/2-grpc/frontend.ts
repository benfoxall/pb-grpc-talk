import {html, render} from 'lit-html';
import { ZoomClient } from "./protos/generated/ZoomServiceClientPb"
import { ColorSchemeRequest, Noop, EchoMessage } from './protos/generated/zoom_pb';

var zoomClient = new ZoomClient('/api');

const {DARK, LIGHT} = ColorSchemeRequest.Scheme;

zoomClient.systemInfo(new Noop())
  .on('data', (s) => {
    document.querySelector('#zoom').innerHTML = JSON.stringify(s.toObject(), null, 2)
  })


zoomClient.screenShot(new Noop(), {}, (err, response) => {
  if(err) throw err;

  const url = URL.createObjectURL(
    new Blob([response.getBytes_asU8()],  { type: response.getType() }
  ))

  const im = document.createElement('img');
  im.src = url;
  document.body.appendChild(im)

})


class Fn {

  echo(text: string): Promise<string> {
    const message = new EchoMessage();
    message.setText(text)

    return new Promise(resolve => 
      zoomClient.echo(message, {}, (err, response) => {
        if(err) throw err;
        resolve(response.getText())
      })
    )
  }

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