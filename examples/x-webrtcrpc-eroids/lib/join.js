import signalhub from "./signalhub.js"
import Peer from './simplepeer.js';


const connect = async (room) => {

  // delay because live-reload
  if(['127.0.0.1', 'localhost'].includes(document.location.hostname)) {
    await new Promise(r => setTimeout(r, 500))
  }

  // the ID of this peer
  const id = Math.random().toString(32)

  const hub = signalhub('webrtcrpc-eroids', "https://signalhub-jccqtwhdwc.now.sh")

  const subscription = hub.subscribe(id) 

  // Somehow this doesn't matter (and takes a long time)
  // await new Promise(resolve => subscription.on('open', resolve));

  const peer = new Peer({ initiator: true })

  peer.on('error', err => console.log('error', err))

  peer.on('signal', data =>  hub.broadcast(room, { id, data }))
  subscription.on('data', d => peer.signal(d));

  await new Promise(resolve => peer.on("connect", resolve))

  hub.close();

  return peer;
}


export default async (room) => {
  const main = document.querySelector('main')

  main.appendChild(
    Object.assign(
      document.createElement('h2'),
      {innerText: `JOIN: ${room}`}
    )
  )


  const peer = await connect(room);

  console.log("YUP");

  window.addEventListener('mousemove', (e) => {
//screenX: 1196, screenY: 319
    // console.log(e)

    const {screenX, screenY} = e;
    peer.send(new Float32Array([screenX, screenY]))

  })

  // var hub = signalhub('webrtcrpc-eroids', "https://signalhub-jccqtwhdwc.now.sh")

  // var peer = new Peer({ initiator: true })

  // peer.on('error', err => console.log('error', err))

  // const id = Math.random().toString(32)

  // // TODO WAIT ON SUBSCRIBE
  // hub.subscribe(id)
  // .on("open", () => {
  //   console.log("openned")
  // })
  
  //   .on("data", (data) => {
  //   console.log("GOT", data)

  //   peer.signal(data);
  // })

  // peer.on('signal', data => {
  //   hub.broadcast(room, {
  //     id,
  //     data
  //   })
  // })

  // peer.on("connect", () => {
  //   console.log("CONNECTED!!")

  //   hub.close();
  // })
}