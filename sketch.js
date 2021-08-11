/* 				commentary

1•) extension(s) :Below are the three extensions I have used 
	a.)	Sound : I have added different sounds for when the game character 
				•	jumps  
				•	falls onto canyon
				•	gets killed by the enemy
				•	collects coins 
				•	reaches the flag to win the game
	b.)	Platforms :  I have created multiple platforms varying in size and is placed through the game at different heights 
	c.)Enemies : I have created multiple enemies and placed strategically near coins so as to make the game more challenging and fun for the user

2•) the bits you found difficult :
	I found arranging/positioning  the enemies ,coins and platform in the game world to make the game more fun a bit challenging 

3•) the skills you learnt/practiced by implementing it:
	a.)	Debugging skills : I learnt how to effectively  use the console and trace through the code to find the root cause of the issue
	b.)	Problem Solving skills : spending time analyzing and strategizing the issues and best resolution helped me gain valuable problem solving skills 


*/

// All the Global Variables are declared here
var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos;
var gameChar_world_x;
var isLeft;
var isRight;
var isFalling;
var isPlummeting;
var clouds;
var mountains;
var trees_x;
var canyons;
var collectables;
var game_score;
var flagpole;
var lives ;
var jumpSound;
var platforms;
var enemies;

function preload()
{
    soundFormats('mp3','wav');
    //load sounds here
    jumpSound = loadSound('assets/jump.wav');
	fellCanyonSound = loadSound('assets/fellCanyon.wav');
	killByEnemySound = loadSound('assets/killByEnemy.wav');
	gameWonSound = loadSound('assets/gameWon.wav');
	collectCoinSound = loadSound('assets/collectCoin.wav');

	//Set volume
    jumpSound.setVolume(0.1);
    fellCanyonSound.setVolume(0.1);
    killByEnemySound.setVolume(0.1);
    gameWonSound.setVolume(0.1);
    collectCoinSound.setVolume(0.1);
}

function setup()
{
	createCanvas(1024, 576);
	lives =4;
	startGame()
}

