import React, {
  useState,
  useEffect,
  ChangeEvent,
  ChangeEventHandler,
} from "react";
import { render } from "react-dom";

import { Horse } from "./protos/example_pb";

const example = new Horse();

const Generate = () => {
  const [name, setName] = useState("");
  const [carrots, setCarrots] = useState();
  const [height, setHeight] = useState(15);
  const [avatar, setAvatar] = useState<string>();
  const [b64, setb64] = useState("");

  useEffect(() => {
    example.setName(name);
    example.setLikescarrots(carrots);
    example.setHeight(height);
    example.setAvatar(new TextEncoder().encode(avatar));

    const reader = new FileReader();
    reader.onload = function () {
      setb64((reader.result as string).split(";base64,")[1]);
    };
    reader.readAsDataURL(
      new Blob([example.serializeBinary()], {
        type: "application/protobuf",
      })
    );
  }, [name, carrots, height, avatar]);

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleCheckbox = (e) => {
    setCarrots(e.target.checked);
  };

  const handleSlide = (e: ChangeEvent<HTMLInputElement>) => {
    setHeight(e.target.valueAsNumber);
  };

  // LOL, it's a string, but you get the idea
  const handleFile: ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.currentTarget.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function () {
        const buffer = reader.result as string;
        setAvatar(buffer);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section>
      <label>
        Name <input type="text" onChange={handleName} autoComplete="none" />
      </label>
      <label>
        Carrots? <input type="checkbox" onChange={handleCheckbox} />
      </label>
      <label>
        Hands{" "}
        <input
          type="range"
          onChange={handleSlide}
          value={height}
          min="10"
          max="20"
          step="0.1"
        />{" "}
        {height}
      </label>

      <input type="file" onChange={handleFile} accept="image/svg" />

      <textarea className="b64" value={b64}></textarea>
    </section>
  );
};

const Consume = () => {
  const [object, setObject] = useState<Horse>();

  const update = (e) => {
    // there's probably a better way
    fetch("data:application/protobuf;base64," + e.target.value)
      .then((res) => res.arrayBuffer())
      .then((buffer) => Horse.deserializeBinary(new Uint8Array(buffer)))
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
          <h1>🐴HORSE!</h1>

          <h2>Name: {object.getName()}</h2>

          <h2>Carrots? {object.getLikescarrots() ? "🥰🥕" : "🍏"}</h2>

          <h3>Height:{object.getHeight()}</h3>

          <p>
            {object.getAvatar() && (
              <img
                src={new TextDecoder().decode(object.getAvatar_asU8())}
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
