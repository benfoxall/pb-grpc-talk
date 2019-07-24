
import { PeerServiceClient } from "./lib/peerService";
import { Draw } from "./lib/protos/generated/draw_pb_service";

class Canvas {

  public listener = (points: number[]) => { };

  private element: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private dims: ClientRect;
  private readonly size = 700;

  private points: number[] = []
  private color: string = '#000'

  private lastX = 0;
  private lastY = 0;

  private dirty = true;

  constructor(parent: Element) {

    const canvas = document.createElement('canvas');
    parent.appendChild(canvas);
    canvas.width = canvas.height = this.size;

    const size = () => {
      const { innerHeight, innerWidth } = window;
      const s = Math.min(innerHeight, innerWidth)

      const left = (innerWidth - s) / 2
      const top = (innerHeight - s) / 2

      Object.assign(canvas.style,
        { width: s, height: s, left, top },
        { background: 'rgba(255,255,255,0.3)', position: 'fixed' }
      )

      this.dims = canvas.getBoundingClientRect()
    }
    size()
    setTimeout(size, 50)// not too sure why we need this!

    window.addEventListener("resize", size)


    // canvas.addEventListener("pointerdown", this, false);
    // canvas.addEventListener("pointerup", this, false);
    // canvas.addEventListener("pointercancel", this, false);
    canvas.addEventListener("touchmove", this, false);
    canvas.addEventListener("mousemove", this, false);

    this.element = canvas;
    this.ctx = canvas.getContext('2d');
    this.ctx.lineWidth = 4;
  }

  handleEvent(e: PointerEvent) {
    e.preventDefault()

    const { left, width, top, height } = this.dims;

    const x = ((e.pageX - left) / width) * this.size;
    const y = ((e.pageY - top) / height) * this.size;

    const jump = Math.abs(x - this.lastX) + Math.abs(y - this.lastY);

    if (jump > 250) {
      console.log("NOPE")
      this.points = [];
    }


    this.lastX = x;
    this.lastY = y;

    this.points.unshift(x, y);

    while (this.points.length > 20) {
      this.points.pop();
    }

    // HERE

    this.listener(this.points);

    this.dirty = true;
  }

  setColor(color: string) {
    this.color = color;
    this.dirty = true;
  }

  render() {
    if (!this.dirty) return;
    this.dirty = false;

    this.ctx.clearRect(0, 0, this.size, this.size);

    this.ctx.strokeStyle = this.color;

    this.ctx.beginPath()
    for (let i = 0; i < this.points.length; i += 2) {
      this.ctx.lineTo(this.points[i], this.points[i + 1]);
    }
    this.ctx.stroke()
  }


}

export default async (room) => {

  const main = document.querySelector('main')

  const canvas = new Canvas(main)


  const input = document.createElement('input');
  input.type = 'color'
  input.style.width = '40vmin'
  input.style.height = '20vmin'

  input.addEventListener('change', () => {
    canvas.setColor(input.value)

    client.issue("Color", (req) => {
      req.setValue(input.value);
    })
  })
  main.appendChild(input);

  const client = new PeerServiceClient(room, Draw);

  let timeout = 500;
  let wait = false;
  canvas.listener = (points) => {
    // timeout stuff
    if (wait) return;
    wait = true;

    setTimeout(() => {
      wait = false
    }, timeout)

    // also requires a response (veru conservative)
    client.issue("Line", (request) => {
      request.setCoordsList(points)
    }).then(r => {
      timeout = r.getTimeout()
    })
      .catch(e => {
        console.log("Didn't send line")
      })
  }

  const loop = () => {
    requestAnimationFrame(loop)
    canvas.render();
  }

  loop()

}