// reloading of all the game variables 
function startGame()
{

	floorPos_y= height * 3/4;
	gameChar_x = width/2;
	gameChar_y = floorPos_y;

	// Variable to control the background scrolling.
	scrollPos = 0;

	// Variable to store the real position of the gameChar in the game
	// world. Needed for collision detection.
	gameChar_world_x = gameChar_x - scrollPos;

	// Boolean variables to control the movement of the game character.
	isLeft = false;
	isRight = false;
	isFalling = false;
	isPlummeting = false;

	// Initialize arrays of scenery objects.

	// Array of trees 
	trees_x =[100,300,500,1000,1300,1700,1900,2100,2350];

	// Array of clouds
	clouds=[{x_pos: 160, y_pos: 150, size: 60},
			{x_pos: 600, y_pos: 100, size: 60},
			{x_pos: 800, y_pos: 100, size: 60},
			{x_pos: 1000, y_pos: 50, size: 60},
			{x_pos: 1500, y_pos: 150, size: 60},
			{x_pos: 1900, y_pos: 50, size: 60},
			{x_pos: 2300, y_pos: 100, size: 60},
			{x_pos: 2100, y_pos: 150, size: 60}
		];

	// Array of Mountains
	mountains=[{x_pos: -200, y_pos: 200},
			{x_pos: 270, y_pos: 200},
			{x_pos: 400, y_pos: 200},
			{x_pos: 550, y_pos: 200},
			{x_pos: 1000, y_pos: 200},
			{x_pos: 1150, y_pos: 200},
			{x_pos: 1650, y_pos: 200},
			{x_pos: 1900, y_pos: 200},
			{x_pos: 2000, y_pos: 200},
			{x_pos: 2350, y_pos: 200},
			{x_pos: 2400, y_pos: 200}	
		];

	// Array of Canyons
	canyons=[{x_pos: 150,width: 150},
		{x_pos: 900,width: 150},
		{x_pos: 1500,width: 150},
		{x_pos: 2800,width: 150}	
		];

	// Array of Collectables
	collectables=[{x_pos: 70, y_pos: 420, size: 50, isFound :false},
				{x_pos: 250, y_pos: 310, size: 50, isFound :false},
				{x_pos: 450, y_pos: 265, size: 50, isFound :false},
				{x_pos: 850, y_pos: 315, size: 50, isFound :false},
				{x_pos: 890, y_pos: 215, size: 50, isFound :false},
				{x_pos: 700, y_pos: 215, size: 50, isFound :false},
				{x_pos: 890, y_pos: 315, size: 50, isFound :false},
				{x_pos: 850, y_pos: 315, size: 50, isFound :false},
				{x_pos: 890, y_pos: 315, size: 50, isFound :false},
				{x_pos: 1050, y_pos: 250, size: 50, isFound :false},
				{x_pos: 1400, y_pos: 270, size: 50, isFound :false},
				{x_pos: 1450, y_pos: 420, size: 50, isFound :false},
				{x_pos: 1750, y_pos: 420, size: 50, isFound :false},
				{x_pos: 2050, y_pos: 420, size: 50, isFound :false},
				{x_pos: 2350, y_pos: 420, size: 50, isFound :false}
			];

	// Flagpole
	flagpole=
	{
		isReached :false,
		x_pos:2500,
		height:300
	}; 
	
	//Text specific Formatting for game score 
	textSize(17)
	textAlign(LEFT);

	//Setting the score to 0 each time game restarts
	game_score =0;

	//Decreasing the life by 1 each time game restarts
	lives -=1;	

	// Array of Platforms
	platforms =[];
	platforms.push(createPlatforms(200,floorPos_y -100,100));
	platforms.push(createPlatforms(400,floorPos_y -150,100));
	platforms.push(createPlatforms(600,floorPos_y -200 ,350));
	platforms.push(createPlatforms(800,floorPos_y -100 ,150));
	platforms.push(createPlatforms(1200,floorPos_y -100,250));

	// Array of enemies 
	enemies =[];
	enemies.push(new Enemy(40,floorPos_y-10,100));
	enemies.push(new Enemy(300,floorPos_y-10,100));
	enemies.push(new Enemy(750,floorPos_y-10,100));
	enemies.push(new Enemy(800,floorPos_y-210,100));
	enemies.push(new Enemy(1250,floorPos_y-110,100));
	enemies.push(new Enemy(1900,floorPos_y-10,100));
	enemies.push(new Enemy(2250,floorPos_y-10,100));
	enemies.push(new Enemy(2300,floorPos_y-10,100));

}
// All the drawing code is below 
function draw()
{
	// fill the sky blue
	background(100, 155, 255); 
	noStroke();
	fill(0,155,0);

	// draw some green ground
	rect(0, floorPos_y, width, height/4); 
	push();
	translate(scrollPos,0);

	// Draw clouds.
	drawClouds()

	// Draw mountains.
	drawMountains()

	// Draw trees.
	drawTrees()

	// Draw canyons.
	for (var i =0 ;i < canyons.length ;i++) 
	{
		drawCanyon(canyons[i]);	
		checkCanyon(canyons[i]);		
	}

	// Draw Platforms
	for (var i =0 ;i < platforms.length ;i++)
	{
		platforms[i].draw();		
	}
	// Draw collectable items.
	for (var i =0 ;i < collectables. length ;i++) 
	{
		if(collectables[i].isFound == false) 
		{
		drawCollectable(collectables[i]);
		checkCollectable(collectables[i]);	
		}
		else if (collectables[i].isFound == true) {	}
	}

	// Render Flag Pole
	renderFlagpole()
	for(var i =0 ;i <enemies.length; i++)
	{
		enemies[i].draw();
		var isContact = enemies[i].checkContact(gameChar_world_x,gameChar_y);
		if(isContact)
		{
			 killByEnemySound.play()
			if(lives>0)
			{
				startGame();
				break;
			}
		}
	} 

	// Draw game character.
	pop();
	drawGameChar();
	fill(255);
	noStroke();

	// Game Score board
	stroke(0)
	textSize(17)
	text('Game Score : '+ game_score,20,25)

	// Game over Message 
	if (lives <1 )
	{ 
		background('rgba(0,0,0, 0.5) ');
		fill(255);
		textAlign(CENTER);
		textStyle(BOLD)
		textSize(20)
		text('Game over. Press space to continue.', width / 2, height / 2)
	 
	}

	// Level Complete Message 
	if (flagpole.isReached)
	{
		
		background('rgba(0,0,0, 0.5) ');
		fill(255);
		textAlign(CENTER);
		textStyle(BOLD);
		textSize(20);
		text('Level complete. Press space to continue.', width / 2, height / 2);
		
	
	}

	//Game Character movement specific logic
	// Logic to make the game character move or the background scroll.
	if(isLeft)
	{
		if(gameChar_x > width * 0.2)
		{
			gameChar_x -= 5;
		}
		else
		{
			scrollPos += 5;
		}
	}

	if(isRight)
	{
		if(gameChar_x < width * 0.8)
		{
			gameChar_x  += 5;
		}
		else
		{
			scrollPos -= 5; // negative for moving against the background
		}
	}

	// Logic to make the game character rise and fall.
	// gravity code for jumping
	if (gameChar_y < floorPos_y)    
	{
		var isContact = false;
		for(var i =0 ; i<platforms.length;i++)
		{
			if(platforms[i].checkContact(gameChar_world_x,gameChar_y) == true)
			{
				isContact =true;
				break;
			}
		}
		if(isContact ==false)
		{
			gameChar_y +=2 ;
			isFalling = true;
		}
		else 
		{
			isFalling = false
		}
	} 
	else 
	{
		isFalling = false
	}

	// Plummeting code when character falls from the canyon
	if (isPlummeting == true) 
	{
		gameChar_y +=4
	}

	// Check if the game character reached Flagpole
	if (flagpole.isReached ==false)
	{
		checkFlagpole();
	}
	
	// Update real position of gameChar for collision detection.
	gameChar_world_x = gameChar_x - scrollPos;

	// To check if player has used all the live
	checkPlayerDie()


}


