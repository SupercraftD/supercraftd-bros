class Criminal extends GenericFighter{
    constructor(x,y,atkkeycode,leftkeycode,rightkeycode,jumpkeycode,pn,downkeycode,bot,specialkeycode){
        super(x,y,5,100,0.03,atkkeycode,leftkeycode,rightkeycode,jumpkeycode,pn,8,downkeycode,bot,specialkeycode)
        this.w=125
        this.h=125

        this.ghosts = []

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
                xdriftamount:3,
                0:{img:'crimfa1',repeatCall:true, callback:()=>{
                    let righthb = {
                        x:this.x+this.hitboxOffset.x+this.hitboxOffset.w+5,
                        y:this.y+this.hitboxOffset.y+20,
                        w:20,
                        h:20,
                        kb:6

                    }
                    let lefthb = {
                        x:this.x+this.hitboxOffset.x-this.hitboxOffset.w-5,
                        y:this.y+this.hitboxOffset.y+20,
                        w:20,
                        h:20,
                        kb:6

                    }

                    this.atkHitbox(this.facing=='right'?righthb:lefthb)
                    this.velX += this.facing=='right'?this.anims['forwardattack'].xdriftamount:-this.anims['forwardattack'].xdriftamount
                }},
                8:{img:'crimfa2',repeatCall:true, callback:()=>{
                    let righthb = {
                        x:this.x+this.hitboxOffset.x+this.hitboxOffset.w+5,
                        y:this.y+5,
                        w:20,
                        h:40,
                        kb:6

                    }
                    let lefthb = {
                        x:this.x+this.hitboxOffset.x-this.hitboxOffset.w,
                        y:this.y+5,
                        w:20,
                        h:40,
                        kb:6

                    }

                    this.atkHitbox(this.facing=='right'?righthb:lefthb)
                    this.velX += this.facing=='right'?this.anims['forwardattack'].xdriftamount:-this.anims['forwardattack'].xdriftamount

                }},
                16:{img:'crimfa3',repeatCall:true, callback:()=>{
                    let righthb = {
                        x:this.x+this.hitboxOffset.x+this.hitboxOffset.w+5,
                        y:this.y+this.hitboxOffset.y+(this.hitboxOffset.h/2)-5,
                        w:40,
                        h:20,
                        kb:6

                    }
                    let lefthb = {
                        x:this.x+this.hitboxOffset.x-this.hitboxOffset.w-30,
                        y:this.y+this.hitboxOffset.y+(this.hitboxOffset.h/2)-5,
                        w:40,
                        h:20,
                        kb:6

                    }

                    this.atkHitbox(this.facing=='right'?righthb:lefthb)
                    this.velX += this.facing=='right'?this.anims['forwardattack'].xdriftamount:-this.anims['forwardattack'].xdriftamount

                }},
                24:{img:'crimfa4',repeatCall:true,callback:()=>{

                    let righthb = {
                        x:this.x+this.hitboxOffset.x+this.hitboxOffset.w+5,
                        y:this.y+this.hitboxOffset.y+this.hitboxOffset.h,
                        w:20,
                        h:40,
                        kb:6
                    }
                    let lefthb = {
                        x:this.x+this.hitboxOffset.x-this.hitboxOffset.w+10,
                        y:this.y+this.hitboxOffset.y+this.hitboxOffset.h,
                        w:20,
                        h:40,
                        kb:6
                    }

                    this.atkHitbox(this.facing=='right'?righthb:lefthb)
                    this.velX += this.facing=='right'? this.anims['forwardattack'].xdriftamount:-this.anims['forwardattack'].xdriftamount

                    
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
            },
            'upattack':{
                0:{img:'crimup1',callback:()=>{
                    this.airdrift = true
                    this.velY = -15
                    this.g = 0
                }},
                
                4:{img:'crimup2'},
                8:{img:'crimup3',callback:()=>{
                    let righthb = {
                        x:this.x+this.hitboxOffset.x+this.hitboxOffset.w+2,
                        y:this.y+this.hitboxOffset.h/2,
                        w:15,
                        h:50,
                        kb:5
                    }
                    let lefthb = {
                        x:this.x+this.hitboxOffset.w-10,
                        y:this.y+this.hitboxOffset.h/2,
                        w:15,
                        h:50,
                        kb:5
                    }

                    this.atkHitbox(this.facing == 'right' ? righthb : lefthb)
                }},
                12:{img:'crimup4',callback:()=>{
                    let righthb = {
                        x:this.x+this.hitboxOffset.w,
                        y:this.y-5+this.hitboxOffset.h/2,
                        w:50,
                        h:15,
                        kb:5
                    }
                    let lefthb = {
                        x:this.x+this.hitboxOffset.w-5,
                        y:this.y-5+this.hitboxOffset.h/2,
                        w:50,
                        h:15,
                        kb:5
                    }

                    this.atkHitbox(this.facing == 'right' ? righthb : lefthb)

                }},
                16:{img:'crimup5',callback:()=>{
                    let lefthb = {
                        x:this.x+this.hitboxOffset.x+this.hitboxOffset.w-8,
                        y:this.y+this.hitboxOffset.h/2,
                        w:15,
                        h:50,
                        kb:5
                    }
                    let righthb = {
                        x:this.x+this.hitboxOffset.w,
                        y:this.y+this.hitboxOffset.h/2,
                        w:15,
                        h:50,
                        kb:5
                    }
                    this.atkHitbox(this.facing == 'right' ? righthb : lefthb)

                }},
                20:{img:'crimup6',callback:()=>{
                    let righthb = {
                        x:this.x+this.hitboxOffset.w,
                        y:this.y-5+this.hitboxOffset.h+20,
                        w:50,
                        h:15,
                        kb:5
                    }
                    let lefthb = {
                        x:this.x+this.hitboxOffset.w-5,
                        y:this.y-5+this.hitboxOffset.h+20,
                        w:50,
                        h:15,
                        kb:5
                    }

                    this.atkHitbox(this.facing == 'right' ? righthb : lefthb)

                }},
                24:{img:'crimup7',callback:()=>{
                    let righthb = {
                        x:this.x+this.hitboxOffset.x+this.hitboxOffset.w+2,
                        y:this.y+this.hitboxOffset.h/2,
                        w:15,
                        h:50,
                        kb:5
                    }
                    let lefthb = {
                        x:this.x+this.hitboxOffset.w-10,
                        y:this.y+this.hitboxOffset.h/2,
                        w:15,
                        h:50,
                        kb:5
                    }

                    this.atkHitbox(this.facing == 'right' ? righthb : lefthb)

                }},
                28:{img:'crimup8',callback:()=>{
                    let righthb = {
                        x:this.x+this.hitboxOffset.w,
                        y:this.y-5+this.hitboxOffset.h/2,
                        w:50,
                        h:15,
                        kb:5
                    }
                    let lefthb = {
                        x:this.x+this.hitboxOffset.w-5,
                        y:this.y-5+this.hitboxOffset.h/2,
                        w:50,
                        h:15,
                        kb:5
                    }

                    this.atkHitbox(this.facing == 'right' ? righthb : lefthb)

                }},
                32:{img:'crimup9',callback:()=>{
                    let righthb = {
                        x:this.x+this.hitboxOffset.w,
                        y:this.y-5+this.hitboxOffset.h+20,
                        w:50,
                        h:15,
                        kb:5
                    }
                    let lefthb = {
                        x:this.x+this.hitboxOffset.w-5,
                        y:this.y-5+this.hitboxOffset.h+20,
                        w:50,
                        h:15,
                        kb:5
                    }

                    this.atkHitbox(this.facing == 'right' ? righthb : lefthb)

                }},
                36:{img:'crimup10'},
                40:{img:'crimup11'},
                44:{img:'crimup12',callback:()=>{
                    this.dbdelay=4
                    this.airdrift = false
                    this.freefall = true
                    this.animOver()
                }},
            },
            'downattack':{
                0:{img:'crimdown1'},
                2:{img:'crimdown2'},
                3:{img:'crimdown3'},
                4:{img:'crimdown4'},
                5:{img:'crimdown5'},
                6:{img:'crimdown6'},
                7:{img:'crimdown7'},
                8:{img:'crimdown8'},
                9:{img:'crimdown9'},
                10:{img:'crimdown10'},
                12:{img:'crimdown11'},
                14:{img:'crimdown12'},
                16:{img:'crimdown13',repeatCall:true,callback:()=>{
                    let hb = {
                        x:this.x+15+this.hitboxOffset.w/2,
                        y:this.y+this.hitboxOffset.h,
                        w:40,
                        h:30,
                        kb:12
                    }
                    this.atkHitbox(hb)

                    this.velY += 1
                    this.velX = 0
                    if (this.onFloor){
                        this.dbdelay = 8
                        this.animOver()
                    }
                }},
                
            },
            'walk':{
                0:{img:'crimwalk1'},
                8:{img:'crimwalk2'},
                16:{img:'crimwalk3'},
                24:{img:'crimwalk4'},
                32:{img:'crimwalk4',callback:()=>{
                    this.animOver()
                }},
            },
            'special':{
                0:{img:'crimidle1',callback:()=>{
                    this.velY = 0
                    if (this.facing=='right'){
                        this.velX = 100
                    }else{
                        this.velX = -100
                    }
                }},
                1:{img:'crimidle1',repeatCall:true,callback:()=>{
                    this.ghosts.push({x:this.x,y:this.y,time:12,facing:this.facing})
                }},
                4:{img:'crimidle1',callback:()=>{
                    this.velX = 0
                    this.velY = 0
                }},
                16:{img:'crimidle1',callback:()=>{
                    this.animOver()
                }}
            }
        }
    }
    draw(){
        super.draw()
        fill(0,0)
        rect(this.x+this.hitboxOffset.x-cx,this.y+this.hitboxOffset.y-cy,this.hitboxOffset.w,this.hitboxOffset.h)
        for (let ghost of this.ghosts){
            tint(255,127 * (ghost.time/12))
            if (ghost.facing=='right'){
                image(frameImages.crimidle1,ghost.x-cx,ghost.y-cy,this.w,this.h)    
            }else{
                push()
                translate((ghost.x+this.w)-cx,ghost.y-cy)
                scale(-1,1)
                image(frameImages.crimidle1,this.flipOffset,0,this.w,this.h)    
                pop()
            }
                ghost.time -= 1
            if (ghost.time==0){
                this.ghosts.splice(this.ghosts.indexOf(ghost),1)
            }
        }
    }
}