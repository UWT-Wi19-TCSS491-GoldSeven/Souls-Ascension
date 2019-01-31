function Animation(spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse) {
    console.log(spriteSheet);
    this.spriteSheet = spriteSheet;
    this.startX = startX;
    this.startY = startY;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.reverse = reverse;
}

Animation.prototype.drawFrame = function(tick, ctx, x, y, scaleBy) {
    var scaleBy = scaleBy || 1; //The size of the sprite. 1 = 100%
    this.elapsedTime += tick;
    if (this.loop) {
        if (this.isDone()) {
            this.elapsedTime = 0;
        }
    } else if (this.isDone()) {
        return;
    }
    var index = this.reverse ? this.frames - this.currentFrame() - 1 : this.currentFrame();
    var vindex = 0;
    if ((index + 1) * this.frameWidth + this.startX > this.spriteSheet.width) {
        index -= Math.floor((this.spriteSheet.width - this.startX) / this.frameWidth);
        vindex++;
    }
    while ((index + 1) * this.frameWidth > this.spriteSheet.width) {
        index -= Math.floor(this.spriteSheet.width / this.frameWidth);
        vindex++;
    }

    var locX = x;
    var locY = y;
    var offset = vindex === 0 ? this.startX : 0;
    ctx.drawImage(this.spriteSheet,
        index * this.frameWidth + offset, vindex * this.frameHeight + this.startY, // source from sheet
        this.frameWidth, this.frameHeight,
        locX, locY,
        this.frameWidth * scaleBy,
        this.frameHeight * scaleBy);
}