// ---------------------
// Key control functions
// ---------------------

function keyPressed()
{

	// if statements to control the animation of the character when
	// keys are pressed.

    // left arrow key is pressed 
	if(keyCode == 37 || key =='A' )
	{
		isLeft = true ;
	};
    // Right arrow key is pressed 
	if(keyCode == 39 || key =='D' )
	{
		isRight = true ;
	};
	// When game is over by character loosing lives
	if (lives <1 &&(keyCode == 32 || key =='W')) 
	{
		lives = 4;
		startGame();
	};

	//When game is won by reaching the flag
	if (flagpole.isReached &&(keyCode == 32 || key =='W')) 
	{
		lives = 4;
		startGame();
		
	};
	
    // game character jump when space bar is pressed 
	if(keyCode == 32 || key =='W')
		{
			if(!isFalling)
				{
					gameChar_y -= 110;
					jumpSound.play();
				}
			
		};

}

function keyReleased()
{

	// if statements to control the animation of the character when
	// keys are released.

    // left arrow key is released
	if( keyCode == 37 || key =='A' )
	{
		isLeft = false ;
	};
    // Right arrow key is released 
	if( keyCode == 39 || key =='D')
	{
		isRight = false ;
	};

}


// ------------------------------
// Game character render function
// ------------------------------

// Function to draw the game character.

