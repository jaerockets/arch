const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

bobo = Number(localStorage.getItem('Size')) - Number(localStorage.getItem('Size')) % 5
scrimblo = Number(localStorage.getItem('X Vel')) * 5
bogos = Number(localStorage.getItem('Y Vel')) * 5
shnozzer = Number(localStorage.getItem('X Pos')) * (window.innerWidth/100) - (Number(localStorage.getItem('X Pos')) * (window.innerWidth/100)% 5)
peepees = Number(localStorage.getItem('Y Pos')) * (window.innerHeight/100) - (Number(localStorage.getItem('Y Pos')) * (window.innerHeight/100) % 5)


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
        b += bobo
        yCount += 1
        if (yCount == 10) {
            c += bobo;
            b -= bobo*10;
            yCount -= 10
        }

    }
    draw = function () {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
    update = function () {
        if (this.x >= (width-bobo)) {
            this.velX = -(this.velX)
        }
        if (this.x < 0) {
            this.velX = -(this.velX)
        }
        if (this.y >= (height-bobo)) {
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
        Math.min(shnozzer, window.innerWidth-bobo*10),
        Math.min(peepees, window.innerHeight-bobo*10),
        'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')',
        bobo,
        scrimblo,
        bogos,
    );

    blocks.push(block);
}
function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, .05)';
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
