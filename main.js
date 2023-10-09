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

let ecx = 0
let ecy = 0

let cameraShaking = false
let cameraShakes = []
let camShakeDuration = 10
function camShake(){
    if (cameraShakes.length > camShakeDuration){
        cameraShaking = false
    }
    if (cameraShaking){
        let dx = 5+Math.random()*2
        let dy = 5+Math.random()*2

        ecx += dx 
        ecy += dy

        cameraShakes.push([dx,dy])
    }else{
        if (cameraShakes.length > 0){
            let s = cameraShakes.pop()

            ecx -= s[0]
            ecy -= s[1]
        }else{
            ecx = 0
            ecy = 0
        }
    }
}


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

let serverInput
let serverButton

function setup(){
    createCanvas(720,640)
    noSmooth()
    serverInput = createInput()
    serverInput.position(200,300)
    serverButton = createButton('Go')
    serverButton.position(400,300)
    serverInput.hide()
    serverButton.hide()
}
let selector = 0
let selectorsY = {
    200:"Local mode: play with 2 players on one computer. p1: arrow keys, comma, and period. p2: WASD, F, and G",
    300:"Online mode: play online. Host (p1): arrow keys, comma, and period. Other player (p2): WASD, F, and G",
    400:"Player vs Bot mode: play against a bot. Player (p1): arrow keys, comma, and period",
    500:"Bot vs Bot mode: watch two bots play each other. No controls."}
let rightDownLast = false
let leftDownLast = false

let gameOver = false

function draw(){
    background(255)
    fill('black')
    serverInput.hide()
    serverButton.hide()
    camShake()
    if (!window.mode){
        textSize(30)
        //text('Press left arrow for local mp, right arrow for online mp, up arrow for against bot, down arrow for bot vs bot',100,100,500,500)
        text('Local',100,200)
        text('Online',100,300)
        text('Player vs Bot',100,400)
        text('Bot vs Bot',100,500)
        rect(60,200+(100*selector)-25,25,25)

        text(selectorsY[200+(100*selector)],300,100,300,500)
        text('Enter or Space to select', 300,600)
        if (keyIsDown(RIGHT_ARROW) || keyIsDown(DOWN_ARROW)){
            if (!rightDownLast){
                rightDownLast = true
                selector += 1
                if (selector >= Object.keys(selectorsY).length){
                    selector = 0
                }
            }
        }else{
            rightDownLast = false
        }

        if (keyIsDown(LEFT_ARROW) || keyIsDown(UP_ARROW)){
            if (!leftDownLast){
                leftDownLast = true
                selector -= 1
                if (selector < 0){
                    selector = Object.keys(selectorsY).length-1
                }
            }
        }else{
            leftDownLast = false
        }

        if (keyIsDown(ENTER) || keyIsDown(32)/*space*/ || keyIsDown(188) /*comma*/){
            switch (selector){
                case 0:
                    window.mode='local'
                    initLocal()
                    break
                case 1:
                    window.mode = 'online'
                    initOnline()
                    break
                case 2:
                    window.mode = 'bot'
                    initLocal()
                    break
                case 3:
                    window.mode = '2bot'
                    initLocal()
                    break
            }
        }
        // if (keyIsDown(LEFT_ARROW)){
        //     window.mode = 'local'
        //     initLocal()
        // }else if (keyIsDown(RIGHT_ARROW)){
        //     window.mode = 'online'
        //     initOnline()
        // }else if (keyIsDown(UP_ARROW)){
        //     window.mode = 'bot'
        //     initLocal()
        // }else if (keyIsDown(DOWN_ARROW)){
        //     window.mode = '2bot'
        //     initLocal()
        // }

    }else{
        push()
        scale(zoom)
        if (window.mode == 'local'){
            cx = ((p1.x+p2.x)/2)-(360 * (1/zoom))
            cy = ((p1.y+p2.y)/2)-(320 * (1/zoom))

            cx += ecx
            cy += ecy

            d = Math.sqrt((p1.x-p2.x)**2 + (p1.y-p2.y)**2)
            if (d > 600){
                zoom = (600/d)
            }else{
                zoom = 1
            }
            //console.log(window.mode)
            fill('black')
            p1.draw()
            p2.draw()
            fill('black')
            for (let platform of platforms){
                rect(platform.x-cx,platform.y-cy,platform.w,platform.h)
            }
        }else{
            if (!window.connectedServer){
                serverInput.show()
                serverButton.show()
                text('Type the server ID (will be created if new)',
                    100,100,600,400)
                serverButton.mousePressed(()=>{
                    window.connectedServer =serverInput.value()
                    window.joinServer()
                })
            }else{
                if (window.joined){
                    if (window.serverData.p2Available == false){
                        if (!p1){
                            p1=new Criminal(100,0,188,LEFT_ARROW,RIGHT_ARROW,UP_ARROW,1,DOWN_ARROW,false,190)
                            p2=new Criminal(300,0,'F'.charCodeAt(0),'A'.charCodeAt(0),'D'.charCodeAt(0),'W'.charCodeAt(0),2,'S'.charCodeAt(0),false,'G'.charCodeAt(0))                        
                        }
                        cx = ((p1.x+p2.x)/2)-(360 * (1/zoom))
                        cy = ((p1.y+p2.y)/2)-(320 * (1/zoom))
                        cx += ecx
                        cy += ecy
                        
                        d = Math.sqrt((p1.x-p2.x)**2 + (p1.y-p2.y)**2)
                        if (d > 600){
                            zoom = (600/d)
                        }else{
                            zoom = 1
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
    if (gameOver){
        reset()
        gameOver = false
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
    // if (window.mode == 'online' && !window.connectedServer){
    //     window.connectedServer = keyCode
    //     window.joinServer()
    // }
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