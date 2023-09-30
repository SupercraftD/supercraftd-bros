
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
        {'name':'crimup1','path':'images/crim/upattack/sprite_00.png'},
        {'name':'crimup2','path':'images/crim/upattack/sprite_01.png'},
        {'name':'crimup3','path':'images/crim/upattack/sprite_02.png'},
        {'name':'crimup4','path':'images/crim/upattack/sprite_03.png'},
        {'name':'crimup5','path':'images/crim/upattack/sprite_04.png'},
        {'name':'crimup6','path':'images/crim/upattack/sprite_05.png'},
        {'name':'crimup7','path':'images/crim/upattack/sprite_06.png'},
        {'name':'crimup8','path':'images/crim/upattack/sprite_07.png'},
        {'name':'crimup9','path':'images/crim/upattack/sprite_08.png'},
        {'name':'crimup10','path':'images/crim/upattack/sprite_09.png'},
        {'name':'crimup11','path':'images/crim/upattack/sprite_10.png'},
        {'name':'crimup12','path':'images/crim/upattack/sprite_11.png'},
        {'name':'crimdown1','path':'images/crim/downattack/sprite_00.png'},
        {'name':'crimdown2','path':'images/crim/downattack/sprite_01.png'},
        {'name':'crimdown3','path':'images/crim/downattack/sprite_02.png'},
        {'name':'crimdown4','path':'images/crim/downattack/sprite_03.png'},
        {'name':'crimdown5','path':'images/crim/downattack/sprite_04.png'},
        {'name':'crimdown6','path':'images/crim/downattack/sprite_05.png'},
        {'name':'crimdown7','path':'images/crim/downattack/sprite_06.png'},
        {'name':'crimdown8','path':'images/crim/downattack/sprite_07.png'},
        {'name':'crimdown9','path':'images/crim/downattack/sprite_08.png'},
        {'name':'crimdown10','path':'images/crim/downattack/sprite_09.png'},
        {'name':'crimdown11','path':'images/crim/downattack/sprite_10.png'},
        {'name':'crimdown12','path':'images/crim/downattack/sprite_11.png'},
        {'name':'crimdown13','path':'images/crim/downattack/sprite_12.png'},





        
    ]
    for (let img of images){
        let i = loadImage(img.path)
        frameImages[img.name] = i
    }
}