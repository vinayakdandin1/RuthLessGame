let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')
canvas.style.border = '2px solid black'
let intervalID = 0
let score = 0

// For Charecter

let charecter = document.createElement('img')
charecter.src = './images/character.png' 

let spriteWidth = 200; 
let spriteHeight = 55; 

let rows = 2; 
let cols = 8; 

let width = spriteWidth/cols; 
let height = spriteHeight/rows; 

let curFrame = 0; 
let frameCount = 8; 

let x=20;
let y=62; 

let srcX; 
let srcY;

//For Clouds

let clouds = [{x:canvas.width +5 , y: 10}]
let clouds1 = [{x:canvas.width + 10, y: 12}]
let cloudDecrement = 5;

// Creating Images
let backImg = document.createElement('img')
backImg.src = './images/blue.png'

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

let cloudImg = document.createElement('img')
cloudImg.src = './images/clouds2.png'

let cloudImg1 = document.createElement('img')
cloudImg1.src = './images/clouds3.png'

// Functions for the character / player  

function updateFrame(){
    curFrame = ++curFrame % frameCount; 
    srcX = curFrame * width; 
    srcY = 0;
    ctx.clearRect(x,y,width,height); 
}
    
function drawPlayer(){
    updateFrame();
    ctx.drawImage(charecter,srcX,srcY,width,height,x,y,width,height);
}

// Functions for Clouds

function newCloud() {
    for(let i=0; i< clouds.length; i++) {
          
        ctx.drawImage(cloudImg, clouds[i].x, 10)
        
        // make the cloud move towards the left on the x axis
        clouds[i].x -= cloudDecrement
        // check if a cloud has reached a certain position
        if (clouds[i].x == 50) {

            //add a new cloud
            clouds.push({
                x: canvas.width+20,
                y: 10
            })
        }
} 
}

function newCloud1() {
    for(let j=0; j< clouds1.length; j++) {
        ctx.drawImage(cloudImg1, clouds1[j].x, 15)
        // make the cloud move towards the left on the x axis
        clouds1[j].x -= 10
        // check if a cloud has reached a certain position
        // console.log(clouds1[j].x);
        if (clouds1[j].x == 60) {

            let randomCloud = Math.floor(Math.random() *5 )

            console.log(randomCloud);
            //add a new cloud          

            if(randomCloud < 3) {
                //add a new cloud
                clouds1.push({
                x: canvas.width+20,
                y: 15
            })
            } else {
                console.log("No cloud");
                clouds1.push({
                    x: canvas.width+150,
                    y: 15
                }) 
            }
        } 
    }
}

function main(){
    ctx.drawImage(backImg, 0, 0, canvas.width, canvas.height)
    ctx.drawImage(foreImg, 0, 90, canvas.width, canvas.height/3)
    drawPlayer();
    newCloud()
    newCloud1()
} 

//Interval for game progress

// intervalID = setInterval(() => {
//    requestAnimationFrame(main)
// }, 100)