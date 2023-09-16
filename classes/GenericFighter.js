class GenericFighter{
    constructor(x,y,accel,maxspeed,mass,atkkeycode,leftkeycode,rightkeycode,jumpkeycode,pnumber,jumpheight){
        this.pnumber=pnumber

        this.kbmultiplier = 20

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

        this.cimg

        this.atkheldlast = false
        this.latk = 0
        this.cf = 0

        this.doublejumps = 0
        this.maxdoublejumps = 1
    
        this.jumpheldlast = false
    }
    draw(){
        fill('black')
        textSize(32)
        if (this.pnumber == 1){
            text('Player 1: '+(this.kbmultiplier-20).toString(),100,100)
        }else{
            text('Player 2: '+(this.kbmultiplier-20).toString(),400,100)
        }
        this.cf+=1

        this.x+=this.velX
        this.y+=this.velY

        this.onFloor = collideRectRect(this.x+this.hitboxOffset.x,this.y+this.hitboxOffset.y+this.hitboxOffset.h-1,this.hitboxOffset.w,1,platform.x,platform.y,platform.w,platform.h)
        if (this.onFloor){

            this.y = platform.y-this.hitboxOffset.h-this.hitboxOffset.y
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

        if (keyIsDown(this.leftkeycode)){
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
        if (keyIsDown(this.rightkeycode)){
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
            if (keyIsDown(this.jumpkeycode)){
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

            if (keyIsDown(this.jumpkeycode)){
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
        if (keyIsDown(this.atkkeycode)){
            if (!this.atkheldlast){
                this.atkheldlast = true
                if (keyIsDown(this.leftkeycode) || keyIsDown(this.rightkeycode)){
                    //horizontal forward attack
                    if (!this.busy && this.cf > this.latk+this.dbdelay){
                        this.currentAnim = 'forwardattack'
                        this.busy = true
                        this.currentFrame=0
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
        // if ('callback' in this.f){
        //     this.f.callback()
        // }

        this.currentFrame+=1

    }
    atkHitbox(hitbox){
        // fill('red')
        // rect(hitbox.x,hitbox.y,hitbox.w,hitbox.h)
        let op
        if (this.pnumber==1){
            op=p2
        }else{
            op=p1
        }
        if (collideRectRect(hitbox.x,hitbox.y,hitbox.w,hitbox.h,op.x+op.hitboxOffset.x,op.y+op.hitboxOffset.y,op.hitboxOffset.w,op.hitboxOffset.h)){
            op.kbmultiplier += hitbox.kb
            if (this.x <= op.x){
                op.velX += 20 * (op.kbmultiplier/100)
            }else{
                op.velX -= 20 * (op.kbmultiplier/100)
            }
            op.velY -= 5 * (op.kbmultiplier/100)

        }
    }
}