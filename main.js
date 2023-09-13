/*
bc=()=>{
    console.stdlog = console.log.bind(console);
    console.logs = [];
    console.log = function(){
        console.logs.push(Array.from(arguments));
        alert(console.logs[console.logs.length-1])
        console.stdlog.apply(console, arguments);
    }
    console.error = function(){
      console.logs.push(Array.from(arguments));
      alert(console.logs[console.logs.length-1])
      console.stdlog.apply(console, arguments);
}};bc()
*/

let p1
let p2

let platform={
    x:150,
    y:550,
    w:400,
    h:60
}

function setup(){
    createCanvas(720,640)
    noSmooth()

    p1=new Criminal(100,0,188,LEFT_ARROW,RIGHT_ARROW,UP_ARROW,1)
    p2=new Criminal(300,0,'F'.charCodeAt(0),'A'.charCodeAt(0),'D'.charCodeAt(0),'W'.charCodeAt(0),2)
}
function draw(){
    background(255)
    fill('black')
    p1.draw()
    p2.draw()
    fill('black')
    rect(platform.x,platform.y,platform.w,platform.h)
}