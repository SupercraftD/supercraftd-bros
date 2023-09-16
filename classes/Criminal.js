class Criminal extends GenericFighter{
    constructor(x,y,atkkeycode,leftkeycode,rightkeycode,jumpkeycode,pn){
        super(x,y,5,100,0.03,atkkeycode,leftkeycode,rightkeycode,jumpkeycode,pn,8)
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
                0:{img:'crimidle1',callback:()=>{this.busy = false}},
                15:{img:'crimidle2'},
                30:{img:'crimidle3'},
                45:{img:'crimidle4',callback:()=>{this.animOver()}},
            },
            'forwardattack':{
                0:{img:'crimfa1', callback:()=>{
                    let righthb = {
                        x:this.x+this.hitboxOffset.x+this.hitboxOffset.w+5,
                        y:this.y+this.hitboxOffset.y+20,
                        w:20,
                        h:20,
                        kb:9

                    }
                    let lefthb = {
                        x:this.x+this.hitboxOffset.x-this.hitboxOffset.w-5,
                        y:this.y+this.hitboxOffset.y+20,
                        w:20,
                        h:20,
                        kb:9

                    }

                    this.atkHitbox(this.facing=='right'?righthb:lefthb)
                }},
                8:{img:'crimfa2', callback:()=>{
                    let righthb = {
                        x:this.x+this.hitboxOffset.x+this.hitboxOffset.w+5,
                        y:this.y+5,
                        w:20,
                        h:40,
                        kb:9

                    }
                    let lefthb = {
                        x:this.x+this.hitboxOffset.x-this.hitboxOffset.w,
                        y:this.y+5,
                        w:20,
                        h:40,
                        kb:9

                    }

                    this.atkHitbox(this.facing=='right'?righthb:lefthb)

                }},
                16:{img:'crimfa3', callback:()=>{
                    let righthb = {
                        x:this.x+this.hitboxOffset.x+this.hitboxOffset.w+5,
                        y:this.y+this.hitboxOffset.y+(this.hitboxOffset.h/2)-5,
                        w:40,
                        h:20,
                        kb:9

                    }
                    let lefthb = {
                        x:this.x+this.hitboxOffset.x-this.hitboxOffset.w-30,
                        y:this.y+this.hitboxOffset.y+(this.hitboxOffset.h/2)-5,
                        w:40,
                        h:20,
                        kb:9

                    }

                    this.atkHitbox(this.facing=='right'?righthb:lefthb)
                }},
                24:{img:'crimfa4',callback:()=>{

                    let righthb = {
                        x:this.x+this.hitboxOffset.x+this.hitboxOffset.w+5,
                        y:this.y+this.hitboxOffset.y+this.hitboxOffset.h,
                        w:20,
                        h:40,
                        kb:9
                    }
                    let lefthb = {
                        x:this.x+this.hitboxOffset.x-this.hitboxOffset.w+10,
                        y:this.y+this.hitboxOffset.y+this.hitboxOffset.h,
                        w:20,
                        h:40,
                        kb:9
                    }

                    this.atkHitbox(this.facing=='right'?righthb:lefthb)

                    
                }},
                32:{img:'crimfa4',callback:()=>{
                    this.dbdelay=5
                    this.animOver()
                }}
            },
            'neutralattack':{
                0:{img:'crimna1'},
                4:{img:'crimna2',callback:()=>{
                    let righthb = {
                        x:this.x+this.hitboxOffset.x+this.hitboxOffset.w+2,
                        y:this.y,
                        w:15,
                        h:50,
                        kb:5

                    }
                    let lefthb = {
                        x:this.x+this.hitboxOffset.x-15,
                        y:this.y,
                        w:15,
                        h:50,
                        kb:5
                    }
                    this.atkHitbox(righthb)
                    this.atkHitbox(lefthb)
                }},
                8:{img:'crimna3'},
                12:{img:'crimna4',callback:()=>{
                    let righthb = {
                        x:this.x+this.hitboxOffset.x+this.hitboxOffset.w+5,
                        y:this.y+this.hitboxOffset.y+(this.hitboxOffset.h/2)-15,
                        w:35,
                        h:20,
                        kb:5
                    }
                    let lefthb = {
                        x:this.x,
                        y:this.y+this.hitboxOffset.y+(this.hitboxOffset.h/2)-15,
                        w:35,
                        h:20,
                        kb:5
                    }

                    this.atkHitbox(righthb)
                    this.atkHitbox(lefthb)
                }},
                16:{img:'crimna5',callback:()=>{
                    let righthb = {
                        x:this.x+this.hitboxOffset.x+this.hitboxOffset.w+2,
                        y:this.y+this.hitboxOffset.y+(this.hitboxOffset.h/2),
                        w:15,
                        h:50,
                        kb:5

                    }
                    let lefthb = {
                        x:this.x+this.hitboxOffset.x-15,
                        y:this.y+this.hitboxOffset.y+(this.hitboxOffset.h/2),
                        w:15,
                        h:50,
                        kb:5
                    }

                    this.atkHitbox(righthb)
                    this.atkHitbox(lefthb)

                }},
                20:{img:'crimna6'},
                24:{img:'crimna7',callback:()=>{
                    let righthb = {
                        x:this.x+this.hitboxOffset.x+this.hitboxOffset.w+5,
                        y:this.y+this.hitboxOffset.y+(this.hitboxOffset.h/2)-15,
                        w:35,
                        h:20,
                        kb:5
                    }
                    let lefthb = {
                        x:this.x,
                        y:this.y+this.hitboxOffset.y+(this.hitboxOffset.h/2)-15,
                        w:35,
                        h:20,
                        kb:5
                    }

                    this.atkHitbox(righthb)
                    this.atkHitbox(lefthb)
                }},
                28:{img:'crimna8',callback:()=>{
                    let righthb = {
                        x:this.x+this.hitboxOffset.x+this.hitboxOffset.w+2,
                        y:this.y,
                        w:15,
                        h:50,
                        kb:5

                    }
                    let lefthb = {
                        x:this.x+this.hitboxOffset.x-15,
                        y:this.y,
                        w:15,
                        h:50,
                        kb:5
                    }
                    this.atkHitbox(righthb)
                    this.atkHitbox(lefthb)
                }},
                32:{img:'crimna8',callback:()=>{
                    this.dbdelay = 4
                    this.animOver()
                }}
            }
        }
    }
    draw(){
        super.draw()
        fill(0,0)
        rect(this.x+this.hitboxOffset.x,this.y+this.hitboxOffset.y,this.hitboxOffset.w,this.hitboxOffset.h)
    }
}