import { PeerClient } from './peer.js'

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
    const {screenX, screenY} = e
    client.send(new Uint8Array([screenX, screenY]))
  })
}