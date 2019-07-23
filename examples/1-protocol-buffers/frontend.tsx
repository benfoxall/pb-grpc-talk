import React, { useState, useEffect, ChangeEvent } from 'react';
import { render } from 'react-dom';

import { Example } from './protos/example_pb'

const example = new Example();

const Generate = () => {

  const [name, setName] = useState()
  const [checked, setChecked] = useState()
  const [howMuch, setHowMuch] = useState()
  const [b64, setb64] = useState();


  useEffect(() => {
    example.setName(name)
    example.setBurger(checked)
    example.setHowmuch(howMuch)

    const reader = new FileReader();
    reader.onload = function () {

      setb64((reader.result as string).split(';base64,')[1])
    };
    reader.readAsDataURL(
      new Blob([example.serializeBinary()], {
        type: 'application/protobuf'
      })
    );

  }, [name, checked, howMuch])

  const handleName = (e) => {
    setName(e.target.value)
  }

  const handleCheckbox = (e) => {
    setChecked(e.target.checked)
  }

  const handleSlide = (e: ChangeEvent<HTMLInputElement>) => {
    setHowMuch(e.target.valueAsNumber)
  }

  return (
    <section>
      <label>
        Name <input type="text" onChange={handleName} />
      </label>
      <label>
        Burger? <input type="checkbox" onChange={handleCheckbox} />
      </label>
      <label>
        How Much <input type="range" onChange={handleSlide} max="100" /> {howMuch}
      </label>

      <div className="b64">{b64}</div>
    </section>
  )
}

const Consume = () => {
  const [object, setObject] = useState<Example>()

  const update = (e) => {
    // there's probably a better way
    fetch('data:application/protobuf;base64,' + e.target.value)
      .then(res => res.arrayBuffer())
      .then(buffer => Example.deserializeBinary(new Uint8Array(buffer)))
      .then(setObject)
  }

  return (
    <section>
      <textarea onChange={update} />

      <h1>{object && object.getName()}</h1>

      <p>{object && (object.getBurger() ? '🍔 ×' : '🛥 ×')} {object && object.getHowmuch()}</p>
    </section>
  )

}


render(
  <>
    <Generate />
    <hr />
    <Consume />
  </>,
  document.querySelector('main')
);
