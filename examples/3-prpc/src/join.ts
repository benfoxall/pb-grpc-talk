
import { PeerServiceClient } from './lib/peerService';
import { Zoom } from './lib/protos/generated/zoom_pb_service';

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

  const client = new PeerServiceClient(room, Zoom);

  input.addEventListener('change', () => {
    client.issue("echo", (request) => {
      request.setText(input.value)
    }).then(r => console.log(r.getText()))
  })

  // window.addEventListener('mousemove', (e) => {
  //   client.issue("MouseMove", (request) => {
  //     request.setLeft(e.clientX)
  //     request.setTop(e.clientY)
  //   }).then(response => {
  //     console.log(response.getAnswer())
  //   })

  // })
}