import {html, render} from 'lit-html';
import { ZoomClient } from "./protos/dist/ts/ZoomServiceClientPb"
import { BrightnessRequest, DarkModeRequest } from './protos/dist/ts/zoom_pb';

var zoomClient = new ZoomClient('/api');

const b = new BrightnessRequest();
b.setValue(12);

zoomClient.setBrightness(b, {}, () => {
  console.log("setting brightness")
})


// @ts-ignore
window.fn = (bool: boolean) => {

  const mode = new DarkModeRequest()
  mode.setOn(bool)

  zoomClient.setDarkMode(mode, {}, () => {
    console.log("WAS SET")
  })

}