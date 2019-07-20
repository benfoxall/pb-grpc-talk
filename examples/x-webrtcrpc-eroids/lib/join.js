import signalhub from "./signalhub.js"
import Peer from './simplepeer.js';

class PeerClient {
  constructor(room) {

    const connect = async (room) => {

      // delay for live-reload
      if(['127.0.0.1', 'localhost'].includes(document.location.hostname)) {
        await new Promise(r => setTimeout(r, 500))
      }
    
      // the ID of this peer
      const id = Math.random().toString(32)
    
      const hub = signalhub('webrtcrpc-eroids', "https://signalhub-jccqtwhdwc.now.sh")
    
      const subscription = hub.subscribe(id) 
    
      // Somehow this doesn't matter (and takes a long time)
      // maybe it's waiting for a first message?
      // await new Promise(resolve => subscription.on('open', resolve));
    
      const peer = new Peer({ initiator: true })
    
      peer.on('error', err => console.log('error', err))
    
      peer.on('signal', data =>  hub.broadcast(room, { id, data }))
      subscription.on('data', d => peer.signal(d));
    
      await new Promise(resolve => peer.on("connect", resolve))
    
      hub.close();
    
      return peer;
    }

    this.peer = connect(room)

    /* TODO - exit
    window.addEventListener("beforeunload", () => {
      this.send(new Uint8Array([44]))
    })
    */
  }

  send(payload) {
    this.peer.then(p => p.send(payload))
  }
}


export default async (room) => {
  const main = document.querySelector('main')

  main.appendChild(
    Object.assign(
      document.createElement('h2'),
      {innerText: `JOIN: ${room}`}
    )
  )


  const client = new PeerClient(room)

  window.addEventListener('mousemove', (e) => {
    const {screenX, screenY} = e;
    client.send(new Uint8Array([screenX, screenY]))
  })
}