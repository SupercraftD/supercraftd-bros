class GenericFighter{
    constructor(x,y,accel,maxspeed,mass,atkkeycode,leftkeycode,rightkeycode,jumpkeycode,pnumber){
        this.pnumber=pnumber

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
    }
    draw(){
        this.cf+=1

        this.x+=this.velX
        this.y+=this.velY
        this.onFloor = collideRectRect(this.x+this.hitboxOffset.x,this.y+this.hitboxOffset.y+this.hitboxOffset.h-1,this.hitboxOffset.w,1,platform.x,platform.y,platform.w,platform.h)
        if (this.onFloor){

            this.y = platform.y-this.hitboxOffset.h-this.hitboxOffset.y
        }

        if (this.velX<0){this.velX+=this.accel}
        if (this.velX>0){this.velX-=this.accel}
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
            this.g = 0
            this.velY = 0
            if (keyIsDown(this.jumpkeycode)){
                if (!this.busy){
                    this.velY -= 10
                }
            }
        }else{
            this.g += this.gaccel
            this.velY += this.g
        }

        //comma attack
        if (keyIsDown(this.atkkeycode)){
            if (!this.atkheldlast){
                this.atkheldlast = true
                if (keyIsDown(this.leftkeycode) || keyIsDown(this.rightkeycode)){
                    //horizontal forward attack
                    if (!this.busy && this.cf > this.latk+5){
                        console.log(this.cf,this.latk)
                        this.currentAnim = 'forwardattack'
                        this.busy = true
                        this.currentFrame=0
                    }
                }
                else
                {
                    //neutral
                }
    
            }
        }else{
            this.atkheldlast = false
        }
        this.frame()
        
    }
    animOver(){
        if (this.currentAnim == 'forwardattack'){
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
        this.currentFrame+=1

    }
    atkHitbox(hitbox){
        let op
        if (this.pnumber==1){
            op=p2
        }else{
            op=p1
        }
        if (collideRectRect(hitbox.x,hitbox.y,hitbox.w,hitbox.h,op.x+op.hitboxOffset.x,op.y+op.hitboxOffset.y,op.hitboxOffset.w,op.hitboxOffset.h)){
            console.log(op,'hit')
            if (this.x <= op.x){
                op.velX += 20
            }else{
                op.velX -= 20
            }
            op.velY -= 5
        }
    }
}