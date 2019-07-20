
import { PeerRPCClient } from './peerRPC';

export default async (room) => {
  const main = document.querySelector('main')

  main.appendChild(
    Object.assign(
      document.createElement('h2'),
      {innerText: `JOIN: ${room}`}
    )
  )

  const client = new PeerRPCClient(room)

  window.addEventListener('mousemove', (e) => {
    const {screenX, screenY} = e

    client.call("coords", new Uint8Array([screenX, screenY]))
      .then(d => {
        console.log("HELLO", d)
      })

  })
}