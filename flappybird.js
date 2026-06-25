
//board
let board;
let boardWidth = 360;
let boardHeight = 640;
let context;

//oiseau
let birdWidth = 34;
let birdHeight = 24;
let birdX = boardWidth/8;
let birdY = boardHeight/2;
let birdImg;

let bird = {
    x : birdX,
    y : birdY,
    width : birdWidth,
    height : birdHeight
}

//tuyaux
let pipeArray = [];
let pipeWidth = 64;
let pipeHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;
let floor = null;

let topPipeImg;
let bottompipeImg

//mouvement
let velocityX = -2;
let velocityY = 0;
let gravity = 0.4;

let gameOver = false
let score = 0;

window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); 

    //test oiseau
    birdImg = new Image();
    birdImg.src = "Blacko.png";
    //birdImg.onload = function() 
     
    topPipeImg = new Image()
    topPipeImg.src = "./pipe-red (1).png"

    bottomPipeImg = new Image()
    bottomPipeImg.src = "./pipe-red (2).png"

    floor = new Image();
    floor.src = "./base.png"

    requestAnimationFrame(update);    
    setInterval(placePipes, 2000)
    document.addEventListener("keydown", moveBird);
}

function update() {
    requestAnimationFrame(update)
    if (gameOver) {
        return;
    }
    context.clearRect(0,0, board.width, board.height);
    
    velocityY += gravity;
    //bird.y += velocityY;
    bird.y = Math.max(bird.y + velocityY, 0);
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    context.drawImage(floor,0,board.height-board.height/7,board.width,board.height/7)
   

    if (bird.y > board.height) {
        gameover = true;
    }

    for (let i = 0; i < pipeArray.length; i++) {
        let pipe = pipeArray [i];
        pipe.x += velocityX;
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

        if (!pipe.passed && bird.x > pipe.x + pipe.width) {
            score += 0.5;
            pipe.passed = true;
        }
         
        if (detectCollision(bird, pipe) )
            gameOver = true;
        

       
        if(bird.y > board.height-board.height/7)
            gameOver = true;
    }

    context.fillStyle = "white";
    context.font="45px arial";
    context.fillText(score, 5, 45);

    if (gameOver) {
        context.fillText("GAME OVER", 5, 90);
    }
    }

function placePipes() {
    if (gameOver) {
        return;
    }


    let randomPipeY = pipeY - pipeHeight/4 - Math.random()*(pipeHeight/2);
    let openingSpace = board.height/4;

    let topPipe = {
        img : topPipeImg,
        x : pipeX,
        y : randomPipeY,
        width : pipeWidth,
        height : pipeHeight,
        passed : false
    }

    pipeArray.push(topPipe);

    let : bottomPipe = {
        img : bottomPipeImg,
        x : pipeX,
        y : randomPipeY + pipeHeight + openingSpace,
        width : pipeWidth,
        height: pipeHeight,
        passed : false
    }
    pipeArray.push(bottomPipe);
}

function moveBird(e) {
    if (e.code == "Space" || e.code == "ArrowUp" || e.code == "KeyX"); {
        velocityY = -7;

        if (gameOver) {
            bird.y = birdY;
            pipeArray = [];
            score = 0;
            gameOver = false;
        }
    }
}

function detectCollision(a, b) {
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
}

