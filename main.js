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

let cx = 0
let cy = 0

let p1
let p2

let winner

let platforms=[{
        x:50,
        y:550,
        w:600,
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

let zoom = 1

function setup(){
    createCanvas(720,640)
    noSmooth()

}
function draw(){
    background(255)
    fill('black')

    if (!window.mode){
        textSize(30)
        text('Press left arrow for local mp, right arrow for online mp, up arrow for against bot, down arrow for bot vs bot',100,100,500,500)

        if (keyIsDown(LEFT_ARROW)){
            window.mode = 'local'
            initLocal()
        }else if (keyIsDown(RIGHT_ARROW)){
            window.mode = 'online'
            initOnline()
        }else if (keyIsDown(UP_ARROW)){
            window.mode = 'bot'
            initLocal()
        }else if (keyIsDown(DOWN_ARROW)){
            window.mode = '2bot'
            initLocal()
        }

    }else{
        push()
        scale(zoom)
        if (window.mode == 'local'){
            cx = ((p1.x+p2.x)/2)-(360 * (1/zoom))
            cy = ((p1.y+p2.y)/2)-(320 * (1/zoom))
            
            d = Math.sqrt((p1.x-p2.x)**2 + (p1.y-p2.y)**2)
            if (d > 600){
                zoom = (600/d)
            }

            fill('black')
            p1.draw()
            p2.draw()
            fill('black')
            for (let platform of platforms){
                rect(platform.x-cx,platform.y-cy,platform.w,platform.h)
            }
        }else{
            if (!window.connectedServer){
                text('Press any key, that key will be the id of the server you join (if it exists) or create (if its new)',
                    100,100,600,400)
            }else{
                if (window.joined){
                    if (window.serverData.p2Available == false){
                        if (!p1){
                            p1=new Criminal(100,0,188,LEFT_ARROW,RIGHT_ARROW,UP_ARROW,1,DOWN_ARROW,false,190)
                            p2=new Criminal(300,0,'F'.charCodeAt(0),'A'.charCodeAt(0),'D'.charCodeAt(0),'W'.charCodeAt(0),2,'S'.charCodeAt(0),false,'G'.charCodeAt(0))                        
                        }
                        cx = ((p1.x+p2.x)/2)-(360 * (1/zoom))
                        cy = ((p1.y+p2.y)/2)-(320 * (1/zoom))
                        
                        d = Math.sqrt((p1.x-p2.x)**2 + (p1.y-p2.y)**2)
                        if (d > 600){
                            zoom = (600/d)
                        }
                        fill('black')
                        p1.draw()
                        p2.draw()
                        fill('black')
                        for (let platform of platforms){
                            rect(platform.x-cx,platform.y-cy,platform.w,platform.h)
                        }                
                    }
                }
            }
        }
        pop()
    }
}


function initLocal(){
    if (window.mode == 'bot'){
        console.log('bot')
        p1=new Criminal(100,0,188,LEFT_ARROW,RIGHT_ARROW,UP_ARROW,1,DOWN_ARROW,false,190)
        p2=new Criminal(300,0,'F'.charCodeAt(0),'A'.charCodeAt(0),'D'.charCodeAt(0),'W'.charCodeAt(0),2,'S'.charCodeAt(0),true,'G'.charCodeAt(0))
        window.mode = 'local'    
    }else if (window.mode=='2bot'){
        console.log('2bot')
        p1=new Criminal(100,0,188,LEFT_ARROW,RIGHT_ARROW,UP_ARROW,1,DOWN_ARROW,true,190)
        p2=new Criminal(300,0,'F'.charCodeAt(0),'A'.charCodeAt(0),'D'.charCodeAt(0),'W'.charCodeAt(0),2,'S'.charCodeAt(0),true,'G'.charCodeAt(0))
        window.mode = 'local'
    }else{
        console.log('local')
        p1=new Criminal(100,0,188,LEFT_ARROW,RIGHT_ARROW,UP_ARROW,1,DOWN_ARROW,false,190)
        p2=new Criminal(300,0,'F'.charCodeAt(0),'A'.charCodeAt(0),'D'.charCodeAt(0),'W'.charCodeAt(0),2,'S'.charCodeAt(0),false,'G'.charCodeAt(0))
        console.log(p2.bot)
    }

}

function initOnline(){
    
}
function keyPressed(){
    if (window.mode == 'online' && !window.connectedServer){
        window.connectedServer = keyCode
        window.joinServer()
    }
    if (key == 'r'){
        //hard and unsafe reset
        reset()
    }
}

function reset(){
    p1 = undefined
    p2 = undefined
    winner = undefined
    window.mode = undefined
    window.connectedServer = undefined
    window.serverData = undefined
    window.pn = undefined
    window.joined = false
    window.inputs1 = undefined
    window.pos1 = undefined
    window.inputs2 = undefined
    window.pos2= undefined
    zoom = 1
    if (keyIsDown('S'.charCodeAt(0))){
        window.clearServers()
    }
}