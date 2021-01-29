let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')
canvas.style.border = '2px solid black'
let intervalID = 0
let score = 0


//Position where the player will be drawn
let x = 30;
let y=60; 
let zomX;
let zomY;

let spriteWidth = 68; 
let spriteHeight = 30; 

let srcX; 
let srcY;
let srcZomX;
let srcZomY;

let row = 1; 
let frameCount = 3; 

let startBtn = document.querySelector('#start')
let overScreen = document.querySelector('#gameOver')
let winScreen = document.querySelector('#win')
//let bossLevel = document.querySelector('#boss')

let scoreDisplay = document.querySelector('.finalScore')
let restartButton = document.querySelector('#gameOver button')
let playAgainButton = document.querySelector('#win button')

//Width of individual frame

let width = spriteWidth / frameCount; 
let height = spriteHeight / row; 
curFrame = 0;

let curZomFrame = 0;

//Boss level player co-ordinates

let bPlayerX = 30
let bPlayerY = 60 

//For Clouds

let clouds = [{x:canvas.width +5 , y: 8}]
let clouds1 = [{x:canvas.width + 10, y: 10}]
let cloudDecrement = 5;

let zombieArray = [{x:canvas.width+230, y:60}];
let zombieDecrement = 5;

let gearX = x;
let gearY = y + 10;


let gearIncrement = 20;
let showBullet = false;

// Creating Images

let charecter = document.createElement('img')
charecter.src = './images/char.png'  

let stationaryChar = document.createElement('img')
stationaryChar.src = './images/player_stand.png'   

let BossScreen = document.createElement('img')
BossScreen.src = './images/BossScreen.png'  

let bossZombieImage = document.createElement('img')
bossZombieImage.src = './images/bossZombie.png' 

// let cannonImage = document.createElement('img')
// cannonImage.src = './images/tower.png'

let backImg = document.createElement('img')
backImg.src = './images/blue.png'

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

let redGear = document.createElement('img')
redGear.src = './images/CannonImage.png'

let emptySpace = document.createElement('img')
emptySpace.src = './images/whiteSpace.png'

let cherryX = canvas.width +80
let cherryDecrement = 5

let jumpIncrement = 35
let canJump = true

let fruitsArray = [{img: cherryImg,x: cherryX, y: 40}]
let fruitsID = 0;
let fruitsDecrement = 15

let emptyX = canvas.width;
let emptyY = 88
let emptyDecrement = 10

let level = 1
let airTime = 800
let jumpFreezTime = 3000

let levelId = 1 
let PlayerForBoss = false;

let bossZombie = false
// let isCannon = false
let bossHealth = "❤❤❤"
let bossDummy = 3

let isLeftArrow = false;
let isRightArrow = false

let bossFireInterval = 0
// let gearCannonX = 37.5
// let gearCannonY = 18

let gearZombieX = canvas.width -50
let gearZombieY = 70

let showBossBullet = false

let bPlayerJump = true
let zombieHitMe = true

// Boss level functions

function bossAppearance() {
    ctx.drawImage(BossScreen, 0, 0, BossScreen.width, BossScreen.height, canvas.width, canvas.height, canvas.width, canvas.height)
}

function boss() {
    clearInterval(zombieID)
    clearInterval(fruitsID)
    clearInterval(levelId)
    

    level = "Boss";
    zombieArray =[]
    fruitsArray = []
    clouds = []
    clouds1 = []
    emptyX = canvas.width + 5
    x = -40
    emptyDecrement = 0
    PlayerForBoss = true
    bossZombie = true
    //isCannon = true
}

function updateBossHealth() {
    if(showBullet && gearX >= (canvas.width - 50)) {

        if(bossDummy === 3) {
            bossHealth = "❤❤"
            bossDummy-- 
        } else if(bossDummy === 2) {
            bossHealth = "❤"
                bossDummy--
        } else {
            youWin()
        }

    }
}

function drawBossZombie() {
    bossFire()
    ctx.drawImage(bossZombieImage, 0, 0,bossZombieImage.width, bossZombieImage.height, canvas.width - 50, 10, 40, 80)
}

function drawStationaryChar() {
    ctx.drawImage(stationaryChar, 0, 0,stationaryChar.width, stationaryChar.height, bPlayerX, bPlayerY, 22, 30)
}


function bossFire() {

    if(PlayerForBoss && showBossBullet) {
        ctx.drawImage(redGear,0, 0, redGear.width, redGear.height, gearZombieX, gearZombieY,20, 20);
        gearZombieX -= 8
    }
    if(gearZombieX <= 50 && gearZombieX > 30) {
        if(zombieHitMe === true) {
            gameOver()
        }
    }
    if(gearZombieX <= 0) {
        clearZombieGear()
    }
}

function clearZombieGear() {
    showBossBullet = false
    gearZombieX = canvas.width -50
}

