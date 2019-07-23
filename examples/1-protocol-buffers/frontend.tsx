import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';

import { Example } from './protos/example_pb'

const example = new Example();

const Generate = () => {

  const [name, setName] = useState()
  const [checked, setChecked] = useState()
  const [b64, setb64] = useState();


  useEffect(() => {
    example.setName(name)
    example.setChecked(checked)

    const reader = new FileReader();
    reader.onload = function(){
      setb64(reader.result as string)
    };
    reader.readAsDataURL(
      new Blob([example.serializeBinary()], {
        type: 'application/protobuf'
      })
    );

  }, [name, checked])

  const handleName = (e) => {
    setName(e.target.value)
  }

  const handleCheckbox = (e) => {
    setChecked(e.target.checked)
  }

  return (
    <>
      <label>
        Name <input type="text" onChange={handleName} />
      </label>
      <label>
        Check <input type="checkbox" onChange={handleCheckbox} />
      </label>
      
      <div className="b64">{b64}</div>
    </>
  )
}

const Consume = () => {
  const [object, setObject] = useState<Example>()

  const update = (e) => {
    // there's probably a better way
    fetch(e.target.value)
      .then(res => res.arrayBuffer())
      .then(buffer => Example.deserializeBinary(new Uint8Array(buffer)))
      .then(setObject)
  }

  return (
    <>
      <textarea onChange={update} />

      <h1>{object && object.getName()}</h1>

      <p>{object && (object.getChecked() ? '✅' : '❌')}</p>
    </>
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
