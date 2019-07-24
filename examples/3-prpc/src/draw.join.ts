
import { PeerServiceClient } from "./lib/peerService";
import { Draw } from "./lib/protos/generated/draw_pb_service";

class Canvas {
  private element: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private dims: ClientRect;
  private readonly size = 700;

  constructor(parent: Element) {

    const canvas = document.createElement('canvas');
    parent.appendChild(canvas);
    canvas.width = canvas.height = this.size;

    const size = () => {
      const {innerHeight, innerWidth} = window;
      const s = Math.min(innerHeight, innerWidth)
      
      const left = (innerWidth - s) / 2
      const top = (innerHeight - s) / 2

      Object.assign(canvas.style, 
        { width: s, height: s, left, top },
        { background: '#fff', position: 'fixed' }
      )

      this.dims = canvas.getBoundingClientRect()
    }
    size()
    window.addEventListener("resize", size)


    // canvas.addEventListener("pointerdown", this, false);
    // canvas.addEventListener("pointerup", this, false);
    // canvas.addEventListener("pointercancel", this, false);
    canvas.addEventListener("touchmove", this, false);
    canvas.addEventListener("mousemove", this, false);

    this.element = canvas;
    this.ctx = canvas.getContext('2d');
  }

  handleEvent(e: PointerEvent) {
    console.log(e)
    e.preventDefault()

    const {left, width, top, height} = this.dims;

    const x = ((e.pageX - left) / width) * this.size;
    const y = ((e.pageY - top) / height) * this.size;

    this.ctx.fillRect(x - 5, y - 5, 10, 10);
  }

}

export default async (room) => {

  const main = document.querySelector('main')

  const canvas = new Canvas(main)

  const client = new PeerServiceClient(room, Draw);

  // canvas.addEventListener('mousemove', (e) => {
  //   client.issue("Line", (request) => {
  //     request.setCoordsList([e.clientX, e.clientY])
  //   })
  // });

}