function whiteSpace() {
    ctx.drawImage(emptySpace, 0, 0,emptySpace.width, emptySpace.height, emptyX, emptyY, 30, 32)
    emptyX -= emptyDecrement
    
    if(emptyX <= -1000) {
        emptyX = canvas.width
    } 

    if(emptyX <= (x + (charecter.width / 3)) && x < emptyX) {
        if((emptyY -5) <= (y + charecter.height)) {
            
            zombieArray = []
            fruitsArray = []
            gameOver()
        }
    }
}

//Functions for Goodies

function updateFruit() {
    fruitsID = setInterval(() => {
        let fruitsDecider = Math.floor(Math.random() *7)
        if(fruitsDecider < 4) {
            fruitsArray.push({
                img: cherryImg,
                x: cherryX,
                y: 40
            })
        } else {
            fruitsArray.push({
                img: lollyPopImg,
                x: cherryX,
                y: 40
            })
        }
    }, 6000);
}

function clearFruit(index) {
    fruitsArray.splice(index, 1)
    score +=5; 
}

function drawFruits() {   
    for(let i=0; i<fruitsArray.length; i++) {
        
        ctx.drawImage(fruitsArray[i].img, 0, 0,cherryImg.width, cherryImg.height, fruitsArray[i].x, fruitsArray[i].y, 10, 10)
        fruitsArray[i].x -= fruitsDecrement

        if(fruitsArray[i].x <= (x+(charecter.width / 3)) && fruitsArray[i].x > x ) {
            if(y < (fruitsArray[i].y + 5 ) && (fruitsArray[i].y + 5) < (y + charecter.height) ) {
                clearFruit(i);
            }
        }
    }   
}

// Functions for bullet
  
function drawGear() {
    
    if (showBullet) {
        if(y === 60) {
            ctx.drawImage(gear, gearX, gearY);
            gearX += gearIncrement 
        
            if(gearX >= canvas.width) {
                clearGear()
            }
        } else {
            clearGear()
        }
    } 

    if(bossZombie) {
        if(gearX == 254) {
            updateBossHealth()
        }
    }
    
}

function clearGear() {
    showBullet = false

    if(!PlayerForBoss) {
        gearX = x
    } else {
        gearX = x + 70
    }
    
}

function shootGear() {
    canvas.addEventListener('click', event => {
        showBullet = true     
    });
}

//Functions for player and zombies

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
        zombieArray.splice(0, 1)
        score +=2;    
}

function updateZombieArr() {
    zombieID = setInterval(() => {
        zombieArray.push({
            x: canvas.width + 300,
            y: 60
        })
        
    }, 4000);
}

function drawZombie() {
    for(let i = 0; i < zombieArray.length; i++) {
        updateZombFrame()
        ctx.drawImage(zombieImage, srcZomX, srcZomY, width, height, zombieArray[i].x, zombieArray[i].y, width, height)
        zombieArray[i].x -= zombieDecrement;
        
        if (zombieArray[i].x <= gearX && showBullet === true) {
            
            if(zombieArray[i].y < gearY && gearY < (zombieArray[i].y + zombieImage.height)) {
                clearGear();
                clearZombie(i)
            }      
        } 
        
        if (zombieArray[i].x <= (x + (charecter.width / 3)) && x < zombieArray[i].x) {
            if(zombieArray[i].y <= (y+height)) {
                zombieArray = []
                fruitsArray = []
                gameOver()
            }       
        }
    }
}

// Functions for random Clouds

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

//Game over function to clear all intervals and to show game over screen

function gameOver() {

    clearInterval(intervalID)
    clearInterval(zombieID)
    clearInterval(fruitsID)
    clearInterval(levelId)
    clearInterval(bossFireInterval)
    gearZombieX = canvas.width -30;
    canvas.style.display = 'none'
    winScreen.style.display = 'none'
    scoreDisplay.innerHTML = `Your score is ${score}`
    overScreen.style.display = 'block'
    zombieArray = [{x:canvas.width+230, y:60}];
}

//Win fuction to show win screen

function youWin() {
    clearInterval(intervalID)
    clearInterval(zombieID)
    clearInterval(fruitsID)
    clearInterval(levelId)
    clearInterval(bossFireInterval)
    bossDummy = 3
    bossHealth = "❤❤❤"
    canvas.style.display = 'none'
    winScreen.style.display = 'block'
    scoreDisplay.innerHTML = `Your score is ${score}`
    overScreen.style.display = 'none'
}

// Interval for the zombie to shoot
    
bossFireInterval = setInterval(() => {
        showBossBullet = true
        bossFire()  
}, 800);

