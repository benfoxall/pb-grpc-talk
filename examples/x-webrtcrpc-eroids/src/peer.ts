
import signalhub from 'signalhub'
import Peer from 'simple-peer'

// console.log(PeerMessage);

// const m = new PeerMessage();

// signalhub config
const url = "https://signalhub-jccqtwhdwc.now.sh"
const app = 'webrtcrpc-eroids'

type Listener = (id: string, payload: Uint8Array) => void;

// Messages in the main hub room
type HubMessage = 
  { ping: string} &
  { pong: string} & 
  { id: string, data: any }

export class PeerServer {

  private listeners: Set<Listener>;
  private peers: any;

  constructor (room: string) {
    this.listeners = new Set
    this.peers = new Map

    const hostID = Math.random().toString(32);

    var hub = signalhub(app, url)

    const started = performance.now();
    setTimeout(() => {
      hub.broadcast(room, {ping: hostID})
    }, 100)
    

    const sub = hub.subscribe(room)

    sub
      .on('open', () => {
        console.log("open…")
      })
      .on('data', (message: HubMessage) => {
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

        if(!this.peers.has(remoteId)) {
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

          this.peers.set(remoteId, peer);
        }

        this.peers.get(remoteId).signal(json);
      })
  

  }

  on(name: string, fn: Listener) {
    if(name === 'data') {
      this.listeners.add(fn)
    }
  }

  send(id: string, payload: Uint8Array) {
    if(this.peers.has(id)) {
      this.peers.get(id).send(payload)
    }
  }

}


export class PeerClient {

  private listeners = new Set<(d: Uint8Array) => void>();
  private peer: any;

  constructor(room: string) {

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
    
      peer.on('signal', data =>  hub.broadcast(room, { id, data } as HubMessage))
      subscription.on('data', d => peer.signal(d));
    
      await new Promise(resolve => peer.on("connect", resolve))
    
      hub.close();

      peer.on('data', (data) => {
        this.listeners.forEach(fn => fn(data))
      })
    
      return peer;
    }

    this.peer = connect(room)

    /* TODO - exit
    window.addEventListener("beforeunload", () => {
      this.send(new Uint8Array([44]))
    })
    */
  }

  send(payload: Uint8Array) {
    this.peer.then(p => p.send(payload))
  }

  on(name: string, fn: (d: Uint8Array) => void) {
    if(name === 'data') {
      this.listeners.add(fn)
    }
  }
}