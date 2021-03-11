import React, {
  useState,
  useEffect,
  ChangeEvent,
  ChangeEventHandler,
} from "react";
import { render } from "react-dom";

import { Weather } from "./protos/example_pb";

const example = new Weather();

const Generate = () => {
  const [name, setName] = useState("");
  const handleName = (e) => {
    setName(e.target.value);
  };

  const [cloudy, setCloudy] = useState<boolean>();
  const handleCloudy = (e) => {
    setCloudy(e.target.checked);
  };

  const [temperature, setTemperature] = useState<number>();
  const handleTemperature = (e) => {
    setTemperature(e.target.valueAsNumber);
  };

  const [windspeed, setWindspeed] = useState<number>();
  const handleWindspeed = (e) => {
    setWindspeed(e.target.valueAsNumber);
  };

  const [windDirection, setWindDirection] = useState<number>();
  const handleWindDirection = (e) => {
    setWindDirection(e.target.valueAsNumber);
  };

  const [avatar, setAvatar] = useState<string>();
  // LOL, it's a string, but you get the idea
  const handleFile: ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.currentTarget.files[0];

    debugger;
    if (file) {
      const reader = new FileReader();
      reader.onload = function () {
        const buffer = reader.result as string;
        setAvatar(buffer);
      };
      reader.readAsDataURL(file);
    }
  };

  const [b64, setb64] = useState("");

  useEffect(() => {
    example.setPlacename(name);
    example.setCloudy(cloudy);
    example.setTemprature(temperature);
    example.setWindSpeed(windspeed);
    example.setWindDirection(windDirection);
    example.setPhoto(new TextEncoder().encode(avatar));

    const reader = new FileReader();
    reader.onload = function () {
      setb64((reader.result as string).split(";base64,")[1]);
    };
    reader.readAsDataURL(
      new Blob([example.serializeBinary()], {
        type: "application/protobuf",
      })
    );
  }, [name, cloudy, temperature, windspeed, windDirection, avatar]);

  return (
    <section>
      <label>
        Placename
        <input type="text" onChange={handleName} autoComplete="none" />
      </label>
      <label>
        Cloudy? <input type="checkbox" onChange={handleCloudy} />
      </label>

      <label>
        Temperature
        <input
          type="range"
          onChange={handleTemperature}
          value={temperature}
          min="-10"
          max="40"
          step="0.1"
        />{" "}
        {temperature}
      </label>

      <label>
        Wind Speed
        <input
          type="range"
          onChange={handleWindspeed}
          value={windspeed}
          min="0"
          max="100"
          step="0.1"
        />{" "}
        {windspeed}
      </label>

      <label>
        Wind Direction
        <input
          type="range"
          onChange={handleWindDirection}
          value={windDirection}
          min="0"
          max="100"
          step="0.1"
        />{" "}
        {windDirection}
      </label>

      <label>
        Photo
        <input
          type="file"
          onChange={handleFile}
          accept="image/*"
          capture="camera"
        />
      </label>

      <textarea className="b64" value={b64}></textarea>
    </section>
  );
};

const Consume = () => {
  const [object, setObject] = useState<Weather>();

  const update = (e) => {
    // there's probably a better way
    fetch("data:application/protobuf;base64," + e.target.value)
      .then((res) => res.arrayBuffer())
      .then((buffer) => Weather.deserializeBinary(new Uint8Array(buffer)))
      .then(setObject)
      .catch(() => {
        setObject(undefined);
      });
  };

  console.log(object);

  return (
    <section>
      <textarea onChange={update} autoComplete="none" />

      {object && (
        <>
          <h1>WEATHER!!!</h1>

          <h2>
            💨 {Math.round(object.getWindSpeed())}{" "}
            <div
              style={{
                transform: `rotate(${object.getWindDirection()}deg)`,
                display: "inline-block",
              }}
            >
              🔝
            </div>
          </h2>

          <h2>Where?: {object.getPlacename()}</h2>
          <h2>Cloudy?: {object.getCloudy() ? "☁️" : "🌞"}</h2>
          <h2>🌡? {object.getTemprature().toFixed(2)}!!</h2>

          <p>
            {object.getPhoto() && (
              <img
                src={new TextDecoder().decode(object.getPhoto_asU8())}
                style={{ maxHeight: "5em", maxWidth: "5em" }}
              />
            )}
          </p>
        </>
      )}
    </section>
  );
};

render(
  <>
    <Generate />
    <hr />
    <Consume />
  </>,
  document.querySelector("main")
);
