let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')
canvas.style.border = '2px solid black'
let intervalID = 0
let score = 0

// Creating Images
let backImg = document.createElement('img')
backImg.src = './images/bg2.PNG'

let foreImg = document.createElement('img')
foreImg.src = './images/fg.PNG'

let treeImg = document.createElement('img')
treeImg.src = './images/trees.PNG'

let playerImg = document.createElement('img')
playerImg.src = './images/ply.gif'

let whiteImg = document.createElement('img')
whiteImg.src = './images/rab.png'

let redImg = document.createElement('img')
redImg.src = './images/mRed.png'

// Drawing the images

    

function main(){
    ctx.drawImage(backImg, 0, 0, canvas.width, canvas.height)
    ctx.drawImage(foreImg, 0, 90, canvas.width, canvas.height/3)

    
    ctx.drawImage(playerImg, 30, 65, playerImg.width/20, playerImg.height/30)

}






//Interval for game progress

// intervalID = setInterval(() => {
//    requestAnimationFrame(main)
// }, 15)