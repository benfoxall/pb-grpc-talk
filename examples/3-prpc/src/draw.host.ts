import { PeerServiceServer } from "./lib/peerService";
import { Draw } from "./lib/protos/generated/draw_pb_service";


class Canvas {

  public listener = (points: number[]) => { };

  private element: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private dims: ClientRect;
  private readonly size = 700;

  private points: Map<string, number[]> = new Map()
  private color: Map<string, string> = new Map();

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
        { background: 'rgba(255,255,255,0.1)', position: 'fixed' }
      )

      this.dims = canvas.getBoundingClientRect()
    }
    size()
    window.addEventListener("resize", size)


    this.element = canvas;
    this.ctx = canvas.getContext('2d');
    this.ctx.lineWidth = 4;
  }

  handleCoords(peer: string, coords: number[]) {
    this.points.set(peer, coords)

    this.dirty = true;
  }

  setColor(name: string, color: string) {
    this.color.set(name, color);
    this.dirty = true;
  }

  render() {
    if (!this.dirty) return;
    this.dirty = false;

    this.ctx.clearRect(0, 0, this.size, this.size);

    Array.from(this.points.keys()).forEach(key => {

      const points = this.points.get(key);
      const color = this.color.get(key) || '#000';

      this.ctx.strokeStyle = color

      this.ctx.beginPath()
      for (let i = 0; i < points.length; i += 2) {
        this.ctx.lineTo(points[i], points[i + 1]);
      }
      this.ctx.stroke()

    })


  }


}




export default (room: string) => {

  const main = document.querySelector('main')



  const canvas = new Canvas(main);

  // const map = new Map<string, HTMLDivElement>()
  // const getDiv = (id: string) => {
  //   if (!map.has(id)) {
  //     const el = document.createElement('div')
  //     el.innerText = '👇' + id
  //     main.appendChild(el)
  //     map.set(id, el)
  //   }
  //   return map.get(id)
  // }

  const range = document.createElement('input')
  range.type = 'range'
  range.max = "100"
  range.value = "0"
  main.appendChild(range);


  const perSecond = document.createElement('div')
  perSecond.className = 'per-sec'
  main.appendChild(perSecond)

  let count = 0;
  setInterval(() => {
    perSecond.innerText = String(count);
    count = 0;
  }, 1000)


  new PeerServiceServer(room, Draw, {
    Line: (req, res, meta) => {
      count++;

      canvas.handleCoords(meta.peerId, req.getCoordsList())

      res.setTimeout(range.valueAsNumber)
    },

    Color: (req, res, meta) => {
      count++;

      canvas.setColor(meta.peerId, req.getValue())
    }
  })

  const loop = () => {
    requestAnimationFrame(loop)
    canvas.render();
  }
  loop()

}
