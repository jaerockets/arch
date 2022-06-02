const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const image = document.getElementById('test');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

function menu() {
    ctx.drawImage(image, (width - x) / 2, (height - y) / 2, x, y);
}

var textSize = (window.innerHeight / 30) // scales text size to viewport
var y = (window.innerHeight * 0.9); //ctx.drawImage always returns height of 90% of viewport
var x = (window.innerHeight * 0.72); //scales width of ctx.drawImage to fit original image [640 x 800], sides start cutting off if viewport width < 640 [with some padding]
var yAdjust = 1 //incrementally increases yPos of Labels and Sliders
var textCount = 1 //alters text of Labels
var sliderTextCount = 1
var textPosX = ((width - x) / 2) + (x / 15) //scales label pos x to viewport
var textPosY = ((height - y) / 2) + (y / 15) //scales label/slider pos y to viewport
var sliderPosX = ((width - y) / 2) + (x / 1.35) //scales slider pos x to viewport
var xPosBall = sliderPosX //allows slider ball xPos to be independent from slider upon redraw
var yPosBall = textPosY //statically aligns yPos of each slider ball with its text counterpart
var scrollControl = -1 // identifies which scrollbar is being interacted with ;145
var sliderValXCount = (x / 13) //aligns sliderVal xPos to left of parent slider
var t = ((width - y) / 2) + (x / 1.35) + (x / 3) - (window.innerHeight / 30)

class Label {
    constructor(paramxPos, paramyPos, paramtext, paramfill, paramfont) {
        this.xPos = paramxPos;
        this.yPos = paramyPos * yAdjust;
        this.text = paramtext;
        this.fill = paramfill;
        this.font = paramfont;
        this.yPosBall = yPosBall * yAdjust;
        this.sliderValX = sliderPosX - sliderValXCount;
        yAdjust += .8
        this.slider = new Slider(
            sliderPosX,
            this.yPos,
            xPosBall,
        );
    }
    draw = function () {
        ctx.fillStyle = this.fill;
        ctx.font = this.font;
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left'
        ctx.fillText(this.text, this.xPos, this.yPos);
        
        ctx.fillText(this.getSliderValue(), this.sliderValX, this.yPos)

        ctx.fillStyle = this.fill;
        ctx.font = this.font;
        ctx.textBaseline = 'top';
        ctx.fillStyle = '#ffb5f7';
        ctx.fillRect(this.slider.xPos, this.slider.yPos, x / 3, textSize) //slider length scaled to viewport

        ctx.fillStyle = '#00FFFF'
        ctx.fillRect(this.slider.ballPos, this.yPosBall, textSize, textSize)

        if (mouseX >= window.innerWidth/2-(x/8) && mouseX <= window.innerWidth/2-(x/8)+x/4) {
            if (mouseY >= textPosY*6 && mouseY <= textPosY*6+textSize*2) {
                document.body.style.cursor = 'pointer';
            }
            else document.body.style.cursor = 'auto';
        }
        else document.body.style.cursor = 'auto';
    }
    getSliderValue = function(){
        if (this.text == 'Size') {
            return (5+Math.round(((this.slider.ballPos-this.slider.xPos) / (t-this.slider.xPos))*45));
        }
        else if (this.text == 'X Pos') {
            return (Math.round(((this.slider.ballPos-this.slider.xPos) / (t-this.slider.xPos))*100));
        }
        else if (this.text == 'Y Pos') {
            return (Math.round(((this.slider.ballPos-this.slider.xPos) / (t-this.slider.xPos))*100));
        }
        else if (this.text == 'X Vel') {
            return (Math.round(((this.slider.ballPos-this.slider.xPos) / (t-this.slider.xPos))*4));
        }
        else if (this.text == 'Y Vel') {
            return (Math.round(((this.slider.ballPos-this.slider.xPos) / (t-this.slider.xPos))*4));
        }
    }

}

class Slider {
    constructor(paramxPos, paramyPos, paramxPosBall) {
        this.xPos = paramxPos;
        this.yPos = paramyPos;
        this.ballPos = paramxPosBall;
    }
}

let labels = [];

while (labels.length < 5) {
    let label = new Label(
        textPosX,
        textPosY,
        textPicker(),
        'white',
        `bold ${textSize}px Arial`,
    )
    labels.push(label);
}