function drawGameChar()
{
	// draw game character
	//the game character
	if(isLeft && isFalling)
	{
		// add your jumping-left code
		stroke(0);
		fill(92,64,51)
		ellipse(gameChar_x+4, gameChar_y -48, 30)
		fill(0)
		ellipse(gameChar_x-6, gameChar_y -48, 4)
		fill(199, 206, 234)
		//body
		rect(gameChar_x -4,gameChar_y -33,16,27)
		fill(92,64,51)
		rect(gameChar_x -18 ,gameChar_y -35,30,10)
		quad(gameChar_x +11, gameChar_y -5, 
			gameChar_x -3, gameChar_y -5, 
			gameChar_x -16, gameChar_y -20, 
			gameChar_x -2, gameChar_y -20);

	}
	else if(isRight && isFalling)
	{
		// add your jumping-right code
		stroke(0);
		fill(92,64,51)
		ellipse(gameChar_x-4, gameChar_y -48, 30)
		fill(0)
		ellipse(gameChar_x+6, gameChar_y -48, 4)
		fill(199, 206, 234)
		//body
		rect(gameChar_x -12,gameChar_y -33,16,27)
		fill(92,64,51)
		rect(gameChar_x -12 ,gameChar_y -35,30,10)
		quad(gameChar_x -10, gameChar_y -5, 
			gameChar_x +4, gameChar_y -5, 
			gameChar_x +16, gameChar_y -20, 
			gameChar_x +2, gameChar_y -20);

	}
	else if(isLeft)
	{
		// add your walking left code
		stroke(0);
		fill(92,64,51)
		ellipse(gameChar_x+4, gameChar_y -58, 30)
		fill(0)
		ellipse(gameChar_x-6, gameChar_y -58, 4)
		fill(199, 206, 234)
		//body
		rect(gameChar_x -4,gameChar_y -43,16,25)
		fill(92,64,51)
		rect(gameChar_x +2 ,gameChar_y -18,10,17)
		//leg
		quad(gameChar_x +8, gameChar_y -17, 
			gameChar_x -4, gameChar_y -17, 
			gameChar_x -13, gameChar_y  ,
			gameChar_x -2, gameChar_y );
		//arm
		quad(gameChar_x +11, gameChar_y -42, 
			gameChar_x -3, gameChar_y -42, 
			gameChar_x -14, gameChar_y -29, 
			gameChar_x -2, gameChar_y -29,);


	}
	else if(isRight)
	{
		// add your walking right code
		stroke(0);
		fill(92,64,51)
		ellipse(gameChar_x-4, gameChar_y -58, 30)
		fill(0)
		ellipse(gameChar_x+6, gameChar_y -58, 4)
		fill(199, 206, 234)
		//body
		rect(gameChar_x -13,gameChar_y -43,16,25)
		fill(92,64,51)
		rect(gameChar_x -13 ,gameChar_y -18,10,17)

		//leg
		quad(gameChar_x -8, gameChar_y -17, 
			gameChar_x +4, gameChar_y -17, 
			gameChar_x +13, gameChar_y , 
			gameChar_x +2, gameChar_y );
		//arm
		quad(gameChar_x -11, gameChar_y -42, 
			gameChar_x +3, gameChar_y -42, 
			gameChar_x +14, gameChar_y -29, 
			gameChar_x +2, gameChar_y -29,);

	}
	else if(isFalling || isPlummeting)
	{
		// add your jumping facing forwards code
		stroke(0);
		fill(92,64,51)
		ellipse(gameChar_x, gameChar_y -48, 30)
		fill(0)
		ellipse(gameChar_x-6, gameChar_y -48, 4)
		ellipse(gameChar_x+6, gameChar_y -48, 4)
		fill(199, 206, 234)
		rect(gameChar_x -13,gameChar_y -33,26,25)
		fill(92,64,51)
		rect(gameChar_x -13 ,gameChar_y -18,10,15)
		rect(gameChar_x +3 ,gameChar_y -18,10,15)
		rect(gameChar_x -17 ,gameChar_y -43,10,15)
		rect(gameChar_x +8 ,gameChar_y -43,10,15)

	}
	else
	{
		// add your standing front facing code
		stroke(0);
		fill(92,64,51)
		ellipse(gameChar_x, gameChar_y -58, 30)
		fill(0)
		ellipse(gameChar_x-6, gameChar_y -58, 4)
		ellipse(gameChar_x+6, gameChar_y -58, 4)
		fill(199, 206, 234)
		rect(gameChar_x -13,gameChar_y -43,26,25)
		fill(92,64,51)
		
		rect(gameChar_x -13 ,gameChar_y -18,10,17)
		rect(gameChar_x +3 ,gameChar_y -18,10,17)
		rect(gameChar_x -17 ,gameChar_y -43,10,20)
		rect(gameChar_x +8 ,gameChar_y -43,10,20 )


	}
}

