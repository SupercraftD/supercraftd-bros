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
}


let m 

let platform={
    x:150,
    y:550,
    w:400,
    h:60
}

function setup(){
    createCanvas(720,640)
    m = new BoxMan(100,0,5,100)
}
function draw(){
    background(255)
    m.draw()
    fill('black')
    rect(platform.x,platform.y,platform.w,platform.h)
}