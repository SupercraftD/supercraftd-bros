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

let c

let platform={
    x:150,
    y:550,
    w:400,
    h:60
}

function setup(){
    createCanvas(720,640)
    noSmooth()

    c=new Criminal(100,0)
}
function draw(){
    background(255)
    fill('black')
    c.draw()
    fill('black')
    rect(platform.x,platform.y,platform.w,platform.h)
}