// ---------------------------
// Background render functions
// ---------------------------

// Function to draw cloud objects.
function drawClouds()
{
	for (var i =0; i<clouds.length;i++){
	
		//----------cloud in the sky --------------------------
		noStroke()
		fill(255,255,255);
		ellipse(clouds[i].x_pos+ 40,clouds[i].y_pos,clouds[i].size+20);
		ellipse(clouds[i].x_pos,clouds[i].y_pos,clouds[i].size); //Cloud Anchoring
		ellipse(clouds[i].x_pos+ 80,clouds[i].y_pos,clouds[i].size);	
	
	}
};
// Function to draw mountains objects.
function drawMountains()
{
	for (var i =0; i<mountains.length;i++){
		//----------Mountain----------------------------
			fill(160,160,160);
			triangle(mountains[i].x_pos +165, mountains[i].y_pos, 
					mountains[i].x_pos ,mountains[i].y_pos+232, //Mountain Anchoring
					mountains[i].x_pos + 324,mountains[i].y_pos+232);
			fill(255,255,255);
			triangle(mountains[i].x_pos +165, mountains[i].y_pos, 
					mountains[i].x_pos +90,mountains[i].y_pos+105,  
					mountains[i].x_pos + 238,mountains[i].y_pos+102);
		}
};
// Function to draw trees objects.
function drawTrees()
{
	for (var i =0; i<trees_x.length;i++){
		//---------------- Tree--------------------------------
			fill(100,50,0);
			rect(trees_x[i],-200/2 + floorPos_y,50,200/2); //Tree Anchoring
			fill(119, 221, 145);
			triangle(trees_x[i] -50,-200/2 + floorPos_y,
					trees_x[i] +25,-200 + floorPos_y,
					trees_x[i] + 100,-200/2 +floorPos_y); 
			triangle(trees_x[i] -75,-200/4 + floorPos_y,
					trees_x[i] +25,-200*3/4+ floorPos_y,
					trees_x[i] + 125,-200/4 +floorPos_y);
		}
};

// ---------------------------------
// Canyon render and check functions
// ---------------------------------

// Function to draw canyon objects.

function drawCanyon(t_canyon)
{
	noStroke();
	fill(100, 155, 255);
	rect(t_canyon.x_pos+7,432,t_canyon.width -50,1024);
	fill(0,155,0);
	ellipse(t_canyon.x_pos,442,35,20); //Canyon Anchoring
	ellipse(t_canyon.x_pos+113,442,35,20);
}

// Function to check character is over a canyon.

function checkCanyon(t_canyon)
{
	if (gameChar_world_x >t_canyon.x_pos & gameChar_world_x < t_canyon.x_pos +85 & gameChar_y == 432)
		{
			isPlummeting = true;
		}
   
}
//Hearts to show remaining player lives
function heart(x, y, size) {
	beginShape();
	vertex(x, y);
	bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
	bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
	endShape(CLOSE);
  }

//Flagpole creation and movement 
function renderFlagpole() {
	push()
	strokeWeight(5);
	stroke(70);
	line(flagpole.x_pos ,floorPos_y ,flagpole.x_pos ,floorPos_y -250)
	fill(255,0,255)
	noStroke()
	if (flagpole.isReached){
		
		rect(flagpole.x_pos,floorPos_y-250,45,45)}
	else {
		rect(flagpole.x_pos,floorPos_y-50,45,45)}
	pop()
}

//Check if the player has reached the canyon
function checkFlagpole(){
	var d = abs(gameChar_world_x - flagpole.x_pos)
	if (d<15){
		gameWonSound.play()
		flagpole.isReached = true}
}

