const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

const boxWidth=width/15
const boxHeight=width/15
const boxTop=width/30
const boxBottom = boxTop+boxHeight
const redLeft = width/4
const redRight = redLeft+boxWidth
const greenLeft = (width/2)-(boxWidth/2)
const greenRight = greenLeft+boxWidth
const blueLeft = width-(width/4)-boxWidth
const blueRight = blueLeft+boxWidth

ctx.fillStyle='red'
ctx.fillRect(redLeft,boxTop,boxWidth,boxHeight)
ctx.fillStyle='#00FF00'
ctx.fillRect(greenLeft,boxTop,boxWidth,boxHeight)
ctx.fillStyle='blue'
ctx.fillRect(blueLeft,boxTop,boxWidth,boxHeight)

var mouseX
var mouseY

function coordCheck(event) {
    mouseX = event.clientX
    mouseY = event.clientY
}

canvas.addEventListener("mousemove", coordCheck, false)
function mouse(){
    if (mouseX >= redLeft && mouseX <= redRight && mouseY <= boxBottom && mouseY >=boxTop
        || mouseX >= greenLeft && mouseX <= greenRight && mouseY <= boxBottom && mouseY >=boxTop
        ||mouseX >= blueLeft && mouseX <= blueRight && mouseY <= boxBottom && mouseY >=boxTop) {
            document.body.style.cursor = 'pointer'
    }
    else {
        document.body.style.cursor = 'auto'
    }
}
setInterval(mouse, 1000 / 60)