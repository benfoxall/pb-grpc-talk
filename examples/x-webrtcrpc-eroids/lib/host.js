import signalhub from "./signalhub.js"
import Peer from './simplepeer.js'


class PeerServer {

  constructor (room) {
    this.room = room
    this.listeners = new Set
    const peers = this.peers = new Map

    var hub = signalhub('webrtcrpc-eroids', "https://signalhub-jccqtwhdwc.now.sh")

    this.sub = hub.subscribe(room)

    this.sub
      .on('open', () => {
        console.log("open…")
      })
      .on('data', (message) => {
        console.log("GOT", message)

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

export default (room) => {
  const main = document.querySelector('main')

  main.appendChild(
    Object.assign(
      document.createElement('h2'),
      {innerText: `HOST: ${room}`}
    )
  )


  const server = new PeerServer(room);

  server.on("data", (id, data) => {
    console.log("GOT DATA", id, data)
  });

}