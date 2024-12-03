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
function delay(ms){
    return new Promise(res=>{setTimeout(res,ms)})
}

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
    gap:"4px",
    width : "200px",
    background : "peachpuff",
    padding : "4px",
    borderRadius : "4px"
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
function createBadInput(id,ph,type="number",value=10){
    $(`<input id="${id}" type="${type}" value=${value} placeholder="${ph}" min="0"/>`)
    .css({
        fontSize : "1.5em",
        border : "none",
        textAlign : "center"
    })
    .appendTo("#badside")
}
function badBreak(){
    $("<hr/>")
    .css({border:"2px solid white",width:"100%"})
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
badBreak()
createBadButton("Pet Cows",async (e)=>{
    const count = parseInt($("#badcows")[0].value)
    e.target.disabled = true
    for(let i=1;i<=count;i++){
        await delay(250)
        await fetch(`https://farmrpg.com/worker.php?go=petcow&num=${i}`)
        $(e.target).css({
            width : `${i/count*100}%`
        }).html(`${parseInt(i/count*100)}%`)
        console.log("pet")
    }
    e.target.disabled = false
    $(e.target).html("Pet Cows")
})
createBadInput("badcows","Cow Count")
badBreak()
createBadButton("Pet Chicken",async (e)=>{
    const count = parseInt($("#badchickens")[0].value)
    e.target.disabled = true
    for(let i=1;i<=count;i++){
        await delay(250)
        await fetch(`https://farmrpg.com/worker.php?go=petchicken&num=${i}`)
        $(e.target).css({
            width : `${i/count*100}%`
        }).html(`${parseInt(i/count*100)}%`)
    }
    e.target.disabled = false
    $(e.target).html("Pet Chicken")
})
createBadInput("badchickens","Chicken Count")
badBreak()
createBadButton("Eject",()=>{
    clearInterval(fishLoop)
    clearInterval(exploreLoop)
    clearInterval(autoSell)
    clearInterval(wormLoop)
    clearInterval(ironLoop)
    $("#badside").remove()
})
})()
