import { PeerServiceServer } from './lib/peerService';
import { Demo } from './lib/pb/gen/ts/demo_pb_service';

export default (room: string) => {
  const main = document.querySelector('main')

  main.appendChild(
    Object.assign(
      document.createElement('h2'),
      {innerText: `HOST: ${room}`}
    )
  )

  new PeerServiceServer(room, Demo, {

    Background: (request) => {
      console.log("Background", request.getValue())

      document.body.style.background = request.getValue();
    },

    MouseMove: (request, response) => {
      // console.log("MODE", request.toObject())

      response.setAnswer(request.getLeft() + request.getTop())
      
      Object.assign(main.style, {
        position: 'absolute',
        left: request.getLeft() + 'px',
        top: request.getTop() + 'px',
      })
    }

  })
}