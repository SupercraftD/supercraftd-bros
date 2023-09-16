
let frameImages = {}
let flippedImages = {}

function preload(){
    let images = [
        {'name':'crimidle1','path':'images/crim/idle/sprite_0.png'},
        {'name':'crimidle2','path':'images/crim/idle/sprite_1.png'},
        {'name':'crimidle3','path':'images/crim/idle/sprite_2.png'},
        {'name':'crimidle4','path':'images/crim/idle/sprite_3.png'},
        {'name':'crimfa1','path':'images/crim/forwardattack/f0.gif'},
        {'name':'crimfa2','path':'images/crim/forwardattack/f1.gif'},
        {'name':'crimfa3','path':'images/crim/forwardattack/f2.gif'},
        {'name':'crimfa4','path':'images/crim/forwardattack/f3.gif'},
        {'name':'crimna1','path':'images/crim/neutralattack/sprite_0.png'},
        {'name':'crimna2','path':'images/crim/neutralattack/sprite_1.png'},
        {'name':'crimna3','path':'images/crim/neutralattack/sprite_2.png'},
        {'name':'crimna4','path':'images/crim/neutralattack/sprite_3.png'},
        {'name':'crimna5','path':'images/crim/neutralattack/sprite_4.png'},
        {'name':'crimna6','path':'images/crim/neutralattack/sprite_5.png'},
        {'name':'crimna7','path':'images/crim/neutralattack/sprite_6.png'},
        {'name':'crimna8','path':'images/crim/neutralattack/sprite_7.png'},




        
    ]
    for (let img of images){
        let i = loadImage(img.path)
        frameImages[img.name] = i
    }
}