class BoxMan extends GenericFighter{
    constructor(x,y,accel,maxspeed){
        super(x,y,accel,maxspeed)
    }
    draw(){
        super.draw()
        rect(x,y,10,10)
    }
}