function drawButton() {
    ctx.fillStyle = '#00FFFF';
    ctx.fillRect(window.innerWidth/2-(x/8), textPosY*6, x/4, textSize*2)

    ctx.fillStyle = 'black';
    ctx.font = `bold ${textSize}px Arial`;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center'
    ctx.fillText('Submit', window.innerWidth/2, textPosY*6.3);
    ctx.fillStyle = 'white'
    ctx.font = `${textSize*.8}px verdana`
    ctx.fillText('velocity above 2 may cause issues', window.innerWidth/2, textPosY*5.3)

    ctx.textBaseline = 'bottom'
    ctx.textAlign = 'right'
    ctx.font = `${textSize*.8}px consolas`
    ctx.fillText('1.01', window.innerWidth, window.innerHeight)
}

function drawText() {
    for (let i = 0; i < labels.length; i++) {
        labels[i].draw();
    }
}

function textPicker() {
    if ((textCount == 1)) {
        let output = 'Size';
        textCount += 1;
        return output;
    }
    else if ((textCount == 2)) {
        let output = 'X Pos';
        textCount += 1;
        return output;
    }
    else if ((textCount == 3)) {
        let output = 'Y Pos';
        textCount += 1;
        return output;
    }
    else if ((textCount == 4)) {
        let output = 'X Vel';
        textCount += 1;
        return output;
    }
    else if ((textCount == 5)) {
        let output = 'Y Vel';
        textCount += 1;
        return output;
    }
}
var mouseX = 0
var mouseY = 0

function mousePress() { //sets scrollControl to current slider index/identifies current click target
    for (let i = 0; i < labels.length; i++) {
        var sliderInstanceX = labels[i].slider.ballPos
        var sliderInstanceY = labels[i].slider.yPos
        if (mouseX >= sliderInstanceX && mouseX <= sliderInstanceX + (window.innerHeight / 30)) {
            if (mouseY >= sliderInstanceY && mouseY <= sliderInstanceY + (window.innerHeight / 30)) {
                console.log("you've clicked")
                scrollControl = i;
            }
        }
    }
    if (mouseX >= window.innerWidth/2-(x/8) && mouseX <= window.innerWidth/2-(x/8)+x/4) {
        if (mouseY >= textPosY*6 && mouseY <= textPosY*6+textSize*2) {
            console.log('cumbo')
            for (let i = 0; i < labels.length; i++) {
            localStorage.setItem(labels[i].text, labels[i].getSliderValue())
            }
            window.location.href = "squaregenerator.html"
        }
    }
}

/*
function drawButton() {
    ctx.fillStyle = '#00FFFF';
    ctx.fillRect(window.innerWidth/2-(x/8), textPosY*6.7, x/4, textSize*2)

    ctx.fillStyle = 'black';
    ctx.font = `bold ${textSize}px Arial`;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center'
    ctx.fillText('Submit', window.innerWidth/2, textPosY*7);
    ctx.fillStyle = 'white'
    ctx.font = `${textSize*.8}px verdana`
    ctx.fillText('Note: High size variable + high velocity', window.innerWidth/2, textPosY*5.3)
    ctx.fillText('will result in separation of squares', window.innerWidth/2, textPosY*5.8)
*/

function mouseRelease() { //releases control of slider
    scrollControl = (-1)
}

function coordCheck(event) { //sets mousePos coords to read-only mousePos values
    mouseX = event.pageX
    mouseY = event.pageY
}

canvas.addEventListener("mousemove", coordCheck, false); //runs coordCheck ;132 on mousemove event
canvas.addEventListener("mousedown", mousePress, false); //runs mousePress ;115 on mousedown event
canvas.addEventListener("mouseup", mouseRelease, false) //runs mouseRelease ;128 on mouseup event

repaint = function () {
    menu();
    drawText();
    if (scrollControl != -1) { //sets slider ball pos to current mousX, states min/max slider ball pos value
        var position = labels[scrollControl].slider;
        position.ballPos = mouseX - (textSize / 2); //offsets origin descrepancy to center of slider ball
        position.ballPos = Math.max(position.ballPos, ((width - y) / 2) + (x / 1.35)); //sets position of ballpos to leftmost slider border if greater than mousepos
        position.ballPos = Math.min(position.ballPos, ((width - y) / 2) + (x / 1.35) + (x / 3) - (window.innerHeight / 30)); //sets position of ballpos to rightmost slider border if less than mousepos
    }
    window.requestAnimationFrame(repaint);
    drawButton()
}
window.requestAnimationFrame(repaint);