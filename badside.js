(function(){
/*
FarmRPG: Badside
author:  JasimAlrawie
github:  https://github.com/JasimAlrawie
github reop: https://github.com/JasimAlrawie/farmrpg-badside
-----------------------------------------------------------
use it on your risk i'm not responsible if you get banned :)
-----------------------------------------------------------
*/
let 
autoFish = false,
autoExplore = false,
autoSell = false,
autoWorm = false,
autoIron = false

let 
fishLoop,
exploreLoop,
sellLoop,
wormLoop,
ironLoop

$("<div></div>")
.attr("id","badside")
.css({
    zIndex : "99999999",
    position : "fixed",
    bottom : "16px",
    left : "32px",
    display : "flex",
    flexDirection:"column",
    gap:"4px"
})
.appendTo("body")

function createBadButton(label,callback){
    $(`<button>${label}</button>`)
    .css({
        color : "white",
        background : "tomato",
        fontSize : "1.5em",
        border : "none",
        cursor : "pointer"
    })
    .click(callback)
    .appendTo("#badside")
}
createBadButton("Auto Fish",e=>{
    if(!location.href.includes("fishing.php"))
        return alert("you must be in a fishing area")
    autoFish = !autoFish
    e.target.style.background = autoFish? "lime" : "tomato"
    if(autoFish){ 
        fishLoop = setInterval(()=>{
        $(".row .fishcell .catch")?.click()
            setTimeout(()=>{
                $("body > div.picker-modal.picker-catch.modal-in > div.picker-modal-inner > div > div > div")?.click()
            },250)
        },500)
        //not recommended to change these
    }else{
        clearInterval(fishLoop)
    }
})

createBadButton("Auto Explore",e=>{
    if(!location.href.includes("area.php"))
        return alert("you must be in exploring area")
    autoExplore = !autoExplore
    e.target.style.background = autoExplore? "lime" : "tomato"
    if(autoExplore){
        exploreLoop =  setInterval(()=>{
            $("#exploreoptions > li:nth-child(1) > div")?.click()
        },700)
        //you can adjuect explore speed
        // clcik per 700ms
    }else{
        clearInterval(exploreLoop)
    }
})
createBadButton("Auto Sell All",e=>{
    autoSell = !autoSell
    e.target.style.background = autoSell? "lime" : "tomato"
    if(autoSell){
        sellLoop =  setInterval(()=>{
            fetch("https://farmrpg.com/worker.php?go=sellalluseritems")
        },60*1000)
        // you can adjust the sell time here
        // 60*1000 means each 60second
    }else{
        clearInterval(autoSell)
    }
})
createBadButton("Auto Worm",e=>{
    autoWorm = !autoWorm
    e.target.style.background = autoWorm? "lime" : "tomato"
    if(autoExplore){
        wormLoop =  setInterval(()=>{
            fetch("https://farmrpg.com/worker.php?go=buyitem&id=18&qty=25")
            // you can change the 25 to what you want
            // 25 worm per 60second
        },60*1000)
        // you can adjust the buy time here
        // 60*1000 means each 60second
    }else{
        clearInterval(wormLoop)
    }
})
createBadButton("Auto Iron",e=>{
    autoIron = !autoIron
    e.target.style.background = autoIron? "lime" : "tomato"
    if(autoIron){
        ironLoop =  setInterval(()=>{
            fetch("https://farmrpg.com/worker.php?go=buyitem&id=18&qty=25")
            // you can change the 25 to what you want
            // 25 worm per 60second
        },60*1000)
        // you can adjust the buy time here
        // 60*1000 means each 60second
    }else{
        clearInterval(ironLoop)
    }
})

createBadButton("Eject",()=>{
    $("#badside").remove()
})
})()
