import signalhub from "./signalhub.js"
import Peer from './simplepeer.js';

export default (room) => {
  const main = document.querySelector('main')

  main.appendChild(
    Object.assign(
      document.createElement('h2'),
      {innerText: `HOST: ${room}`}
    )
  )

  const peers = new Map()

  var hub = signalhub('webrtcrpc-eroids', "https://signalhub-jccqtwhdwc.now.sh")


  // TODO - SUPPORT AN ECHO TO AVOID RE-JOINING
  hub.subscribe(room)
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
        })

        peer.on('data', data => console.log(data))


        peers.set(remoteId, peer);
      }

      peers.get(remoteId).signal(json);

      

    })
  


}