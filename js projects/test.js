const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

var b = 0
var c = 0
var yCount = 0
var frameCount = 0

function random(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}
class Block {
    constructor(x, y, color, size, velX, velY) {
        this.x = x + b;
        this.y = y + c;
        this.color = color;
        this.size = size;
        this.velX = velX;
        this.velY = velY;
        b += 60
        yCount += 1
        if (yCount == 10) {
            c += 60;
            b -= 600;
            yCount -= 10
        }

    }
    draw = function () {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
    update = function () {
        if (this.x >= (width-60)) {
            this.velX = -(this.velX)
        }
        if (this.x < 0) {
            this.velX = -(this.velX)
        }
        if (this.y >= (height-60)) {
            this.velY = -(this.velY)
        }
        if (this.y < 0) {
            this.velY = -(this.velY)
        }
        this.x += this.velX;
        this.y += this.velY;
    }
}
let blocks = [];

while (blocks.length < 100) {
    let block = new Block(
        0,
        0,
        'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')',
        60,
        5,
        5,
    );

    blocks.push(block);
}
function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, .1)';
    ctx.fillRect(0, 0, width, height);
    frameCount += 1;

    if (frameCount % 3 == 0) {
        for (let i = 0; i < blocks.length; i++) {
            blocks[i].color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')'
        }
    }

    for (let i = 0; i < blocks.length; i++) {
        blocks[i].draw();
        blocks[i].update();
    }
}
setInterval(loop, 1000 / 60);
