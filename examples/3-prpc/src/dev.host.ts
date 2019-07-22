import { PeerServiceServer } from "./lib/peerService";
import { Dev } from "./lib/pb/gen/ts/dev_pb_service";

export default (room: string) => {

  const main = document.querySelector('main')

  const map = new Map<string, HTMLDivElement>()
  const getDiv = (id: string) => {
    if(!map.has(id)) {
      const el = document.createElement('div')
      el.innerText = '👇' + id
      main.appendChild(el)
      map.set(id, el)
    }
    return map.get(id)
  }

  
  new PeerServiceServer(room, Dev, {
    MouseMove: (req, res, meta) => {
      
      Object.assign(
        getDiv(meta.peerId).style, 
        {left: req.getLeft(), top: req.getTop(), position: 'absolute'}
      )
    },

    Background: (req) => {
      document.body.style.background = req.getValue()
    }

    
  })

}