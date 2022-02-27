let hole = document.getElementById('hole');
let block = document.getElementById('block');
let character = document.getElementById('character');
const image = document.querySelector('.bird');
const gameSpace = document.getElementById("game");
let jumping = 0;
let counter = 0;
let playing = 0;
const start = document.getElementById("startBTN");
const score = document.getElementById("score");
const scoreDetails = document.getElementById("scoreDetails");
const gameOver = document.getElementById("gameover");
let currentScore;


        // starting conditions

  function reset(){
      character.classList.add("invisible");
        block.classList.add("invisible");
        hole.classList.add("invisible");
        block.classList.remove("move");
        hole.classList.remove("move");
        start.textContent="Again";
        scoreDetails.classList.remove("invisible");
        counter = 0;
        currentScore=0;
        playing=0;
    };

        //  the start button
  
start.addEventListener("click", function () {
    playing = 1;
    character.classList.remove("invisible");
    block.classList.remove("invisible");
    hole.classList.remove("invisible");
    block.classList.add("move");
    hole.classList.add("move");
    start.classList.add("invisible");
    gameOver.classList.add("invisible");
    scoreDetails.classList.add("invisible");
    gameSpace.style.border = "1px solid black";
    score.textContent = 0;
});

        //  random positioning of hole

hole.addEventListener('animationiteration', () => {
    var random = -((Math.random() * 300) + 150);
    hole.style.top = random + "px";
   currentScore = counter++;
});

        // game functionality  

setInterval(function () {
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue('top'));
    if (playing === 1) {

        if (jumping === 0) {
            character.style.top = (characterTop + 3) + 'px';
            image.classList.add('down');
        }
    }
    var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    var holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
    var cTop = -(500 - characterTop);

                  // game over
    
    if ((characterTop > 480) || ((blockLeft < 20) && (blockLeft > -50) && ((cTop < holeTop) || (cTop > holeTop + 130)))) {
        score.textContent = currentScore;
        character.style.top = "100px";
        start.classList.remove("invisible");
        gameSpace.style.border = "7px solid #96101085";
        gameOver.classList.remove("invisible");
        reset();
    }
}, 10);

            // jump function

function jump() {
    jumping = 1;
    let jumpCount = 0;
    var jumpInterval = setInterval(function () {
        var characterTop =
            parseInt(window.getComputedStyle(character).getPropertyValue('top'));
        if ((characterTop > 6) && (jumpCount < 15)) {
            character.style.top = (characterTop - 5) + 'px';
        }
        if (jumpCount > 20) {
            clearInterval(jumpInterval);
            jumping = 0;
            jumpCount = 0;
        }
        image.classList.remove('down');
        image.classList.add('up');
        jumpCount++;
    }, 10);
}

// key event

document.addEventListener('keydown', function (e) {
    if (e.keyCode === 32) {
        jump();
    }
});
