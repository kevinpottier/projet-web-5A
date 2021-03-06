function Player(playerNumber){

	//cursor dimensions
	this.w = 80
	this.h = 10

	//cursor location & speed
	this.x
	this.y = height-this.h-60
	this.xspeed = 7
	this.direction = 'noMove'

	//Player caracteristics
	this.name = ''
	this.score = 0
	this.life = 5
	this.combo = 0
	this.iHaveBall = false
	this.canMove = false

	//Debuging help
	this.displayParam = function(){
		alert("Player : " + player.name
				+ "\nx = " + this.x
				+ "\ny = " + this.y
				+ "\nwidth = " + this.w
				+ "\nheight = " + this.h
				+ "\nxspeed = " + this.xspeed
				+ "\ndirection = " + this.direction
				+ "\nscore = " + this.score
				+ "\nlife = " + this.life
				+ "\ncombo = " + this.combo
				+ "\niHaveBall = " + this.iHaveBall
				+ "\ncanMove = " + this.canMove
			)
	}	

	//distinction player 1 & 2
	if(playerNumber == 1){

		this.x = width/4 - 40
		this.name = 'Player1'
	}

	if(playerNumber == 2){

		this.x = width*3/4 - 40
		this.name = 'Player2'
	}
		
	//Show the cursor
	this.show = function(color){

		fill(color)
		rect(this.x, this.y, this.w, this.h)
	}

	//Update cursor location
	this.update = function(playerNumber){

		if(this.canMove == true){

			if(playerNumber == 1){
			
				if (keyIsDown(81)){// Q
					this.x -= this.xspeed
					this.direction = 'left'
				}
				if (keyIsDown(68)){// D
					this.x += this.xspeed
					this.direction = 'right'
				}
				else
					this.direction = 'noMove'

				this.x = constrain(this.x, 0, width/2 - this.w - 1)
			}

			if(playerNumber == 2){
			
				if (keyIsDown(LEFT_ARROW)){// <
					this.x -= this.xspeed
					this.direction = 'left'
				}
				if (keyIsDown(RIGHT_ARROW)){// >
					this.x += this.xspeed
					this.direction = 'right'
				}
				else
					this.direction = 'noMove'

				this.x = constrain(this.x, width/2 + 1, width-this.w - 1)
			}
		}
	}

	//Before the game
	//if no names chosen, set player1.name = 'Player1' & player2.name = 'Player2'
	this.choosePlayerName = function(player){
  
  		this.name = player
	}

}