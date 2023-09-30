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

let platforms=[{
        x:150,
        y:550,
        w:400,
        h:60
    },{
        x:50,
        y:350,
        w:150,
        h:20
    },{
        x:500,
        y:350,
        w:150,
        h:20
    }
]


function setup(){
    createCanvas(720,640)
    noSmooth()

}
function draw(){
    background(255)
    fill('black')
    if (!window.mode){
        textSize(30)
        text('Press left arrow for local mp, right arrow for online mp',100,100,500,100)

        if (keyIsDown(LEFT_ARROW)){
            window.mode = 'local'
            initLocal()
        }else if (keyIsDown(RIGHT_ARROW)){
            window.mode = 'online'
            initOnline()
        }

    }else{
        if (window.mode == 'local'){
            fill('black')
            p1.draw()
            p2.draw()
            fill('black')
            for (let platform of platforms){
                rect(platform.x,platform.y,platform.w,platform.h)
            }    
        }else{
            if (!window.connectedServer){
                text('Press any key, that key will be the id of the server you join (if it exists) or create (if its new)',
                    100,100,600,400)
            }else{
                if (window.joined){
                    if (window.serverData.p2Available == false){
                        if (!p1){
                            p1=new Criminal(100,0,188,LEFT_ARROW,RIGHT_ARROW,UP_ARROW,1,DOWN_ARROW)
                            p2=new Criminal(300,0,'F'.charCodeAt(0),'A'.charCodeAt(0),'D'.charCodeAt(0),'W'.charCodeAt(0),2,'S'.charCodeAt(0))                        
                        }
                        fill('black')
                        p1.draw()
                        p2.draw()
                        fill('black')
                        for (let platform of platforms){
                            rect(platform.x,platform.y,platform.w,platform.h)
                        }                
                    }
                }
            }
        }
    }
}


function initLocal(){
    p1=new Criminal(100,0,188,LEFT_ARROW,RIGHT_ARROW,UP_ARROW,1,DOWN_ARROW)
    p2=new Criminal(300,0,'F'.charCodeAt(0),'A'.charCodeAt(0),'D'.charCodeAt(0),'W'.charCodeAt(0),2,'S'.charCodeAt(0))

}

function initOnline(){
    
}
function keyPressed(){
    if (window.mode == 'online' && !window.connectedServer){
        window.connectedServer = keyCode
        window.joinServer()
    }
}