import { ZoomClient } from "./protos/generated/ZoomServiceClientPb";
import {
  ColorSchemeRequest,
  Noop,
  EchoMessage,
  SystemInfo,
} from "./protos/generated/zoom_pb";
import React, { useState, FunctionComponent, useEffect } from "react";
import { render } from "react-dom";

const client = new ZoomClient("/api");

const Component: FunctionComponent = () => {
  return (
    <fieldset>
      <legend>Demo</legend>

      <details>
        <summary>Echo </summary>
        <Echo />
      </details>

      <hr />

      <details>
        <summary>System Info </summary>
        <SystemInfoPanel />
      </details>

      <hr />

      <details>
        <summary>Screenshot </summary>
        <Screenshot />
      </details>

      <hr />

      <details>
        <summary>Scheme </summary>
        <ColorScheme />
      </details>
    </fieldset>
  );
};

const Echo: FunctionComponent = () => {
  const [echo, setEcho] = useState<string>();

  const change = (e) => {
    const text = e.target.value;

    const request = new EchoMessage();
    request.setText(text);

    client.echo(request, {}, (err, result) => {
      setEcho(result.getText());
    });
  };

  return (
    <label>
      <input type="text" onChange={change} className="cta" />
      <span id="echo-output">{echo}</span>
    </label>
  );
};

const SystemInfoPanel: FunctionComponent = () => {
  const [info, setInfo] = useState<SystemInfo>();

  useEffect(() => {
    const request = client.systemInfo(new Noop());

    request.on("data", (s) => {
      setInfo(s);
    });

    return () => {
      request.cancel();
    };
  }, []);

  return (
    <label>
      <h4>CPUs</h4>
      <div className="meters">
        {info &&
          info
            .getCpuloadsList()
            .map((n, i) => <meter key={i} value={n} max="100" min="0" />)}
      </div>
      <h4>Battery</h4>
      {info && info.getBattery()}%
    </label>
  );
};

const Screenshot: FunctionComponent = () => {
  const [images, setImages] = useState<string[]>([]);

  const capture = () => {
    client.screenShot(new Noop(), {}, (err, back) => {
      console.log("---", back.getType());
      const url = URL.createObjectURL(
        new Blob([back.getBytes_asU8()], { type: back.getType() })
      );

      console.log(url);

      setImages((others) => [url].concat(others));
    });
  };

  return (
    <label>
      <button className="cta" onClick={capture}>
        Capture
      </button>

      <section className="imagePanel">
        {images.map((src, i) => (
          <img key={i} src={src} />
        ))}
      </section>
    </label>
  );
};

const ColorScheme: FunctionComponent = () => {
  const setter = (yes) => {
    return (e) => {
      e.preventDefault();

      const request = new ColorSchemeRequest();
      request.setScheme(yes ? 0 : 1);

      client.setColorScheme(request, {}, () => {});
    };
  };

  return (
    <label className="cta">
      <button className="dark-mode" onClick={setter(true)}>
        🌜🌃🌠
      </button>

      <button className="light-mode" onClick={setter(false)}>
        ☀️😎
      </button>
    </label>
  );
};

const main = document.querySelector("main");

render(<Component />, main);
