class Criminal extends GenericFighter{
    constructor(x,y){
        super(x,y,5,100,0.02)
        this.w=125
        this.h=125

        this.hitboxOffset={
            x:40,
            y:20,
            w:35,
            h:65
        }

        this.flipOffset = 10

        this.anims = {
            'idle':{
                0:{img:'crimidle1'},
                15:{img:'crimidle2'},
                30:{img:'crimidle3'},
                45:{img:'crimidle4',callback:()=>{this.animOver()}},

            }
        }
    }
    draw(){
        super.draw()
        fill(0,0)
        rect(this.x+this.hitboxOffset.x,this.y+this.hitboxOffset.y,this.hitboxOffset.w,this.hitboxOffset.h)
    }
}