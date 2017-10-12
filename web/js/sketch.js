
//The ball
var ball

//The players
var player1
var player2

//The bricks
var brick = []

//The bricks tab
var bricksTab

var height = 500
var width = 1000

//Margin for the ball collision
var margin = 8



function setup() {

  createCanvas(1000, 500)
  frameRate(60)

  ball = new Ball()
  player1 = new Player(1)
  player2 = new Player(2)

  // choose players names
  player1.choosePlayerName('Player1')
  player2.choosePlayerName('Player2')
  //alert('Player 1 : ' + player1.name + '\nPlayer 2 : ' + player2.name)

  //Get the bricksTab from HTML
  bricksTab = jQuery('.class-bricks').data('bricks')

  for (var i = 0; i < bricksTab.length; i++) {
    brick.push(new Brick(bricksTab[i]))
  }  

}
  
function draw(){
 
  background(0) //BLACK
  stroke(255) //WHITE


  //Test the end of the game ( version n°1 )
  win()

  //Middle line
  line(width/2, height-100, width/2, height)

  //Show all bricks
  for (var i = 0; i < brick.length; i++) {
    brick[i].show()
  }

  //Update and show players 
  player1.update(1)
  player1.show('RED')
  
  player2.update(2)
  player2.show('BLUE')

  //Players, edges and bricks collissions
  ball.playerBounce(player1)
  ball.playerBounce(player2)
  ball.brickBounce(brick)
  ball.edgeBounce()

  //Update and show the ball
  ball.update()
  ball.show()
  
}

function win(){

  if(brick.length == 0){

    alert('! WIN !')
    ball.init()

    for (var i = 0; i < bricksTab.length; i++) {
        brick.push(new Brick(bricksTab[i]))
    }
  }
}


