class GenericFighter{
    constructor(x,y,accel,maxspeed){
        this.x=x
        this.y=y
        this.velX = 0
        this.velY = 0
        this.accel=accel
        this.maxspeed=maxspeed
    }
    draw(){
        this.x+=this.velX
        this.y+=this.velY

        if (this.velX<0){this.velX+=accel}
        if (this.velX>0){this.velX-=accel}
        if (this.velY<0){this.velY+=accel}
        if (this.velY>0){this.velY-=accel}

        if (keyIsDown(LEFT_ARROW)){
            if (this.velX > -this.maxspeed){
                this.velX -= accel
            }
        }
        if (keyIsDown(RIGHT_ARROW)){
            if (this.velX<this.maxspeed){
                this.velX+=accel
            }
        }
    }
}