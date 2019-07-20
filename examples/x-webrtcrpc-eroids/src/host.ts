import { PeerRPCServer, Handler } from './peerRPC'

export default (room) => {
  const main = document.querySelector('main')

  main.appendChild(
    Object.assign(
      document.createElement('h2'),
      {innerText: `HOST: ${room}`}
    )
  )


  const handler: Handler = (meta, data) => {
    console.log("HANDLE")
    console.log(meta, data)

    return new Uint8Array([data[0] + data[1]])
  }

  new PeerRPCServer(room, handler)
}