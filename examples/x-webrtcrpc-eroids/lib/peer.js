import signalhub from "./vendor/signalhub.js"
import Peer from './vendor/simplepeer.js'

// signalhub config
const url = "https://signalhub-jccqtwhdwc.now.sh"
const app = 'webrtcrpc-eroids'

export class PeerServer {

  constructor (room) {
    this.room = room
    this.listeners = new Set
    const peers = this.peers = new Map

    const hostID = Math.random().toString(32);

    var hub = signalhub(app, url)

    const started = performance.now();
    setTimeout(() => {
      hub.broadcast(room, {ping: hostID})
    }, 100)
    

    this.sub = hub.subscribe(room)

    this.sub
      .on('open', () => {
        console.log("open…")
      })
      .on('data', (message) => {
        console.log("GOT", message)

        if(message.ping) {

          if(message.ping !== hostID) {
            hub.broadcast(room, {pong: message.ping});
          }

          return;
        }

        if(message.pong) {
          // if matches me AND I'm new, then remove
          const delta = performance.now() - started;

          if(message.pong === hostID && delta < 5000) {
            console.log("ooops, disconneting")

            hub.close()
          } 
          return;
        }

        const remoteId = message.id;
        const json = message.data;

        if(!peers.has(remoteId)) {
          const peer = new Peer({ initiator: false })
          peer.on('error', err => console.log('error', err))

          peer.on("signal", data => hub.broadcast(remoteId, data))

          peer.on("connect", () => {
            console.log("CONNECTED!!")
          })

          peer.on('close', () => {
            console.log("CLOSED")
            this.peers.delete(remoteId)
          })

          peer.on('data', data => {
            this.listeners.forEach(fn => {
              fn(remoteId, data);
            })
          })

          peers.set(remoteId, peer);
        }

        peers.get(remoteId).signal(json);
      })
  

  }

  on(name, fn) {
    if(name === 'data') {
      this.listeners.add(fn)
    }
  }

  send(id, payload) {
    if(this.peers.has(id)) {
      this.peers.get(id).send(payload)
    }
  }

}


export class PeerClient {
  constructor(room) {

    const connect = async (room) => {

      // delay for live-reload
      if(['127.0.0.1', 'localhost'].includes(document.location.hostname)) {
        await new Promise(r => setTimeout(r, 500))
      }
    
      // the ID of this peer
      const id = Math.random().toString(32)
    
      const hub = signalhub(app, url)
    
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