
import { PeerServiceClient } from "./lib/peerService";
import { Dev } from "./lib/pb/generated/dev_pb_service";

export default async (room) => {

  const main = document.querySelector('main')

  const client = new PeerServiceClient(room, Dev);

  window.addEventListener('mousemove', (e) => {
    client.issue("MouseMove", (request) => {
      request.setLeft(e.clientX)
      request.setTop(e.clientY)
    }).then(response => {
      console.log(response.getAnswer())
    })
  });

  const input = document.createElement('input')
  input.type = 'color'
  input.style.width = input.style.height = '40vmin'

  main.appendChild(input)

  input.addEventListener('change', (e) => {
    client.issue("Background", (req) => {
      req.setValue(input.value)
    })
  })

}