const canvas = document.createElement('canvas')
document.body.appendChild(canvas)

const ratio = window.devicePixelRatio || 1;
const width = window.innerWidth * ratio
const height = window.innerHeight * ratio

Object.assign(canvas, { width,height })
Object.assign(canvas.style, { width: '100vw', height: '100vh' })
Object.assign(document.body.style, { overflow: 'hidden', margin: '0' })

const ctx = canvas.getContext('2d')
ctx.fillRect(0,0, width, height)

window.key = null;

document.addEventListener('keydown', (e) => {
  window.key = e.key
})
document.addEventListener('keyup', (e) => {
  window.key = null
})

const gameState = {
  ships: [
    {
      position: {x: width/2, y: height/2},
      rotation: 0,
      fireTime: 0,
      speed: 1,
      kills: 0,
      deaths: 0,
    }
  ],
  bullets: [{
    position: {x: width/2, y: height/2},
    rotation: 0,
    speed: 6,
    ttl: 1000
  }]
}


const update = (delta) => {
  gameState.ships.forEach(ship => {
    ship.speed *= 0.99

    if(key === 'ArrowRight') {
      ship.rotation += 0.1
    }
    if(key === 'ArrowLeft') {
      ship.rotation -= 0.1
    }
    if(key === 'ArrowUp') {
      ship.speed += 0.5
    }
    if(key === 'ArrowDown') {
      ship.speed -= 0.1
    }


    ship.fireTime += delta;
    if(key === ' ') {
      if(ship.fireTime > 100) {

        ship.fireTime = 0

        gameState.bullets.push({
          position: {...ship.position},
          rotation: ship.rotation,
          speed: ship.speed + 6,
          ttl: 1200
        })
      }
    }

    const x = ship.speed * Math.sin(ship.rotation)
    const y = ship.speed * -Math.cos(ship.rotation)

    ship.position.x += x
    ship.position.y += y

    ship.position.x = ship.position.x % width
    ship.position.y = ship.position.y % height

    while(ship.position.x < 0) {
      ship.position.x += width
    }

    while(ship.position.y < 0) {
      ship.position.y += height
    }
  })

  gameState.bullets = gameState.bullets.filter(ship => {
    ship.ttl -= delta;
    return ship.ttl > 0
  });

  gameState.bullets.forEach(b => {
    b.speed *= 0.99   

    const x = b.speed * Math.sin(b.rotation)
    const y = b.speed * -Math.cos(b.rotation)

    b.position.x += x
    b.position.y += y

    b.position.x = b.position.x % width
    b.position.y = b.position.y % height

    while(b.position.x < 0) {
      b.position.x += width
    }

    while(b.position.y < 0) {
      b.position.y += height
    }
  })
}

const draw = () => {
  ctx.save()

  ctx.fillStyle = 'rgba(0,0,0,1)'

  ctx.fillRect(0,0, width, height)

  ctx.beginPath()
  gameState.ships.forEach(ship => {

    ctx.save()
    
    ctx.translate(ship.position.x, ship.position.y)
    ctx.rotate(ship.rotation)

    ctx.moveTo(0,-10)
    ctx.lineTo(10,10)
    ctx.lineTo(-10,10)
    ctx.lineTo(0,-10)

    ctx.restore()
    
  })

  gameState.bullets.forEach(bullet => {

    ctx.save()
    
    ctx.translate(bullet.position.x, bullet.position.y)

    const r = 5

    ctx.moveTo(0,0)
    ctx.arc(0,0,r,0,Math.PI * 2)
 
    ctx.restore()
    
  })

  ctx.strokeStyle = ctx.fillStyle = 'white'
  ctx.fill();

  ctx.restore()
}

draw();


let last = performance.now()
const loop = (time) => {
  requestAnimationFrame(loop);

  draw()

  update(time - last);
  last = time;
}

loop(last);