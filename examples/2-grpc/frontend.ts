import {html, render} from 'lit-html';
import { ZoomClient } from "./protos/dist/ts/ZoomServiceClientPb"
import { BrightnessRequest, DarkModeRequest } from './protos/dist/ts/zoom_pb';

// const data = new URLSearchParams(document.location.search).get('data') as any;
// if(!data) throw "No data from URL"


// const example = Example.deserializeBinary(data);


// document.querySelector('pre').innerText = JSON.stringify(example.toObject(), null, 2);

var zoomClient = new ZoomClient('/api');


const b = new BrightnessRequest();
b.setValue(12);

zoomClient.setBrightness(b, {}, () => {
  console.log("SET")
})


// @ts-ignore
window.fn = (bool: boolean) => {

  const mode = new DarkModeRequest()
  mode.setOn(bool)

  zoomClient.setDarkMode(mode, {}, () => {
    console.log("WAS SET")
  })

}