let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')
canvas.style.border = '2px solid black'
let intervalID = 0
let score = 0
let uniqueID = 0;

//Position where the frame will be drawn
let x=0;
let y=60; 
let zomX;
let zomY;

let spriteWidth = 68; 
let spriteHeight = 30; 

//Coordinate of Sprite sheet from where we want to extract the image
let srcX; 
let srcY;
let srcZomX;
let srcZomY;

let row = 1; 
let frameCount = 3; 

let startBtn = document.querySelector('#start')
let overScreen = document.querySelector('#gameOver')

let scoreDisplay = document.querySelector('.finalScore')
let restartButton = document.querySelector('#gameOver button')

//Width of individual frame

let width = spriteWidth / frameCount; 
let height = spriteHeight / row; 
curFrame = 0;

let curZomFrame = 0;

//For Clouds

let clouds = [{x:canvas.width +5 , y: 8}]
let clouds1 = [{x:canvas.width + 10, y: 10}]
let cloudDecrement = 5;

// Creating Images

let charecter = document.createElement('img')
charecter.src = './images/char.png'  

let backImg = document.createElement('img')
backImg.src = './images/blue.png'

let desertImg = document.createElement('img')
desertImg.src = './images/desert.png'

let foreImg = document.createElement('img')
foreImg.src = './images/fg.PNG'

let zombieImage = document.createElement('img')
zombieImage.src = './images/zombie.png'

let cloudImg = document.createElement('img')
cloudImg.src = './images/clouds2.png'

let cloudImg1 = document.createElement('img')
cloudImg1.src = './images/clouds3.png'

let cherryImg = document.createElement('img')
cherryImg.src = './images/cherry.png'

let lollyPopImg = document.createElement('img')
lollyPopImg.src = './images/lollipopRed.png'

let gear = document.createElement('img')
gear.src = './images/gear.png'

// Variables For Rabbits

let zombieArray = [{x:canvas.width+230, y:60}];
let zombieDecrement = 10;
let girlArray = [{x: canvas.width+75, y: 60}]

// Functions for the character / player  

let gearX = x;
let gearY = y + 10;

let cherryX = canvas.width +10
let cherryDecrement = 15

// let gearArray = [{x:40 , y:65 }]
let gearIncrement = 20;
let showBullet = false;

// Event Listeners

let jumpIncrement = 35
let canJump = true

document.addEventListener('keydown', (event) => { 
    
    if (event.keyCode == 32 || event.key == " ") {
        
        if(y === 60 && canJump === true) {
            canJump = false
            y -= jumpIncrement   
            gearX = 0
            console.log(y);
        
            setTimeout(() => {
                 y += jumpIncrement
                 console.log(" + jump");
            }, 1000);
            
            setTimeout(() => {
                canJump = true
            }, 2000);
        }
    } 
})

// document.addEventListener('keyup', (event) => {
//     if (event.keyCode == 32 || event.key == " ") { 
        
//         if(y == 25) {
            
//             y += jumpIncrement
//             // if(y == 60) {
//             //     setTimeout(() => {
//             //         gearY += jumpIncrement
//             //     }, 1000);                         
//             // }
            
//         }
            
//     }
// })

let fruitsArray = [{x: cherryX, y: 40}]

function drawFruits() {
    let fruitsDecider = Math.floor(Math.random *7)
    if(fruitsDecider < 4) {
        ctx.drawImage(cherryImg, canvas.width - 20, 40)
    } else {
        ctx.drawImage(lollyPopImg, canvas.width - 40, 40)
    }
}
  
function drawGear() {
    if (showBullet) {
        if(y === 60) {
            ctx.drawImage(gear, gearX, gearY);
            gearX += gearIncrement 
        
            if(gearX == 320) {
                clearGear()
            }
        } else {
            clearGear()
        }
    }
}

function clearGear() {
    showBullet = false
    gearX = 0
}

function shootGear() {
    canvas.addEventListener('click', event => {
        showBullet = true       
    });
}

function updateFrame(){
    curFrame++
    curFrame = curFrame % frameCount; 
    srcX = curFrame * width; 
    srcY = 0;
    ctx.clearRect(x,y,width,height);
}

