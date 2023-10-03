class GenericFighter{
    constructor(x,y,accel,maxspeed,mass,atkkeycode,leftkeycode,rightkeycode,jumpkeycode,pnumber,jumpheight,downkeycode){
        this.pnumber=pnumber

        this.kbmultiplier = 20

        this.iframe = false
        this.lif = 0

        this.jumpheight = jumpheight

        this.x=x
        this.y=y
        this.velX = 0
        this.velY = 0
        this.accel=accel
        this.maxspeed=maxspeed
        this.gaccel=mass
        this.g=0

        this.currentAnim = 'idle'
        this.currentFrame = 0
        this.busy=false

        this.dbdelay = 0

        this.anims = {}

        this.facing = 'right'

        this.atkkeycode = atkkeycode
        this.leftkeycode = leftkeycode
        this.rightkeycode = rightkeycode
        this.jumpkeycode = jumpkeycode
        this.downkeycode = downkeycode

        this.lastkey

        this.cimg

        this.atkheldlast = false
        this.latk = 0
        this.cf = 0

        this.doublejumps = 0
        this.maxdoublejumps = 1
    
        this.jumpheldlast = false

        this.inputs={}
    }
    handleInputs(){
        let i=this.inputs
        if (window.mode=='local'){
            i.left = keyIsDown(this.leftkeycode)
            i.right = keyIsDown(this.rightkeycode)
            i.jump = keyIsDown(this.jumpkeycode)
            i.down = keyIsDown(this.downkeycode)
            i.atk = keyIsDown(this.atkkeycode)
            if (keyCode != this.atkkeycode){
                i.lastkey = keyCode
            }
            this.inputs = i
        }else{
            if (this.pnumber == window.pn){
                i.left = keyIsDown(this.leftkeycode)
                i.right = keyIsDown(this.rightkeycode)
                i.jump = keyIsDown(this.jumpkeycode)
                i.down = keyIsDown(this.downkeycode)
                i.atk = keyIsDown(this.atkkeycode)
                if (keyCode != this.atkkeycode){
                    i.lastkey = keyCode
                }
                if (window.pn==1){
                    window.inputs1 = i
                }else{
                    window.inputs2 = i
                }
            }else{
                if (window.pn==1){
                    i=window.inputs2
                    console.log(this.pnumber,i)
                    this.inputs = i
                }else{
                    i=window.inputs1
                    this.inputs = i
                }
            }
        }
    }
    draw(){
        this.handleInputs()
        fill('black')
        if (this.pnumber == 1){
            textSize(32)
            text('Player 1: '+(this.kbmultiplier-20).toString(),100,100)
            textSize(16)
            text('1',this.x-10+this.w/2,this.y+10)
        }else{
            textSize(32)
            text('Player 2: '+(this.kbmultiplier-20).toString(),400,100)
            textSize(16)
            text('2',this.x-10+this.w/2,this.y+10)
        }
        this.cf+=1

        this.x+=this.velX
        this.y+=this.velY
        let collidingPlat
        for (let platform of platforms){
            this.onFloor = collideRectRect(this.x+this.hitboxOffset.x,this.y+this.hitboxOffset.y+this.hitboxOffset.h-1,this.hitboxOffset.w,1,platform.x,platform.y,platform.w,platform.h)
            if (this.onFloor){
                if (this.velY<0){
                    this.onFloor = false
                    break
                }
                collidingPlat = platform
                break
            }
        }
        if (this.onFloor){
            this.y = collidingPlat.y-this.hitboxOffset.h-this.hitboxOffset.y
        }

        if (this.velX<0){
            this.velX+=this.accel
            if (this.velX>0){
                this.velX=0
            }
        }
        if (this.velX>0){
            this.velX-=this.accel
            if (this.velX < 0){
                this.velX = 0
            }
        }
        //if (this.velY<0){this.velY+=this.accel}
        //if (this.velY>0){this.velY-=this.accel}

        if (this.inputs.left){
            if (!this.busy){
                this.facing = 'left'
                if (this.velX > -this.maxspeed){
                    this.velX -= this.accel
                }
                if (this.currentAnim != 'run'){
                    //run animation... when duncan finishes it
                }
            }
        }
        if (this.inputs.right){
            if (!this.busy){
                this.facing = 'right'
                if (this.velX<this.maxspeed){
                    this.velX+=this.accel
                }    
            }
        }

        //rect(this.x,this.y+this.h-1,this.w,1)
        if (this.onFloor){
            this.doublejumps = 0
            this.g = 0
            this.velY = 0
            if (this.inputs.jump){
                if (!this.busy && !this.jumpheldlast){
                    this.velY -= this.jumpheight
                }
                this.jumpheldlast=true
            }else{
                this.jumpheldlast=false
            }
        }else{
            this.g += this.gaccel
            this.velY += this.g

            if (this.inputs.jump){
                if (!this.busy && !this.jumpheldlast){
                    if (this.doublejumps < this.maxdoublejumps){
                        this.g=0
                        this.velY=0
                        this.doublejumps += 1
                        this.velY -= this.jumpheight
                    }
                }
                this.jumpheldlast=true

            }else{
                this.jumpheldlast=false
            }
        }

        //comma attack
        if (this.inputs.atk){
            if (!this.atkheldlast){
                this.atkheldlast = true
                //initiate attack

                let hDown = this.inputs.left || this.inputs.right
                let hRecent = this.inputs.lastkey == this.leftkeycode || this.inputs.lastkey == this.rightkeycode
                let vDown = this.inputs.jump || this.inputs.down
                let vRecent = this.inputs.lastkey == this.jumpkeycode || this.inputs.lastkey == this.downkeycode

                if (hDown && !vDown){
                    hRecent = true
                    vRecent = false
                }else if (vDown && !hDown){
                    hRecent = false
                    vRecent = true
                }

                if ((hDown) && (hRecent)){
                    //left or right is held down and is most recent
                    //horizontal forward attack
                    if (!this.busy && this.cf > this.latk+this.dbdelay){
                        this.currentAnim = 'forwardattack'
                        this.busy = true
                        this.currentFrame=0
                    }
                }else if ((vDown) && (vRecent)){
                    //up or down is held down and is most recent
                    if (!this.busy && this.cf > this.latk+this.dbdelay){
                        if (this.inputs.jump){
                            //up attack
                            if (!this.onFloor){
                                this.currentAnim = 'upattack'
                            }else{
                                this.currentAnim = 'neutralattack'
                            }
                        }else{
                            if (!this.onFloor){
                                this.currentAnim = 'downattack'
                            }else{
                                this.currentAnim = 'neutralattack'
                            }
                        }
                        this.busy = true
                        this.currentFrame = 0
                    }
                } 
                else
                {
                    if (!this.busy && this.cf > this.latk+this.dbdelay){
                        this.currentAnim = 'neutralattack'
                        this.busy = true
                        this.currentFrame = 0
                    }
                }
    
            }
        }else{
            this.atkheldlast = false
        }
        this.frame()
        if (window.mode == 'online'){
            if (this.pnumber == window.pn){
                //client
                if (this.pnumber==1){
                    window.pos1 = {x:this.x,y:this.y}
                }else{
                    window.pos2 = {x:this.x,y:this.y}
                }
            }else{
                //other player
                if (this.pnumber == 1){
                    this.x = window.pos1.x
                    this.y = window.pos1.y
                }else{
                    this.x = window.pos2.x
                    this.y = window.pos2.y
                }
            }
            if (this.pnumber == 1){
                console.log('2: ',window.pos2.x,window.pos2.y)
            }else{
                console.log('1: ',window.pos1.x,window.pos1.y)
            }
    
        }
        if (this.iframe){
            if (this.lif < this.cf){
                this.iframe = false
            }
        }
    }
    animOver(){
        if (this.busy){
            this.latk = this.cf
        }

        this.currentFrame=-1
        this.currentAnim = 'idle'
    }
    frame(){
        if (this.currentFrame in this.anims[this.currentAnim]){
            this.f = this.anims[this.currentAnim][this.currentFrame]
            this.cimg = this.f.img
            if ('callback' in this.f){
                this.f.callback()
            }    
        }

        if (this.facing=='right'){
            image(frameImages[this.cimg],this.x,this.y,this.w,this.h)    
        }else{
            push()
            translate(this.x+this.w,this.y)
            scale(-1,1)
            image(frameImages[this.cimg],this.flipOffset,0,this.w,this.h)
            pop()
        }
        //hitbox debug only
        if ('callback' in this.f && this.f.repeatCall){
            this.f.callback()
        }

        this.currentFrame+=1

    }
    atkHitbox(hitbox){
        //fill('red')
        //rect(hitbox.x,hitbox.y,hitbox.w,hitbox.h)
        let op
        if (this.pnumber==1){
            op=p2
        }else{
            op=p1
        }
        if (collideRectRect(hitbox.x,hitbox.y,hitbox.w,hitbox.h,op.x+op.hitboxOffset.x,op.y+op.hitboxOffset.y,op.hitboxOffset.w,op.hitboxOffset.h)){
            if (!op.iframe){
                op.kbmultiplier += hitbox.kb
                if (this.x <= op.x){
                    op.velX += 10 * (op.kbmultiplier/100)
                }else{
                    op.velX -= 10 * (op.kbmultiplier/100)
                }
                op.velY -= 2 * (op.kbmultiplier/100)
                op.iframe = true
                op.lif = this.cf
            }
        }
    }
}