
import React, {useState, FunctionComponent, useEffect} from 'react';
import {render} from 'react-dom';
import { PeerServiceClient } from "./lib/peerService";
import { Zoom } from "./lib/protos/generated/zoom_pb_service";
import { SystemInfo, Image } from "./lib/protos/generated/zoom_pb";


export default async (room: string) => {

  const client = new PeerServiceClient(room, Zoom);
  const main = document.querySelector('main')

  render(<Component client={client} />, main)
}


interface Props {
  client: PeerServiceClient<typeof Zoom>;
}

const Component: FunctionComponent<Props> = (props) => {

  return (
    <fieldset>
        <legend>Zoom</legend>
        <Echo {...props}/>
        <hr />
        <SystemInfoPanel {...props} />
        <hr />
        <Screenshot {...props} />
        <hr />
        <ColorScheme {...props} />
      </fieldset>
  )
}


const Echo: FunctionComponent<Props> = ({client}) => {

  const [echo, setEcho] = useState<string>();

  const change = (e) => {
    const text = e.target.value;

    client
      .issue("echo", (req) =>  req.setText(text))
      .then(result => {
        setEcho(result.getText())
      })
  }

  return (
    <label>
        echo: 
        <input type="text" onChange={change} />
        <span id="echo-output" >{echo}</span>
    </label>
  )
}


const SystemInfoPanel: FunctionComponent<Props> = ({client}) => {

  const [info, setInfo] = useState<SystemInfo>();

  useEffect(() => {

    const poll = async () => {
      setInfo(
        await client.issue("systemInfo", () => {})
      )
    }

    return clearInterval.bind(null, setInterval(poll, 100))
  }, [])

  return (
    <label>
        cpu:
        {info && info.getCpuloadsList().map((n, i) => 
          <meter key={i} value={n} max="100" min="0" />  
        )}

        battery: {info && info.getBattery()}%
    </label>
  )
}

const Screenshot: FunctionComponent<Props> = ({client}) => {

  const [images, setImages] = useState<string[]>([])

  const capture = () => {
    client.issue("screenShot", () => {})
    .then(back => {

      console.log('---', back.getType())
      const url = URL.createObjectURL(
        new Blob([back.getBytes_asU8()],  { type: back.getType() }
      ))

      console.log(url)
    
      setImages(others => [url].concat(others))
    })
  }

  return (
    <label>
        screenshot:
        <button onClick={capture}>Capture</button>
        <hr />
        {images.map((src, i) => <img key={i} src={src} />)}
    </label>
  )
}


const ColorScheme: FunctionComponent<Props> = ({client}) => {
  const change = (e) => {

    client.issue('setColorScheme', req => 
      req.setScheme(e.target.checked ? 1: 0)
    )

    // console.log(e.target.checked)
  }

  return (
    <label>
        Dark Mode:
        <input type="checkbox" onChange={change} />
    </label>
  )
}
