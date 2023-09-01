class BoxMan extends GenericFighter{
    constructor(x,y,accel,maxspeed){
        super(x,y,accel,maxspeed)
        this.w=50
        this.h=50
    }
    draw(){
        super.draw()
        fill(this.onFloor ? 'green' : 'red')
        rect(this.x,this.y,this.w,this.h)
    }
}