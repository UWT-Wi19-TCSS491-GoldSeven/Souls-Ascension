function Animation(spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse) {
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
    var scaleBy = scaleBy || 0.5 //The size of the sprite. 1 = 100%
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
	0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ,20,16,21,12,1 ,2 ,1 ,2 ,1 ,7 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,6 ,9 ,20,16,21,8 ,7 ,0 ,6 ,2 ,9 ,20,21,8 ,1 ,7 ,0 ,6 ,9 ,20,16,16,16,16,21,12,1 ,2 ,2 ,2 ,2 ,1 ,7 ,0 ,0 ,0 ,0 ,0 ,0 ,
	0 ,0 ,0 ,0 ,6 ,1 ,2 ,1 ,1 ,2 ,2 ,1 ,3 ,4 ,1 ,1 ,1 ,2 ,2 ,1 ,1 ,1 ,3 ,1 ,1 ,2 ,1 ,11,18,24,17,5 ,0 ,0 ,0 ,0 ,0 ,8 ,7 ,0 ,0 ,0 ,6 ,1 ,2 ,1 ,10,10,4 ,9 ,20,24,24,24,21,8 ,10,9 ,20,16,24,24,16,21,8 ,2 ,11,20,24,24,19,19,19,23,5 ,20,16,16,16,16,21,8 ,3 ,1 ,4 ,7 ,0 ,0 ,
	0 ,0 ,0 ,0 ,5 ,20,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,21,5 ,22,19,23,5 ,22,19,19,24,24,20,8 ,1 ,2 ,1 ,9 ,20,16,21,8 ,9 ,20,16,24,24,24,24,24,21,1 ,20,24,24,24,24,24,24,16,21,5 ,22,24,17,6 ,1 ,2 ,1 ,9 ,18,24,19,19,19,24,16,16,16,21,5 ,0 ,0 ,
	0 ,0 ,0 ,0 ,5 ,18,24,24,24,24,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,24,17,8 ,3 ,15,4 ,13,1 ,1 ,7 ,18,24,24,16,16,16,16,16,24,24,24,16,16,24,19,24,24,24,24,24,24,16,24,24,24,24,24,24,24,24,17,8 ,7 ,18,17,5 ,20,16,16,16,24,23,6 ,10,7 ,18,24,24,24,17,5 ,0 ,0 ,
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

Background.prototype = new Entity();
Background.prototype.constructor = Background;

Background.prototype.update = function () {};

Background.prototype.draw = function () {
	var spriteX = 0;
	var spriteY = 0;
	var count = 0;
	var x = this.x;
	var y = this.y;
	
	// Loop to generate each tile
    for (var i = 0; i < slimeDungeonLevelOne.length -2; i++) {
		spriteX = (slimeDungeonLevelOne[i] - 1) * 32; // 32 is the number of pixels per sprite
        console.log(this.ctx);
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

function Samurai(game) {                                                                                               //loop   reversed
    this.alertAnimation = new Animation(ASSET_MANAGER.getAsset("./img/SamuraiHeavy_Alert.png"), 0, 0, 512, 512, 0.04, 9, true, false);
    this.standAnimation = new Animation(ASSET_MANAGER.getAsset("./img/SamuraiHeavy_Stand.png"), 0, 0, 512, 512, 0.04, 10, true, false);
    this.walkAnimation = new Animation(ASSET_MANAGER.getAsset("./img/SamuraiHeavy_Walk.png"), 0, 0, 512, 512, 0.04, 10, false, false);
    this.runAnimation = new Animation(ASSET_MANAGER.getAsset("./img/SamuraiHeavy_Run.png"), 0, 0, 512, 512, 0.02, 10, false, false);
    this.attackAnimation = new Animation(ASSET_MANAGER.getAsset("./img/SamuraiHeavy_Attack.png"), 0, 0, 512, 512, 0.04, 10, false, false);
    this.hitAnimation = new Animation(ASSET_MANAGER.getAsset("./img/SamuraiHeavy_Hit.png"), 0, 0, 512, 512, 0.04, 10, false, false);
    this.dieAnimation = new Animation(ASSET_MANAGER.getAsset("./img/SamuraiHeavy_Die.png"), 0, 0, 512, 512, 0.04, 10, false, false);
    this.animation = this.standAnimation; // default animation with no user interaction.
    this.jumpAnimation = new Animation(ASSET_MANAGER.getAsset("./img/SamuraiHeavy_Run.png"), 0, 0, 512, 512, 0.06, 10, false, false);

    this.isJumping = false;
    this.isAttacking = false;
    this.isMovingLeft = false;
    this.isMovingRight = false;
    this.isMovingUp = false;
    this.isMovingDown = false;
    this.radius = 100;
    this.ground = 400;
    this.travelSpeed = 8;
    Entity.call(this, game, 0, 400);
}

Samurai.prototype = new Entity();
Samurai.prototype.constructor = Samurai;

Samurai.prototype.update = function() {
    this.game.ctx.clearRect(0, 0, this.game.ctx.canvas.width, this.game.ctx.canvas.height);;
    if (this.game.space) { this.isJumping = true }
    if (this.game.click) { this.isAttacking = true }
    if (this.game.left)  { this.isMovingLeft = true }
    if (this.game.right) { this.isMovingRight = true }
    if (this.game.up)    { this.isMovingUp = true }
    if (this.game.down)  { this.isMovingDown = true }

    // This is how the entity jumps.
    if (this.isJumping) {
        if (this.jumpAnimation.isDone()) {
            this.jumpAnimation.elapsedTime = 0;
            this.isJumping = false;
        }
        var jumpDistance = this.jumpAnimation.elapsedTime / this.jumpAnimation.totalTime;
        var totalHeight = 200;

        if (jumpDistance > 0.5)
            jumpDistance = 1 - jumpDistance;

        //var height = jumpDistance * 2 * totalHeight; // Don't use this.
        var height = totalHeight * (-4 * (jumpDistance * jumpDistance - jumpDistance)); // A nice parabolic jump.
        this.y = this.ground - height;
        if(this.isMovingLeft) {
            this.x -= 4;
        } else if (this.isMovingRight) {
            this.x += 4;
        } 
    } else {
        // This is how/where the entity moves with keyboard buttons according to the event listeners.
        this.isMovingLeft = this.game.left || this.game.lefting;
        this.isMovingRight = this.game.right || this.game.righting;
        this.isMovingUp = this.game.up || this.game.upping;
        this.isMovingDown = this.game.down || this.game.downing;

        if(this.isMovingUp) {
            if (this.y+30 <= this.game.origin.y) {
                this.game.origin.y -= this.travelSpeed;
                this.game.ctx.translate(0,this.travelSpeed);  // Screen-in-world movement.
                this.game.ctx.save();
            }
            this.y -= this.travelSpeed;
            this.ground -= this.travelSpeed; // A new landing position.
        } else if (this.isMovingDown) {
            if (this.y+175 >= this.game.origin.y+this.game.ctx.canvas.height) { // Screen-in-world movement.
                this.game.origin.y += this.travelSpeed;
                this.game.ctx.translate(0,-this.travelSpeed);
                this.game.ctx.save();
            } 
            this.y += this.travelSpeed;
            this.ground += this.travelSpeed; // A new landing position.
        }

        if(this.isMovingLeft) {
            if(this.x+120 <= this.game.origin.x) { // Screen-in-world movement.
                var speed = this.travelSpeed;
                if (this.isJumping) { speed /= 2 }
                this.game.origin.x -= speed;
                this.game.ctx.translate(speed,0);
                this.game.ctx.save();
            }
            this.x -= this.travelSpeed;
        } else if (this.isMovingRight) {
            if (this.x+200 >= this.game.origin.x+this.game.ctx.canvas.width-50) { // Screen-in-world movement.
                var speed = this.travelSpeed;
                if (this.isJumping) { speed /= 2 }
                this.game.origin.x += speed;
                this.game.ctx.translate(-speed,0);
                this.game.ctx.save();
            }
            this.x += this.travelSpeed;
        }
        //console.log("Origin " + this.game.origin.x + "," + this.game.origin.y); // Debugging.
        //console.log("Entity " + this.x + "," + this.y); // Debugging.
    }

    if (this.isAttacking) {
        if (this.attackAnimation.isDone()) {
            this.attackAnimation.elapsedTime = 0;
            this.isAttacking = false;
        }
    }
    Entity.prototype.update.call(this);
}

Samurai.prototype.draw = function(ctx) {
    if (this.isJumping && this.isAttacking) {
        this.attackAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    } else if (this.isJumping) {
        this.jumpAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    } else if (this.isAttacking) {
        this.attackAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    } else if (this.isMovingUp || this.isMovingDown || this.isMovingLeft || this.isMovingRight) {
        this.runAnimation.drawFrame(this.game.clockTick, this.game.ctx, this.x, this.y); // BUG not displaying correctly.
    } else {
         this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    }
    //ctx.rect(this.x, this.y, this.x+(512/2), this.y-(512/2));
    //ctx.stroke();
    //console.log("Entity is (" + this.x + "," + this.y +")"); // Debugging.
    Entity.prototype.draw.call(this);
}

// the "main" code begins here

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./img/DungeonBackgroundSpriteSheet.png");
ASSET_MANAGER.queueDownload("./img/SamuraiHeavy_Alert.png");
ASSET_MANAGER.queueDownload("./img/SamuraiHeavy_Attack.png");
ASSET_MANAGER.queueDownload("./img/SamuraiHeavy_Die.png");
ASSET_MANAGER.queueDownload("./img/SamuraiHeavy_Hit.png");
ASSET_MANAGER.queueDownload("./img/SamuraiHeavy_Run.png");
ASSET_MANAGER.queueDownload("./img/SamuraiHeavy_Stand.png");
ASSET_MANAGER.queueDownload("./img/SamuraiHeavy_Walk.png");

ASSET_MANAGER.downloadAll(function() {
    console.log("starting up da sheild");
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');

    var gameEngine = new GameEngine(ctx);
    var bg = new Background(gameEngine, ASSET_MANAGER.getAsset("./img/DungeonBackgroundSpriteSheet.png"));
    var samurai = new Samurai(gameEngine);

	gameEngine.addEntity(bg);
    gameEngine.addEntity(samurai);

    gameEngine.init();
    gameEngine.start();
});