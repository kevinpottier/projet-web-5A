function Player(playerNumber){

	this.w = 80
	this.h = 10

	this.x
	this.y = height-this.h-10

	this.xspeed = 4

	this.name = ''

	if(playerNumber == 1){
		this.x = width/4 - 40
		this.name = 'Player 1'
	}

	if(playerNumber == 2){
		this.x = width*3/4 - 40
		this.name = 'Player 2'
	}
		
	this.show = function(playerNumber){

		if(playerNumber == 1){
			fill(255, 0, 0) //RED
		}

		if(playerNumber == 2){
			fill(0, 0, 255) //BLUE
		}

		rect(this.x, this.y, this.w, this.h)
	}

	this.update = function(playerNumber){

		if(playerNumber == 1){
			
			if (keyIsDown(81)){// Q
				this.x -= this.xspeed
			}
			if (keyIsDown(68)){// D
				this.x += this.xspeed
			}
			this.x = constrain(this.x, 0, width/2 - this.w - 1)
		}

		if(playerNumber == 2){
			
			if (keyIsDown(LEFT_ARROW)){// <
				this.x -= this.xspeed
			}
			if (keyIsDown(RIGHT_ARROW)){// >
				this.x += this.xspeed
			}
			this.x = constrain(this.x, width/2 + 1, width-this.w - 1)
		}
	}
}