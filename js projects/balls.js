const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

function random(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}
class Ball {
    constructor(x, y, velX, velY, color, size) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.size = size;
    }
    draw = function () {
        ctx.fillStyle = this.color
        ctx.fillRect((this.x)-(this.size/2), (this.y)-(this.size/2), this.size, this.size);
    }
    update = function () {
        if ((this.x + this.size) >= width) {
            this.velX = -(this.velX);
        }

        if ((this.x - this.size) <= 0) {
            this.velX = -(this.velX);
        }

        if ((this.y + this.size) >= height) {
            this.velY = -(this.velY);
        }

        if ((this.y - this.size) <= 0) {
            this.velY = -(this.velY);
        }

        this.x += this.velX;
        this.y += this.velY;
    }
}
let balls = [];

while (balls.length < 150) {
    let size = random(20, 30);
    let ball = new Ball(
        // ball position always drawn at least one ball width
        // away from the edge of the canvas, to avoid drawing errors
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-5, 5),
        random(-5, 5),
        'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')',
        size
    );

    balls.push(ball);
}
function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, .03)';
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < balls.length; i++) {
        balls[i].draw();
        balls[i].update();
    }
    requestAnimationFrame(loop);
}
loop();
 /* ctx.fillRect(0, 0, width, height);
ctx.fillStyle = 'rgb(255, 0, 0)';
ctx.fillRect(50, 50, 100, 150);
ctx.fillStyle = 'rgb(0, 0, 0)';
ctx.fillRect(80, 75, 40, 30);
ctx.fillStyle = 'rgb(0, 0, 0)';
ctx.fillRect(80, 170, 40, 30);
*/
/* function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
} */