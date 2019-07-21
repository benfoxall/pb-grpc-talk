
import { PeerServiceClient } from './lib/peerService';
import { Demo } from './lib/pb/gen/ts/demo_pb_service';

export default async (room) => {
  const main = document.querySelector('main')

  main.appendChild(
    Object.assign(
      document.createElement('h2'),
      {innerText: `JOIN: ${room}`}
    )
  )

  const input = document.createElement('input');
  input.type = 'color'
  main.appendChild(input)

  const client = new PeerServiceClient(room, Demo);


  input.addEventListener('change', () => {
    client.issue("Background", (request) => {
      request.setValue(input.value)
    })
  })

  window.addEventListener('mousemove', (e) => {
    client.issue("MouseMove", (request) => {
      request.setLeft(e.clientX)
      request.setTop(e.clientY)
    }).then(response => {
      console.log(response.getAnswer())
    })

  })
}