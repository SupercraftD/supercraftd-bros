class GenericFighter{
    constructor(x,y,accel,maxspeed){
        this.x=x
        this.y=y
        this.velX = 0
        this.velY = 0
        this.accel=accel
        this.maxspeed=maxspeed
        this.gaccel=0.02
        this.g=0
    }
    draw(){
        this.x+=this.velX
        this.y+=this.velY

        if (this.velX<0){this.velX+=this.accel}
        if (this.velX>0){this.velX-=this.accel}
        //if (this.velY<0){this.velY+=this.accel}
        //if (this.velY>0){this.velY-=this.accel}

        if (keyIsDown(LEFT_ARROW)){
            if (this.velX > -this.maxspeed){
                this.velX -= this.accel
            }
        }
        if (keyIsDown(RIGHT_ARROW)){
            if (this.velX<this.maxspeed){
                this.velX+=this.accel
            }
        }

        this.onFloor = collideRectRect(this.x,this.y+this.h-1,this.w,5,platform.x,platform.y,platform.w,platform.h)
        rect(this.x,this.y+this.h-1,this.w,1)
        if (this.onFloor){
            this.g = 0
            this.velY = 0
            if (keyIsDown(" ".charCodeAt(0))){
                this.velY -= 10
            }
        }else{
            this.g += this.gaccel
            this.velY += this.g
        }
        
    }
}