Animation.prototype.currentFrame = function() {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function() {
    return (this.elapsedTime >= this.totalTime);
}
//----------------------------------------------------------------------------------------------------------------------------------------
/* 
 * Slime Dungeon Level 1 (88x33) each number is a 32x32 pixel space
 * 0 = no block (should layer background image so these are not just a solid color)
 * 1-4 = alternating horizontal wall tiles, 5 = Vertical wall tile, 6 = Top Left L shaped corner, 7 = Top Right L shaped corner,
 * 8 = Bottom Left L shaped corner, 9 = Bottom Right L shaped corner, 10 = North T shaped wall, 11 = East T shaped wall,
 * 12 = West T shaped wall, 13 = South T shaped wall, 14 = + shaped wall, 15 = Horizontal wall with door,
 * 16 = North floor, 17 = East floor, 18 = West floor, 19 = South floor, 20 = Top Left L floor, 21 = Top Right L floor,
 * 22 = Bottom Left L floor, 23 = Bottom Right L floor, 24 = Center floor.
 */
var slimeDungeonLevelOne = new Array(
	0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,6 ,1 ,2 ,1 ,7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,6 ,1 ,2 ,1 ,7 ,0 ,0 ,0 ,0 ,6 ,3 ,4 ,7 ,0 ,0 ,0 ,0 ,6 ,1 ,1 ,2 ,1 ,4 ,1 ,7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,
	0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ,20,16,21,12,1 ,2 ,1 ,2 ,1 ,7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,6 ,2 ,20,16,21,3 ,7 ,0 ,6 ,2 ,1 ,20,21,2 ,1 ,7 ,0 ,6 ,3 ,20,16,16,16,16,21,12,1 ,2 ,2 ,2 ,2 ,1 ,7 ,0 ,0 ,0 ,0 ,0 ,0 ,
	0 ,0 ,0 ,0 ,6 ,1 ,2 ,1 ,1 ,2 ,2 ,1 ,3 ,4 ,1 ,1 ,1 ,2 ,2 ,1 ,1 ,1 ,3 ,1 ,1 ,2 ,1 ,11,18,24,17,5 ,20,16,16,16,21,1 ,7 ,0 ,0 ,0 ,6 ,1 ,2 ,1 ,10,10,4 ,1 ,20,24,24,24,21,2 ,10,1 ,20,16,24,24,16,21,1 ,2 ,11,20,24,24,19,19,19,23,5 ,20,16,16,16,16,21,1 ,3 ,1 ,4 ,7 ,0 ,0 ,
	0 ,0 ,0 ,0 ,5 ,20,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,21,5 ,22,19,23,5 ,22,19,19,24,24,20,3 ,1 ,2 ,1 ,4 ,20,16,21,3 ,4 ,20,16,24,24,24,24,24,21,1 ,20,24,24,24,24,24,24,16,21,5 ,22,24,17,6 ,1 ,2 ,1 ,3 ,18,24,19,19,19,24,16,16,16,21,5 ,0 ,0 ,
	0 ,0 ,0 ,0 ,5 ,18,24,24,24,24,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,24,17,1 ,3 ,15,4 ,1 ,1 ,1 ,7 ,18,24,24,16,16,16,16,16,24,24,24,16,16,24,19,24,24,24,24,24,24,16,24,24,24,24,24,24,24,24,17,2 ,7 ,18,17,5 ,20,16,16,16,24,23,6 ,10,7 ,18,24,24,24,17,5 ,0 ,0 ,
	0 ,0 ,0 ,0 ,5 ,18,24,24,24,17,1 ,2 ,1 ,10,1 ,2 ,1 ,2 ,3 ,4 ,1 ,1 ,2 ,1 ,7 ,18,24,16,16,16,16,16,16,21,5 ,18,24,24,24,24,19,19,19,19,19,19,19,24,17,5 ,22,24,24,24,24,19,19,19,19,24,24,24,24,24,24,24,21,5 ,18,17,5 ,18,24,19,19,23,6 ,1 ,1 ,5 ,22,19,19,19,23,5 ,0 ,0 ,
	0 ,0 ,0 ,0 ,5 ,18,24,24,24,24,16,16,21,5 ,20,16,16,16,16,16,16,16,16,21,5 ,18,24,24,24,24,24,24,24,23,5 ,18,24,24,24,17,6 ,10,10,10,1 ,1 ,7 ,18,17,8 ,7 ,18,24,24,17,1 ,10,10,7 
	
	);
var currentScale = 32;
var currentWTiles = 88; // number of tiles with wise on the map
function Background(game, spritesheet) {
    this.x = 0;
    this.y = 0;
	this.sw = 32;
    this.sh = 32;
	this.dw = currentScale;
    this.dh = currentScale;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
};

// The brown background is only for a point of reference. OK to delete.
Background.prototype = new Entity();
Background.prototype.constructor = Background;
Background.prototype.update = function() {}
Background.prototype.draw = function(ctx) {
    ctx.fillStyle = "SaddleBrown";
    ctx.fillRect(0, 500, 800, 300);
    Entity.prototype.draw.call(this);
}

// The BockThingy is only for testing a point of reference.  OK to delete.
function BlockThingy(game) {
    Entity.call(this, game, 400, 0);
    this.radius = 200;
}
BlockThingy.prototype = new Entity();
BlockThingy.prototype.constructor = Background;


Background.prototype.draw = function () {
	var spriteX = 0;
	var spriteY = 0;
	var count = 0;
	var x = this.x;
	var y = this.y;
	
	// Loop to generate each tile
    for (var i = 0; i < slimeDungeonLevelOne.length -2; i++) {
		spriteX = (slimeDungeonLevelOne[i] - 1) * 32; // 32 is the number of pixels per sprite
		this.ctx.drawImage(this.spritesheet, spriteX, spriteY, this.sw, this.sh, x, y, this.dw, this.dh);
		count++;
		if (count >= currentWTiles) // change the value based on how many tiles you will draw. (88 atm)
		{
			x = this.x;
			y += currentScale; 
			count = 0;
		}
		else 
		{
			x += currentScale; 
		}
	};
};

//--------------------------------------------------------------------------------------------------

// The BockThingy is only for testing a point of reference.  OK to delete.
function CenterThingy(game) {
    // Displays the center of the canvas/camera.
    Entity.call(this, game, 390, 390);
    this.radius = 200;
}
CenterThingy.prototype = new Entity();
CenterThingy.prototype.constructor = Background;
CenterThingy.prototype.update = function() {}
CenterThingy.prototype.draw = function(ctx) {
    ctx.fillStyle = "blue";
    ctx.fillRect(395, 395, 10, 10);
    Entity.prototype.draw.call(this);
}

// The entity's origin is determined by its BoundingBox object.
function Character(game) {                                                                                            //loop  reversed
    this.standAnimation = new Animation(ASSET_MANAGER.getAsset("./img/spritesheet.png"),     0,   0, 32, 32, 0.08, 5, true, false);
    this.walkRightAnimation = new Animation(ASSET_MANAGER.getAsset("./img/spritesheet.png"), 0,  32, 33, 32, 1.04, 1, false, false);
    this.walkLeftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/spritesheet.png"),  0,  64, 33, 32, 1.04, 1, false, false);
    this.walkUpAnimation = new Animation(ASSET_MANAGER.getAsset("./img/spritesheet.png"),    0,  96, 32, 32, 1.04, 1, false, false);
    this.walkDownAnimation = new Animation(ASSET_MANAGER.getAsset("./img/spritesheet.png"),  0, 128, 32, 32, 1.04, 1, false, false);
    this.attackAnimation = new Animation(ASSET_MANAGER.getAsset("./img/spritesheet.png"),    0, 160, 32, 32, 0.04, 5, false, false);
    this.animation = this.standAnimation; // initial animation.
    this.isAttacking = false;
    this.isMovingLeft = false;
    this.isMovingRight = false;
    this.isMovingUp = false;
    this.isMovingDown = false;
    this.radius = 100;
    this.travelSpeed = 8;
    this.boxes = game.debug;         // For debugging, game.debug = true;
    this.scale = 1; // set to 1 if the sprite dimensions are the exact size that should be rendered.
    //console.log(this); // Debugging.
    Entity.call(this, game, 384, 384); // Spawn the entity's upper left corner at these coordinates of the world.
}

Character.prototype = new Entity();

Character.prototype.constructor = Character;

Character.prototype.update = function() {
    if (this.game.click) { this.isAttacking = true }
    if (this.game.left)  { this.isMovingLeft = true }
    if (this.game.right) { this.isMovingRight = true }
    if (this.game.up)    { this.isMovingUp = true }
    if (this.game.down)  { this.isMovingDown = true }

    // This is how/where the entity moves with keyboard buttons according to the event listeners.
    this.isMovingLeft = this.game.left || this.game.lefting;
    this.isMovingRight = this.game.right || this.game.righting;
    this.isMovingUp = this.game.up || this.game.upping;
    this.isMovingDown = this.game.down || this.game.downing;

    if(this.game.debug && (this.isMovingLeft || this.isMovingRight || this.isMovingUp || this.isMovingDown)) {
        console.log(this);
    }

    if(this.isMovingUp) {
        this.game.origin.y -= this.travelSpeed;
        this.game.ctx.translate(0,this.travelSpeed); // Moves the canvas/camera.
        this.y -= this.travelSpeed; // Moves the entity.
    } else if (this.isMovingDown) {
        this.game.origin.y += this.travelSpeed;
        this.game.ctx.translate(0,-this.travelSpeed); // Moves the canvas/camera.
        this.y += this.travelSpeed; // Moves the entity.
    }

    if(this.isMovingLeft) {
        var speed = this.travelSpeed;
        this.game.origin.x -= speed;
        this.game.ctx.translate(speed,0); // Moves the canvas/camera.
        this.x -= this.travelSpeed; // Moves the entity.
    } else if (this.isMovingRight) {
        var speed = this.travelSpeed;
        this.game.origin.x += speed;
        this.game.ctx.translate(-speed,0); // Moves the canvas/camera.
        this.x += this.travelSpeed; // Moves the entity.
    }
    
    // The boundingBox follows the entity.
    this.boundingBox.x = this.x;
    this.boundingBox.y = this.y;

    if (this.isAttacking) {
        if (this.attackAnimation.isDone()) {
            this.attackAnimation.elapsedTime = 0
            this.isAttacking = false;
        }
    }

    if (this.isMovingLeft && this.walkLeftAnimation.isDone()) {
        this.walkLeftAnimation.elapsedTime = this.walkLeftAnimation.elapsedTime;
        // this.isMovingLeft = false;
    } else if(this.isMovingRight && this.walkRightAnimation.isDone()) {
        this.walkRightAnimation.elapsedTime = 0;
        // this.isMovingRight = false;
    } else  if(this.isMovingUp && this.walkUpAnimation.isDone()) {
        this.walkUpAnimation.elapsedTime = 0;
        // this.isMovingUp = false;
    } else if(this.isMovingDown && this.walkDownAnimation.isDone()) {
        this.walkDownAnimation.elapsedTime = 0;
        // this.isMovingDown = false;
    }

    Entity.prototype.update.call(this);
}

Character.prototype.draw = function(ctx) {
    if (this.isMovingUp) {
        this.animation = this.walkUpAnimation;
    } else if (this.isMovingDown) {
        this.animation = this.walkDownAnimation;
    } else if (this.isMovingLeft) {
        this.animation = this.walkLeftAnimation;
    } else if (this.isMovingRight) {
        this.animation = this.walkRightAnimation;
    } else if (this.isAttacking) {
        this.animation = this.attackAnimation;
    } else {
         this.animation = this.standAnimation;
    }
    this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    if(this.boxes) {
        ctx.strokeStyle = "green";
        ctx.strokeRect(this.boundingBox.x, this.boundingBox.y, this.boundingBox.width, this.boundingBox.height);
        //ctx.strokeStyle = "orange";
        //ctx.strokeRect(this.x, this.y, this.animation.frameWidth*this.scale, this.animation.frameHeight*this.scale); //
        //console.log('BoundingBox: ' + this.boundingBox.x + ',' + this.boundingBox.y); // Debugging.
    }
    Entity.prototype.draw.call(this);
}

// the "main" code begins here

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload('./img/spritesheet.png');
ASSET_MANAGER.queueDownload("./img/DungeonBackgroundSpriteSheet.png");
ASSET_MANAGER.queueDownload("./img/spritesheet.png");

ASSET_MANAGER.downloadAll(function() {
    console.log("starting up da sheild");
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");

    var gameEngine = new GameEngine(ctx, ctx.canvas.width, ctx.canvas.height);
    var blockthingy = new BlockThingy(gameEngine); // Debugging point of reference until we have an actual map.
    var bg = new Background(gameEngine, ASSET_MANAGER.getAsset("./img/DungeonBackgroundSpriteSheet.png"));
    var character = new Character(gameEngine);
    var centerthingy = new CenterThingy(gameEngine);

    // Initial configuration of entity.
    character.boundingBox.offsetX = 0;
    character.boundingBox.offsetY = 0;
    character.boundingBox.width = 32;   // Left.
    character.boundingBox.height = 32;  // Down.

	gameEngine.addEntity(bg);
    gameEngine.addEntity(character);

    if (gameEngine.debug) gameEngine.addEntity(centerthingy);

    gameEngine.init(ctx);
    gameEngine.start();
});