function updateZombFrame() {
    curZomFrame++
    curZomFrame = curZomFrame % frameCount;
    srcZomX = curZomFrame * width;
    srcZomY = 0;
    ctx.clearRect(zomX, zomY, width, height)
}
    
function drawPlayer(){
    updateFrame();
    drawGear()
    ctx.drawImage(charecter,srcX,srcY,width,height,x , y ,width,height);
}

function clearZombie(ind) {
        zombieArray.splice(ind - 2, 1)
        score++;    
}

function updateZombieArr() {
    zombieID = setInterval(() => {
        zombieArray.push({
            x: canvas.width + 300,
            y: 60
        })
        console.log(zombieArray);
    }, 4000);
}

function drawZombie() {
    for(let i = 0; i < zombieArray.length; i++) {
        updateZombFrame()
        ctx.drawImage(zombieImage, srcZomX, srcZomY, width, height, zombieArray[i].x, zombieArray[i].y, width, height)
        zombieArray[i].x -= zombieDecrement;
        // if (zombieArray[i].x == 350) {  
        //     zombieArray.push({
        //         x: canvas.width + 300,
        //         y: 60
        //     })
        // }
        
        if (zombieArray[i].x <= gearX) {
            
            if(zombieArray[i].y < gearY && gearY < (zombieArray[i].y + zombieImage.height)) {
                clearGear();
                clearZombie(i)
            }      
        } 
        
        if (zombieArray[i].x == 20) {
            //console.log(zombieArray[i].y, (y+height));
            if(zombieArray[i].y <= (y+height)) {
                clearInterval(intervalID)
                clearInterval(zombieID)
                gameOver()
            }       
        }
    }
}

// Functions for Clouds

function newCloud() {
    for(let i=0; i< clouds.length; i++) {
          
        ctx.drawImage(cloudImg, clouds[i].x, clouds[i].y)
        
        // make the cloud move towards the left on the x axis
        clouds[i].x -= cloudDecrement
        // check if a cloud has reached a certain position
        if (clouds[i].x == 50) {

            //add a new cloud
            clouds.push({
                x: canvas.width+20,
                y: 8
            })
        }
} 
}

function newCloud1() {
    for(let j=0; j< clouds1.length; j++) {
        ctx.drawImage(cloudImg1, clouds1[j].x, clouds1[j].y)
        // make the cloud move towards the left on the x axis
        clouds1[j].x -= 10
        // check if a cloud has reached a certain position
        if (clouds1[j].x == 60) {

            let randomCloud = Math.floor(Math.random() *5 )         

            if(randomCloud < 3) {
                //add a new cloud
                clouds1.push({
                x: canvas.width+20,
                y: 15
            })
            } else {
                clouds1.push({
                    x: canvas.width+40,
                    y: 10
                }) 
            }
        } 
    }
}

function gameOver() {
    canvas.style.display = 'none'
    scoreDisplay.innerHTML = `Your score is ${score}`
    overScreen.style.display = 'block'
    zombieArray = [{x:canvas.width+230, y:60}];
}

function main(){ 
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    ctx.drawImage(backImg, 0, 0, canvas.width, canvas.height)
    ctx.drawImage(foreImg, 0, 90, canvas.width, canvas.height/3)
    drawPlayer();
    newCloud()
    newCloud1()
    drawZombie()
    shootGear()
    
    ctx.font = '12px Verdana'
    ctx.fillText('Score: ' + score, 10, canvas.height - 10)
} 

//Interval for game progress

function startGame() {
    
    canvas.style.display = 'block'
    startBtn.style.display = 'none'
    overScreen.style.display = 'none'
    intervalID = setInterval(() => {
        requestAnimationFrame(main)      
        uniqueID++    
    }, 100)
    updateZombieArr()
    
}

window.addEventListener('load', () => {
    canvas.style.display = 'none'
    overScreen.style.display = 'none'
    // start click event listener
    startBtn.addEventListener('click', () => {
        startGame()
    })
    restartButton.addEventListener('click', () => {
        score = 0;
        startGame()
    })
})
