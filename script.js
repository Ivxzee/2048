var cells = [];
let test = "left"
let count = 0;
//fn je true, cislo neni u steny
//dir udava, kde je relativne umisteno dalsi cislo v danem smeru
var direction = {
    left: {
        fn: function(i) {return (i != 0 && i != 4 && i != 8 && i!=12)}, 
        dir: -1
    },
    right: {
        fn: function(i) {return (i != 3 && i != 7 && i != 11 && i!=15)},
        dir: 1
    },
    up: {
        fn: function(i) {return (i != 0 && i != 1 && i != 2 && i!=3)},
        dir: -4
    },
    down: {
        fn: function(i) {return (i != 12 && i != 13 && i != 14 && i!=15)}, 
        dir: 4
    },
}
//Zacatek hry
$(function(){
    $("#start").click(function(){
        if (tileCount() == 0){
            $(this).text("restart") 
            addRandomTile(1);
            addRandomTile(1);
        } else {
            $(this).text("start game")
            $(".tile").each(function(){
                $(this).remove();
            });
            count = 0;
            $("#score").text("0");   
        }
    }); 
});
//Ovladani
$(document).keydown(function(e){
    console.log(e);
    switch(e.code){
        case "ArrowLeft":
        case "KeyA": moveEvent("left"); break;
        case "ArrowRight":
        case "KeyD": moveEvent("right"); break;
        case "ArrowUp":
        case "KeyW": moveEvent("up"); break;
        case "ArrowDown":
        case "KeyS": moveEvent("down"); break;
    }
});
//Pohyb cisel
function moveEvent(moveDir){
    let d = direction[moveDir].dir;
    //Opakuj x3
    for(let j = 0; j<3; j++){
        $(".tile").each(function(){       
              
            let index = $(this).parent().index()
            //Pokud se nehybe bunka do steny
            if (direction[moveDir].fn(index)){
                //Dalsi karta v danem smeru  
                let otherTileParent = $(".cell").eq(index+d);
                //Dalsi cislo v danem smeru
                let otherTile = otherTileParent.find(".tile")
                 if (otherTileParent.html() == ''){
                    //Premisteni na dalsi kartu
                    let temp = $(this).clone();
                    $(this).remove();
                    $(temp).appendTo(/*findNextEmpty(index)*/otherTileParent);
                }
            }
        })
    }
    //Spojeni cisel
    $(".tile").each(function(){
        let index = $(this).parent().index()
        let otherTileParent = $(".cell").eq(index+d);
        // pokud jsou obě čísla stejné
        if (otherTileParent.text() == $(this).text()){
            //a+b
            let num = parseInt(otherTileParent.text())+parseInt($(this).text())
            let div = "<div class='tile' id=c"+num+">"+num+"</div>"
            count+=num;
            otherTileParent.html(div);
            $(this).remove()
            $("#score").text(count);
        }
    });
    addRandomTile(1);
}
function addRandomTile(i){
    //Pick random index of cell
    let random = Math.floor(Math.random()*17);
    //Pokud nahodne vybran bunka obsahuje cislo, volej tuto funkci znovu
    if (i < 16){
        if ($(".cell").eq(random).html() != ''){
            //Rekurze? Jaj :D
            addRandomTile(i+1);
        } else {
            $(".cell").eq(random).html("<div class='tile' id='c2'>2</div>")//Kaeta s cislem 2
        }
    }
}
let tileCount = () => {
    let b = 0;
    $(".tile").each(function(){
        b++;
    });
    return b;
}