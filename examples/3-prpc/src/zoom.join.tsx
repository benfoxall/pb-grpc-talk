
import React, { useState, FunctionComponent, useEffect } from 'react';
import { render } from 'react-dom';
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

      <details>
        <summary>Echo </summary>
        <Echo {...props} />
      </details>

      <hr />

      <details>
        <summary>System Info </summary>
        <SystemInfoPanel {...props} />
      </details>

      <hr />

      <details>
        <summary>Screenshot </summary>
        <Screenshot {...props} />
      </details>

      <hr />

      <details>
        <summary>Scheme </summary>
        <ColorScheme {...props} />
      </details>
    </fieldset>
  )
}


const Echo: FunctionComponent<Props> = ({ client }) => {

  const [echo, setEcho] = useState<string>();

  const change = (e) => {
    const text = e.target.value;

    client
      .issue("echo", (req) => req.setText(text))
      .then(result => {
        setEcho(result.getText())
      })
  }

  return (
    <label>
      <input type="text" onChange={change} className="cta" />
      <span id="echo-output" >{echo}</span>
    </label>
  )
}


const SystemInfoPanel: FunctionComponent<Props> = ({ client }) => {

  const [info, setInfo] = useState<SystemInfo>();

  useEffect(() => {

    const poll = async () => {
      setInfo(
        await client.issue("systemInfo", () => { })
      )
    }

    return clearInterval.bind(null, setInterval(poll, 100))
  }, [])

  return (
    <label>

      <h4>CPUs</h4>
      <div className="meters">
        {info && info.getCpuloadsList().map((n, i) =>
          <meter key={i} value={n} max="100" min="0" />
        )}
      </div>


      <h4>Battery</h4>
      {info && info.getBattery()}%
    </label>
  )
}

const Screenshot: FunctionComponent<Props> = ({ client }) => {

  const [images, setImages] = useState<string[]>([])

  const capture = () => {
    client.issue("screenShot", () => { })
      .then(back => {

        console.log('---', back.getType())
        const url = URL.createObjectURL(
          new Blob([back.getBytes_asU8()], { type: back.getType() }
          ))

        console.log(url)

        setImages(others => [url].concat(others))
      })
  }

  return (
    <label>
      <button className="cta" onClick={capture}>Capture</button>

      <section className="imagePanel">
        {images.map((src, i) => <img key={i} src={src} />)}
      </section>
    </label>
  )
}


const ColorScheme: FunctionComponent<Props> = ({ client }) => {

  const setter = (yes) => {
    return (e) => {
      e.preventDefault()

      client.issue('setColorScheme', req =>
        req.setScheme(yes ? 0 : 1)
      )
    }

  }

  return (
    <label className="cta">

      <button className="dark-mode" onClick={setter(true)}>🌜🌃🌠</button>

      <button className="light-mode" onClick={setter(false)}>☀️😎</button>

    </label>
  )
}
