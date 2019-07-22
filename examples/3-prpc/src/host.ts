import { PeerServiceServer } from './lib/peerService';
import { Zoom } from './lib/pb/generated/zoom_pb_service';

export default (room: string) => {
  const main = document.querySelector('main')

  main.appendChild(
    Object.assign(
      document.createElement('h2'),
      {innerText: `HOST: ${room}`}
    )
  )

  new PeerServiceServer(room, Zoom, {
    echo: (req, res) => {

      res.setText(
        req.getText().toLocaleUpperCase() + '!??11?✨'
      )

    }

    

  })
}