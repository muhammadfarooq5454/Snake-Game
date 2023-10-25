//initial direction
let inputDirection = {x:0, y:0};

//All sounds Constants
const foodSound = new Audio('../music/food.mp3');
const moveSound = new Audio('../music/move.mp3');
const musicSound = new Audio('../music/music.mp3');
const gameOverSound = new Audio('../music/gameover.mp3');
let speed = 6;
let lastPaintTime = 0;
let snakeArr = [{x:13, y:15}];
let food = {x:6, y:7};
let score = 0;

//All Functions
function main(ctime)
{
    //Game Loop
    window.requestAnimationFrame(main);
    //console.log(ctime); 
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(sArr) {
    //If you bump into yourself   
    for (let index = 1; index < snakeArr.length; index++) {
        if(snakeArr[index].x == snakeArr[0].x &&snakeArr[index].y == snakeArr[0].y){
            return true;
        }    
    }
    //out of bound condition
    if(snakeArr[0].x >= 18 || snakeArr[0].x <=0 || snakeArr[0].y >=18 || snakeArr[0].y <= 0)
    {
        return true;
    }
    return false;
}


function gameEngine() {
    let board = document.getElementById('board');
    
    //Part1: Updating the snake array and his food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDirection = {x:0, y:0};
        alert("Game Over. Press Any Key to play again");
        snakeArr = [{x:13, y:15}];
        musicSound.play();
        score = 0;
    }

    // If you have eaten the food, increment the score and regenerate the food
    if(snakeArr[0].x == food.x && snakeArr[0].y == food.y){
        foodSound.play();
        //changing the head of the snake when he eats the food
        snakeArr.unshift({x: snakeArr[0].x + inputDirection.x, y: snakeArr[0].y + inputDirection.y});
        let a = 2;
        let b = 13;
        //Updating the food to new location
        food = {x: Math.round(a+(b-a)*Math.random()) , y: Math.round(a+(b-a)*Math.random())};
        score = score + 1;
        document.getElementById('score').innerHTML = `Score : ${score}`;
        console.log(score);
    }    
    
    
    //Moving the snake
    for(let i=snakeArr.length-2; i>=0; i--)
    {
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDirection.x;
    snakeArr[0].y += inputDirection.y;

    //Part2: Display the snake and his food
    //Display the snake
    board.innerHTML = "";
    snakeArr.forEach((element, index)=>{
        let snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = element.y;
        snakeElement.style.gridColumnStart = element.x;
        if(index == 0)
        {
            snakeElement.classList.add('head');
        }
        else
        {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    
    //Render the food
    let foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

// Main Logic Starts Here

window.requestAnimationFrame(main);

window.addEventListener('keydown', (e)=>{
    //Start the game
    inputDirection = {x:0, y:1};
    moveSound.play();
    switch (e.key) {
        case 'ArrowUp':
            console.log('ArrowUp');
            inputDirection.x = 0;
            inputDirection.y = - 1;
            break;
        
        case 'ArrowDown':
            console.log('ArrowDown');
            inputDirection.x = 0;
            inputDirection.y = 1;
            break;
            
        case 'ArrowRight':
            console.log('ArrowRight');
            inputDirection.x = 1;
            inputDirection.y = 0;
            break;
                
        case 'ArrowLeft':
            console.log('ArrowLeft');
            inputDirection.x = -1;
            inputDirection.y = 0;
            break;
        
        default:
            break;
    }

});