function main(){ 
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    ctx.drawImage(backImg, 0, 0, canvas.width, canvas.height)
    ctx.drawImage(foreImg, 0, 90, canvas.width, canvas.height/3)
    drawPlayer();
    newCloud()
    newCloud1()
    drawZombie()
    shootGear()
    drawFruits()
    whiteSpace()
    bossAppearance()

    if (isRightArrow && (bPlayerX  < canvas.width - 60)) {
        bPlayerX += 5
    }
    else if (isLeftArrow && bPlayerX  > 0) {
        bPlayerX -= 5
    }

    if(PlayerForBoss) {
        drawStationaryChar()
    }

    if(bossZombie) {
        drawBossZombie()
    }

    // if(isCannon) {
    //     drawCannon()
    // }

    ctx.font = '12px Verdana'
    ctx.fillText('Score: ' + score, 10, canvas.height - 10)
    ctx.font = '12px Verdana'
    ctx.fillText('Level: ' + level, canvas.width - 80, canvas.height - 10)

    if(bossZombie) {
        ctx.font = '12px Verdana'
        ctx.fillText('BossHealth: ' + bossHealth, canvas.width - 210, canvas.height - 10)
    }
} 

//Function to start the game and start the interval

function startGame() {
    
    canvas.style.display = 'block'
    startBtn.style.display = 'none'
    overScreen.style.display = 'none'
    winScreen.style.display = 'none'
    updateZombieArr()
    updateFruit()
    
    intervalID = setInterval(() => {
        requestAnimationFrame(main)       
    }, 100)
    
    levelId = setInterval(() => {
        if(emptyDecrement <= 29) {
            emptyDecrement += 1
        }
        
        if(gearIncrement <= 29) {
            gearIncrement += 2
        }
        
        if(fruitsDecrement <= 29) {
            fruitsDecrement += 2
        }
    
        if(zombieDecrement <= 29) {
            zombieDecrement += 2
        }
    
        if(zombieDecrement <= 29) {
            level++
            airTime -=30
            jumpFreezTime -= 500
        }
    
        if(level === 5) {
            clearInterval(levelId)
            boss()    
        }
        
    }, 10000);
    
}


// Event listeners to start game, shoot bullet and jump functionality

window.addEventListener('load', () => {
    canvas.style.display = 'none'
    overScreen.style.display = 'none'
    winScreen.style.display = 'none'
    
    // start click event listener
    startBtn.addEventListener('click', () => {
        startGame()
    })
    
})

restartButton.addEventListener('click', () => {
    score = 0;
    emptyX = canvas.width

    emptyDecrement = 10
    gearIncrement = 20
    fruitsDecrement = 15
    zombieDecrement = 5
    level = 1

    zombieArray =[{x:canvas.width+230, y:60}]
    fruitsArray = [{img: cherryImg,x: cherryX, y: 40}]
    clouds = [{x:canvas.width +5 , y: 8}]
    clouds1 = [{x:canvas.width + 10, y: 10}]
    emptyX = canvas.width + 5
    x = 30
    PlayerForBoss = false
    bossZombie = false
    //isCannon = false
    startGame()
})

playAgainButton.addEventListener('click', () => {
    score = 0;
    emptyX = canvas.width

    emptyDecrement = 10
    gearIncrement = 20
    fruitsDecrement = 15
    zombieDecrement = 5
    level = 1

    zombieArray =[{x:canvas.width+230, y:60}]
    fruitsArray = [{img: cherryImg,x: cherryX, y: 40}]
    clouds = [{x:canvas.width +5 , y: 8}]
    clouds1 = [{x:canvas.width + 10, y: 10}]
    emptyX = canvas.width + 5
    x = 30
    PlayerForBoss = false
    bossZombie = false
    //isCannon = false
    startGame()
})

//Event listener for jump function and move function for boss level


document.addEventListener('keydown', (event) => { 
    
    if (event.keyCode == 32 || event.key == " ") {
        
        if(y === 60 && canJump === true) {
            canJump = false
            y -= jumpIncrement   
            gearX = x
        
            setTimeout(() => {
                 y = 60
            }, airTime);
            
            setTimeout(() => {
                canJump = true
            }, jumpFreezTime);
        }

        if(bPlayerY === 60 && bPlayerJump === true) {
            bPlayerJump = false
            zombieHitMe = false
            bPlayerY -= jumpIncrement
            gearX = 30

            setTimeout(() => {
                bPlayerY = 60
                zombieHitMe = true
            }, 1000);

            setTimeout(() => {
                bPlayerJump = true
            }, 100);
        }


    } 
})

document.addEventListener('keydown', (event) => {
    if (event.keyCode == 68 || event.key == "d") {
       isRightArrow = true;
       isLeftArrow = false;
    }
    else if (event.keyCode == 65 || event.key == "a") {
       isRightArrow = false;
       isLeftArrow = true;
    }
})

document.addEventListener('keyup', (event) => {
    isRightArrow = false;
    isLeftArrow = false;
})