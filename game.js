var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var buttonColours = ["red", "blue", "green", "yellow"];
var started=false;

function playSound(name) {
  var colorPlay = new Audio(name + '.mp3');
  colorPlay.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
  $("#" + currentColour).removeClass("pressed");
  }, 100);
}


function nextSequence() {
  userClickedPattern=[];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChoosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChoosenColour);
  // console.log(gamePattern);
  $("#" + randomChoosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChoosenColour);
  animatePress(randomChoosenColour);
  level++;
  $("#level-title").text("Level " + level);
}


function startOver(){
  level = 0;
  gamePattern=[];
  started=false;

}

// Game starts
$(document).keypress(function() {
  if(!started){
    nextSequence();
    started=true;
    // $("#level-title").text("Level 0");
  }
});


$(".btn").click(function(event) {
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
  // console.log("success");
  if(userClickedPattern.length==gamePattern.length){
    setTimeout(function(){
      nextSequence();
      },1000);
  }
}
else{
  // console.log("wrong");
  var wrongPlay= new Audio('wrong.mp3');
  wrongPlay.play();
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}
