

/************ GAMEPLAY *************/


function isTheWinner(player){

  restart()

  var name = ''

  textAlign(CENTER)
  textSize(25);
  fill('WHITE')

  if (player != 0){
    name = player.name
    score = player.score
  }
  else{
    name = 'Noboby'
    score = 0
  }

  title = text(name + ' WINS !', width/2, height/2 - 120)

  title = text("PRESS ENTER\nTO EXIT", width/2, height/2 - 50)

  jQuery(document).ready(function() {

      var z = document.getElementById('menu');
      
      z.innerHTML = "<li><a>"+name+" : "+score+"</a></li>";

  });
  
}


//Watch if someone wins
function win(){

  console.log(undestructibleBricks)

  // if no life anymore
  if(player2.life <= 0){
    isTheWinner(player1)
  }
  else if(player1.life <= 0){
    isTheWinner(player2)
  }

  // if no bricks anymore
  if(brick.length - undestructibleBricks  == 0){ 

    if(player1.score > player2.score){
      isTheWinner(player1)
    }
    else if(player1.score < player2.score){
      isTheWinner(player2)
    }
    else
      isTheWinner(0)
  }

  if(keyIsDown(13)){ // ENTER
    
   started = false
    noCanvas()
  
    setup()
  }
}


//Ball & players moving authorization
unfreezeGame = function(ball, player1, player2){

  if(keyIsDown(32)){ // SPACE
    ball.canMove = true
    player1.canMove = true
    player2.canMove = true
  }
}

//unable ball & players to move + reset combos
freezeGame = function(ball, player1, player2){

      player1.combo = 0
      player2.combo = 0
      player1.canMove = false
      player2.canMove = false
      ball.canMove = false
}



/************ POWERS *************/


//yspeed is divided by two (in brick.seekPower())
//until the ball have slowtouch slots
//nothing happen if ball.slowtouch < 0
function slowball(ball){

  //slowtouch
  if(ball.slowtouch > 0){
    ball.slowtouch --
  }
  //back to classic speed
  else if(ball.slowtouch == 0){
    ball.slowtouch = -1
    ball.yspeed *= 2
  }
}

//Destroy brick even if brick.hp is greater than 1
//if the ball have no supertouch slot anymore, do classic bounce
//also ask for slowball() power
function superball(player, ball, brick){

  //supertouch
  if(ball.supertouch > 0){
    player.score += 10* brick.hp + player.combo
    player.combo += brick.hp
    brick.hp = 0
    ball.supertouch --
  }
  //classic touch
  else{
    brick.hp --
    player.score += 10 + player.combo
    player.combo ++
  }
}


//Create a 2nd (or n-th) ball
//Directly allowed to move
//Random direction
//Start from the original ball location
function cloneball(ballTab, previousBallID){

  ballTab.push(new Ball() )

  var i = ballTab.length -1
  ballTab[i].init(ballTab[previousBallID].x + ballTab[previousBallID].xspeed,
                        ballTab[previousBallID].y + ballTab[previousBallID].yspeed)
  ballTab[i].canMove = true
}


//Teleport the ball fram the startBrick to its destination brick
//No bounce on TOP & BOTTOM
//No teleport on RIGHT & LEFT
//Undestructible bricks
function teleport(startBrick, ball){

  
  //alert("in teleport2")
  if(startBrick.power == 'teleport'){

    //alert("power")
    if(ball.y < startBrick.y){

      //alert("in top")
      //starting brick TOP to destination brick BOTTOM
      ball.x = startBrick.teleportDestX + startBrick.w/2
      ball.y = startBrick.teleportDestY + startBrick.h + ball.diameter/2 +1
    }
    else{

      //alert("in bottom")
      //starting brick BOTTOM to destination brick TOP
      ball.x = startBrick.teleportDestX + startBrick.w/2
      ball.y = startBrick.teleportDestY - ball.diameter/2 -1
    }

    //reset speed
    ball.yspeed *= -1

  }
}



//seek for the 2 teleport bricks, if they exist. Always in pair.
function teleportDestination(i, idDest){

  //if brick[i] is the first teleport birck founded...
  if(idDest == -1){
    idDest = i
    return idDest;
  }
  //... else we can set the destBrick in the 2 teleport bricks
  else{
    
    brick[i].teleportDestX = brick[idDest].x
    brick[i].teleportDestY = brick[idDest].y


    brick[idDest].teleportDestX = brick[i].x
    brick[idDest].teleportDestY = brick[i].y
    //alert(brick[i].teleportDestX)
    return -1;
  }
}