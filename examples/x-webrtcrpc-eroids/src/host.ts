import { PeerServer } from './peer.js'

export default (room) => {
  const main = document.querySelector('main')

  main.appendChild(
    Object.assign(
      document.createElement('h2'),
      {innerText: `HOST: ${room}`}
    )
  )

  const server = new PeerServer(room)
  
  server.on("data", (id, data) => {
    console.log("GOT DATA", id, data)
  });

}