
let frameImages = {}
let flippedImages = {}

function preload(){
    let images = [
        {'name':'crimidle1','path':'images/crim/idle/sprite_0.png'},
        {'name':'crimidle2','path':'images/crim/idle/sprite_1.png'},
        {'name':'crimidle3','path':'images/crim/idle/sprite_2.png'},
        {'name':'crimidle4','path':'images/crim/idle/sprite_3.png'}
    ]
    for (let img of images){
        let i = loadImage(img.path)
        frameImages[img.name] = i
    }
}