// Check Player has fallen to the canyon
function checkPlayerDie(){
	if(gameChar_y > height) //player has fallen beyond bottom of the canvas
    {
		fellCanyonSound.play()
		if(lives > 0)
		{
			startGame();
		}
    }
    
	//Render hearts to show player life
	for (var i =0 ;i < lives;i++) {
		fill(310, 127, 255);
		heart(30 +30*i, 50, 20);
	}
    

}

// ----------------------------------
// Collectable items render and check functions
// ----------------------------------

// Function to draw collectable objects.

function drawCollectable(t_collectable)
{
	stroke(0);
	fill(255,215,0);
	ellipse(t_collectable.x_pos ,t_collectable.y_pos ,t_collectable.size-30); //Collectable Anchoring
	fill(0,0,0);
	ellipse(t_collectable.x_pos ,t_collectable.y_pos ,t_collectable.size -45);
}

// Function to check character has collected an item.

function checkCollectable(t_collectable)
{
	if (dist(gameChar_world_x ,gameChar_y,t_collectable.x_pos  ,t_collectable.y_pos) < 25)
		{
			t_collectable.isFound = true;
			collectCoinSound.play()
			game_score +=1;
		}
}
// Function to create Platforms using the Factory design pattern
function createPlatforms(x,y,length)
{
	var p = 
	{
		x:	x,
		y:	y,
		length:	length,
		draw: function(){
			strokeWeight(2);
			stroke(0)
			fill( 253, 253, 150);
			rect(this.x,this.y,this.length,22,20);


		},
		checkContact: function(gc_x,gc_y)
		{
			if(gc_x >this.x && gc_x <this.x + this.length)
			{
				var d = this.y -gc_y;
				if(d>=0 &&d<1){
					return true;
				}
			}
			return false;
		}
	}
	return p
}
// Function to create Enemies using Constructor
function Enemy(x,y,range)
{
	this.x = x;
	this.y =y;
	this.range =range;

	this.currentX = x ;
	this.inc = 1;
	this.update = function()
	{
		this.currentX += this.inc;
		if(this.currentX >= this.x + this.range)
			{
				this.inc -=1;
			}
		else if( this.currentX< this.x)
		{
			this.inc =1;
		}
	}
	this.draw = function()
	{
		this.update();
		fill(255,0,0)
		//ellipse(this.currentX,this.y,20,20);
		drawRobot(this.currentX,this.y, 5.5, 7);

	
	
  
	}
	this.checkContact = function(gc_x,gc_y)
		{
			var d = dist(gc_x,gc_y,this.currentX,this.y)
			if (d <30)
			{ 
				return true;		
			}
		}
}

// Function to draw enemy robots
function drawRobot(x, y, bodyHeight, neckHeight) 
{

	var radius = 22.5;
	var ny = y - bodyHeight - neckHeight - radius; // neckHeight Y
  
	// Neck
	stroke(102);
	line(x + 1, y - bodyHeight, x + 1, ny);
	line(x + 6, y - bodyHeight, x + 6, ny);
	line(x + 11, y - bodyHeight, x + 11, ny);
  
	// Antennae
	line(x + 6, ny, x - 9, ny - 21.5);
	line(x + 6, ny, x + 12, ny - 49.5);
	line(x + 6, ny, x + 39, ny + 7.5);
  
	// Body
	noStroke();
	fill(102);
	ellipse(x, y - 16.5, 16.5, 16.5);
	fill(0);
	rect(x - 22.5, y - bodyHeight, 45, bodyHeight +10);
	fill(102);
	rect(x - 22.5, y - bodyHeight + 8.5, 45, 3);
  
	// Head
	fill(255, 105, 97);
	ellipse(x + 6, ny, radius, radius);
	fill(255);
	ellipse(x + 12, ny - 3, 7, 7);
	fill(0);
	ellipse(x + 12, ny - 3, 1.5, 1.5);
	fill(153);
	ellipse(x, ny - 4, 2.5, 2.5);
	ellipse(x + 15, ny - 13, 2, 2);
	ellipse(x + 20.5, ny + 3, 1.5, 1.5);
  }