class GenericFighter{
    constructor(x,y,accel,maxspeed,mass,atkkeycode,leftkeycode,rightkeycode,jumpkeycode,pnumber,jumpheight,downkeycode,bot,specialkeycode){
        this.pnumber=pnumber

        this.kbmultiplier = 20

        this.bot = bot

        this.iframe = 0

        this.jumpheight = jumpheight

        this.maxStock = 3
        this.stock = this.maxStock
    

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

        this.freefall = false

        this.dbdelay = 0

        this.anims = {}

        this.facing = 'right'

        this.atkkeycode = atkkeycode
        this.leftkeycode = leftkeycode
        this.rightkeycode = rightkeycode
        this.jumpkeycode = jumpkeycode
        this.downkeycode = downkeycode
        this.specialkeycode = specialkeycode

        this.lastkey

        this.cimg

        this.atkheldlast = false
        this.specialheldlast = false

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
            if (!this.bot){
                i.left = keyIsDown(this.leftkeycode)
                i.right = keyIsDown(this.rightkeycode)
                i.jump = keyIsDown(this.jumpkeycode)
                i.down = keyIsDown(this.downkeycode)
                i.atk = keyIsDown(this.atkkeycode)
                i.special = keyIsDown(this.specialkeycode)
                if (keyCode != this.atkkeycode && keyCode != this.specialkeycode){
                    i.lastkey = keyCode
                }
                this.inputs = i    
            }else{
                let op
                if (this.pnumber == 1){
                    op = p2
                }else{
                    op = p1
                }

                let dx = op.x-this.x
                let dy = op.y-this.y
                i.left = false
                i.right = false
                i.special = false
                //if really far away, only move in the direction
                if (dx < -100){
                    i.left = true
                    return
                }
                if (dx > 100){
                    i.right = true
                    return
                }

                if (dx < -10){
                    if (!(dy<-50) && !(dy>50)){
                        i.left = true
                    }
                }else if (dx > 10){
                    if (!(dy<-50) && !(dy>50)){
                        i.right = true
                    }
                }
                
                let canAttack = true
                if (i.atk){
                    i.atk = false
                    canAttack = false
                }
                if (i.down){
                    i.down = false
                }
                //console.log(dy)
                if (i.jump){
                    i.jump = false
                }else{
                    if (dy < -10 && this.velY >= 0 ){
                        i.jump = true
                    }
                }
                if (dy > 50){
                    i.down = true
                }    
                
                if (-10 <= dx <= 10){
                    if (canAttack){
                        if (dy < -50 && !i.jump){
                            i.atk = false
                        }else{
                            i.atk = true
                        }
                    }
                }

            }
        }else {
            if (this.pnumber == window.pn){
                i.left = keyIsDown(this.leftkeycode)
                i.right = keyIsDown(this.rightkeycode)
                i.jump = keyIsDown(this.jumpkeycode)
                i.down = keyIsDown(this.downkeycode)
                i.atk = keyIsDown(this.atkkeycode)
                i.special = keyIsDown(this.specialkeycode)
                if (keyCode != this.atkkeycode && keyCode != this.specialkeycode){
                    i.lastkey = keyCode
                }
                if (window.pn==1){
                    window.inputs1 = i
                    window.kb1 = this.kbmultiplier
                    window.facing1 = this.facing
                }else{
                    window.inputs2 = i
                    window.kb2 = this.kbmultiplier
                    window.facing2 = this.facing
                }
            }else{
                if (window.pn==1){
                    i=window.inputs2
                    console.log(this.pnumber,i)
                    this.inputs = i
                    this.facing = window.facing2
                    this.kbmultiplier = window.kb2
                }else{
                    i=window.inputs1
                    this.inputs = i
                    this.facing = window.facing1
                    this.kbmultiplier = window.kb1
                }
            }
        }
    }
    draw(){
        this.handleInputs()
        if (this.iframe > 0){
            this.iframe -= 1
        }
        fill('black')
        if (this.pnumber == 1){
            push()
            scale(1/zoom)
            textSize(32)
            text('Player 1: '+(this.kbmultiplier-20).toString(),100,100)
            for (let i=1;i<this.maxStock+1;i++){
                if (i <= this.stock){
                    fill('black')
                }else{
                    fill('white')
                }
                ellipse(100+(30*i),120,20,20)
            }
            pop()
            textSize(16)
            text('1',(this.x-10+this.w/2)-cx,this.y+10-cy)
        }else{
            push()
            scale(1/zoom)
            textSize(32)
            text('Player 2: '+(this.kbmultiplier-20).toString(),400,100)
            for (let i=1;i<this.maxStock+1;i++){
                if (i <= this.stock){
                    fill('black')
                }else{
                    fill('white')
                }
                ellipse(400+(30*i),120,20,20)
            }

            pop()
            textSize(16)
            text('2',(this.x-10+this.w/2)-cx,this.y+10-cy)
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
                if (this.currentAnim != 'walk'){
                    this.currentAnim = 'walk'
                    this.currentFrame = 0
                }
            }else{
                if (this.airdrift){
                    this.facing = 'left'
                    if (this.velX > -this.maxspeed){
                        this.velX -= this.accel/2
                    }
                }
            }
        }
        if (this.inputs.right){
            if (!this.busy){
                this.facing = 'right'
                if (this.velX<this.maxspeed){
                    this.velX+=this.accel
                }
                if (this.currentAnim != 'walk'){
                    this.currentAnim = 'walk'
                    this.currentFrame = 0
                }
            }else{
                if (this.airdrift){
                    this.facing = 'right'
                    if (this.velX < this.maxspeed){
                        this.velX += this.accel/2
                    }
                }
            }
        }
        if (!(this.inputs.left || this.inputs.right)){
            if (this.currentAnim == 'walk'){
                this.currentAnim = 'idle'
                this.currentFrame = 0
            }
        }

        //rect(this.x,this.y+this.h-1,this.w,1)
        if (this.onFloor){
            this.doublejumps = 0
            this.g = 0
            this.velY = 0
            this.freefall = false
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
            if (!this.atkheldlast && !this.freefall){
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
        if (this.inputs.special){
            if (!this.specialheldlast){
                this.specialheldlast = true
                if (!this.busy){
                    this.currentAnim = 'special'
                    this.currentFrame = 0
                    this.busy = true
                }
            }
        }else{
            this.specialheldlast = false
        }

        if (this.y > 2000){
            this.die()
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
    }
    animOver(){
        if (this.busy){
            this.latk = this.cf
        }

        this.currentFrame=-1
        this.currentAnim = 'idle'
    }
    frame(){
        tint(255,255)
        if (this.currentFrame in this.anims[this.currentAnim]){
            this.f = this.anims[this.currentAnim][this.currentFrame]
            this.cimg = this.f.img
            if ('callback' in this.f){
                this.f.callback()
            }    
        }
        if (this.facing=='right'){
            image(frameImages[this.cimg],this.x-cx,this.y-cy,this.w,this.h)    
        }else{
            push()
            translate((this.x+this.w)-cx,this.y-cy)
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
            if (op.iframe == 0){
                op.kbmultiplier += hitbox.kb
                if (this.x <= op.x){
                    op.velX = 10 * (op.kbmultiplier/100)
                }else{
                    op.velX = -10 * (op.kbmultiplier/100)
                }
                op.velY = -2 * (op.kbmultiplier/100)
                op.iframe = 5
            }
        }
    }
    die(){
        cameraShaking = true
        console.log('died')
        this.stock -= 1

        this.x = 200
        this.y = 0
        this.velX = 0
        this.velY = 0
        this.kbmultiplier = 20

        this.currentAnim = 'idle'
        this.currentFrame = 0
        this.busy = false

        if (this.stock <= 0){
            if (this.pnumber == 1){
                alert('p2 won')
            }else{
                alert('p1 won')
            }
            gameOver = true
        }
    }
}