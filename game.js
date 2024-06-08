let started = false;
let level = 0;
let buttonColours = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let userClickedPattern = [];

function playSound(name){
    let audio = new Audio(`${name}.mp3`)
    audio.play();
}

function animatePress(currentColour) {
    $(`#${currentColour}`).addClass('pressed');
    setTimeout(() => {
        $(`#${currentColour}`).removeClass('pressed');
    }, 100);
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").html(`Level ${level}`);
    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    animatePress(randomChosenColour);
    playSound(randomChosenColour);
    console.log(gamePattern);
}

$('.btn').click(function(){
    let userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length-1)
})

$(document).keydown(()=>{ 
    if(!started){
        nextSequence();
        started = true;
    }
})
 function startOver() {
    level = 0;
    started = false;
    gamePattern = []
 }
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log('Success');
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else{
        let audio = new Audio(`sounds/wrong.mp3`)
        audio.play();

        $('body').addClass('game-over');
        setTimeout(() => {
            $('body').removeClass('game-over');
        }, 200);

        $('h1').html('Game Over, Press Any Key to Restart');

        startOver();
    }
}

