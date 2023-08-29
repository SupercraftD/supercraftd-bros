let m = new BoxMan(100,100,5,100)

function setup(){
    createCanvas(720,640)
}
function draw(){
    background(255)
    m.draw()
    fill('red')
    rect(100,100,100,100)
}