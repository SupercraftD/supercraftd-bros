
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

        
    ]
    for (let img of images){
        let i = loadImage(img.path)
        frameImages[img.name] = i
    }
}