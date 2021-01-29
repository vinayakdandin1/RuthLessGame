RUTHLESS Game

Description ---------------------------------------------------------<

This is a simple Game with background images of one of my favourite games from my childhood called Contra. In this game your player will be running continuously forward and on the way he will face zombies which will be moving towards him to kill him. Your objective is to kill the zombies by using mouse click, which shoots the bullets on zombies. 
There will also be some pits/gaps in the platform which you will have to cross by jumping using the spacebar on keyboard. 
You can also collect goodies by jumping which keep appearing randomly, but be cautious when you want to jump as the jump functionality will be disabled for some time once you jump.  

As the level increases the zombies and the pits/gaps speed increases. 

MVP (DOM - CANVAS) --------------------------------------------------<

game has a player and the zombies which appear randomly
Player need to kill the zombies by using mouse click to shoot at zombies. 

Backlog -------------------------------------------------------------<

Show a boss zombie after certain interval and figth with him
Add music to the game

Data Structure ------------------------------------------------------<

index.js
buildStartScreen() {}
buildGameScreen() {}
buildGameOverScreen() {}

startGame()  -- Event listener to start game
main()  -- starts when game is started and executes all functions with setInterval
gameOver()  -- clears all the intervals and shows gave over screen
newCloud(), newCloud1() -- animates random clouds moving in sky
drawZombie(), updateZombieArr(), clearZombie(), updateZombFrame() -- Contains all logic to generat random zombie and animate
drawPlayer(), updateFrame() -- contains all logic for player animation
shootGear(), clearGear(), drawGear() -- Contains all logic for shooting a bullet
drawFruits(), clearFruit(), updateFruit() -- Contains logic for displaying random fruit on screen.  
whiteSpace() -- Generates a pit/gap in platform and animates it to move towards player.

splashScreen
gameScreen
gameOverScreen

Task --------------------------------------------------<

main - buildDom
main - buildStartScreen
main - addEventListener
main - buildGameScreen
main - buildGameOverScreen
game - startLoop
game - buildCanvas
game - add random zombies
game - immitate screen moving
game - immitate zombies approaching player
game - build player shooting
game - clear zombies and bullet if hit
game - check player collision with zombie

Links -------------------------------------------------<

GitRepositry: https://github.com/vinayakdandin1/RuthlessGame

Git --------------------------------------------------<
URls for the project repo and deploy Link Repo Link Deploy

Slides --------------------------------------------------<
URls for the project presentation (slides) Link Slides.com