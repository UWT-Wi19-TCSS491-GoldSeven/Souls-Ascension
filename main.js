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
	0 ,0 ,0 ,0 ,5 ,20,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,21,5 ,22,19,23,5 ,22,19,19,24,24,21,3 ,1 ,2 ,1 ,4 ,20,16,21,3 ,4 ,20,16,24,24,24,24,24,21,1 ,20,24,24,24,24,24,24,16,21,5 ,22,24,17,6 ,1 ,2 ,1 ,3 ,18,24,19,19,19,24,16,16,16,21,5 ,0 ,0 ,
	0 ,0 ,0 ,0 ,5 ,18,24,24,24,24,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,24,17,1 ,3 ,15,4 ,1 ,1 ,1 ,7 ,18,24,24,16,16,16,16,16,24,24,24,16,16,24,19,24,24,24,24,24,24,16,24,24,24,24,24,24,24,24,17,2 ,7 ,18,17,5 ,20,16,16,16,24,23,6 ,10,7 ,18,24,24,24,17,5 ,0 ,0 ,
	0 ,0 ,0 ,0 ,5 ,18,24,24,24,17,1 ,2 ,1 ,10,1 ,2 ,1 ,2 ,3 ,4 ,1 ,1 ,2 ,1 ,7 ,18,24,16,16,16,16,16,16,21,5 ,18,24,24,24,24,19,19,19,19,19,19,19,24,17,5 ,22,24,24,24,24,19,19,19,19,24,24,24,24,24,24,24,21,5 ,18,17,5 ,18,24,19,19,23,6 ,1 ,1 ,5 ,22,19,19,19,23,5 ,0 ,0 ,
	0 ,0 ,0 ,0 ,5 ,18,24,24,24,24,16,16,21,5 ,20,16,16,16,16,16,16,16,16,21,5 ,18,24,24,24,24,24,24,24,23,5 ,18,24,24,24,17,6 ,10,10,10,1 ,1 ,7 ,18,17,1 ,7 ,18,24,24,17,1 ,10,10,7 ,18,24,24,24,24,24,24,17,5 ,18,17,5 ,18,17,2 ,1 ,1 ,2 ,20,21,3 ,1 ,2 ,1 ,1 ,1 ,4 ,7 ,0 ,
	0 ,0 ,0 ,0 ,5 ,22,19,19,19,19,19,24,17,5 ,18,24,24,24,24,19,19,19,19,23,5 ,18,24,24,24,24,24,24,23,6 ,1 ,18,24,24,24,17,2 ,1 ,2 ,11,20,21,5 ,18,24,21,1 ,18,24,24,24,21,12,1 ,1 ,18,24,24,24,24,24,24,17,5 ,18,17,5 ,18,24,16,16,16,16,24,24,16,16,16,16,16,16,21,5 ,0 ,
	0 ,0 ,0 ,6 ,1 ,1 ,2 ,1 ,1 ,10,7 ,18,17,5 ,18,24,24,24,17,6 ,10,10,10,1 ,11,22,19,19,19,19,19,23,6 ,1 ,20,24,24,24,24,24,16,16,21,5 ,18,17,2 ,7 ,22,24,16,24,24,24,24,17,3 ,20,16,24,24,24,24,24,24,24,17,5 ,18,17,5 ,22,24,24,24,24,24,19,19,19,19,19,19,19,24,17,5 ,0 ,
	0 ,0 ,6 ,4 ,20,16,16,16,21,4 ,3 ,18,17,5 ,18,24,24,24,17,1 ,14,14,2 ,24,1 ,1 ,2 ,3 ,2 ,4 ,2 ,1 ,1 ,20,24,24,24,24,24,24,24,24,17,5 ,18,24,21,4 ,7 ,22,19,19,19,19,24,24,16,24,24,19,24,24,19,19,19,19,23,5 ,18,17,1 ,7 ,18,24,24,24,17,1 ,1 ,1 ,1 ,1 ,1 ,1 ,18,17,4 ,7 ,
	0 ,6 ,1 ,20,24,24,19,24,24,16,16,24,17,5 ,22,24,24,24,24,21,1 ,11,20,24,16,16,16,16,16,16,16,16,16,24,24,24,24,24,24,24,24,24,17,5 ,18,24,24,21,1 ,2 ,1 ,3 ,4 ,7 ,22,19,24,24,23,5 ,18,17,6 ,4 ,1 ,1 ,1 ,3 ,18,24,21,5 ,18,24,24,24,24,16,16,16,16,16,16,16,24,24,21,5 ,
	0 ,5 ,20,24,24,23,5 ,18,24,19,19,24,17,4 ,7 ,18,24,24,24,24,21,5 ,18,24,19,19,19,19,19,19,24,24,24,24,24,24,24,24,24,24,24,24,17,5 ,18,24,24,24,16,16,16,16,21,12,1 ,7 ,22,23,6 ,4 ,18,17,1 ,20,16,16,16,16,24,24,17,5 ,18,24,24,24,19,19,19,19,19,24,24,24,24,24,17,5 ,
	0 ,5 ,18,24,17,1 ,1 ,18,17,6 ,7 ,22,24,21,2 ,22,19,19,19,19,23,5 ,18,17,6 ,4 ,3 ,4 ,3 ,7 ,22,19,24,24,24,24,24,24,24,24,24,24,17,5 ,18,24,24,24,24,19,24,24,23,5 ,24,1 ,1 ,1 ,4 ,20,24,24,16,24,24,24,24,24,24,24,17,5 ,22,24,24,23,6 ,3 ,2 ,4 ,7 ,18,24,19,19,19,23,5 ,
	0 ,5 ,18,24,24,16,16,24,23,12,1 ,7 ,22,24,21,1 ,1 ,3 ,15,4 ,2 ,11,18,17,5 ,20,16,16,21,1 ,1 ,7 ,22,19,19,19,19,24,24,24,19,19,23,5 ,22,19,19,19,23,5 ,22,23,6 ,11,18,16,16,16,16,24,19,19,19,24,24,24,24,24,24,24,17,2 ,7 ,22,23,6 ,4 ,20,16,21,1 ,18,17,1 ,2 ,1 ,10,9 ,
	0 ,5 ,22,24,24,24,19,23,6 ,1 ,24,1 ,7 ,22,24,16,16,16,16,16,21,5 ,18,17,5 ,22,19,24,24,16,21,1 ,1 ,2 ,4 ,1 ,7 ,22,19,23,6 ,1 ,4 ,2 ,1 ,1 ,2 ,4 ,3 ,1 ,15,1 ,3 ,1 ,18,24,24,19,19,23,6 ,4 ,7 ,18,24,24,24,24,24,24,24,21,1 ,2 ,2 ,1 ,20,24,24,24,16,24,24,16,16,21,5 ,0 ,
	0 ,8 ,7 ,18,24,23,6 ,1 ,2 ,20,24,21,1 ,7 ,22,19,19,19,19,24,17,5 ,18,17,1 ,4 ,7 ,22,24,24,24,16,16,16,16,21,4 ,1 ,1 ,2 ,11,20,16,16,16,16,16,16,16,16,16,16,16,16,24,19,23,6 ,10,1 ,1 ,24,5 ,18,24,24,24,24,24,24,24,24,16,16,16,16,24,24,24,24,19,19,19,24,24,17,5 ,0 ,
	0 ,0 ,5 ,18,17,6 ,4 ,20,16,24,24,24,21,1 ,4 ,15,3 ,10,7 ,18,17,5 ,18,24,16,21,1 ,7 ,22,24,24,24,24,24,24,24,16,16,16,21,5 ,22,24,19,19,19,19,19,19,19,24,24,19,19,23,6 ,4 ,3 ,11,20,16,17,5 ,22,19,24,24,24,24,24,24,24,19,19,19,19,19,24,24,17,6 ,1 ,1 ,18,24,17,5 ,0 ,
	0 ,0 ,5 ,18,17,5 ,20,24,24,19,19,24,24,16,16,16,21,12,11,18,17,5 ,18,24,24,24,21,1 ,7 ,18,24,24,24,24,24,24,24,24,24,17,1 ,7 ,24,6 ,1 ,2 ,2 ,4 ,3 ,7 ,18,17,6 ,1 ,1 ,3 ,20,21,5 ,18,24,17,2 ,2 ,7 ,22,19,24,24,24,19,23,6 ,3 ,2 ,2 ,7 ,22,24,17,5 ,20,16,24,24,17,4 ,7 ,
	0 ,0 ,5 ,18,17,5 ,18,24,17,6 ,7 ,22,19,24,24,24,17,12,2 ,18,17,5 ,18,24,24,24,24,21,5 ,18,24,24,24,24,24,24,24,24,24,24,21,1 ,15,11,20,16,16,16,21,1 ,18,17,1 ,20,16,16,24,17,5 ,22,19,24,16,21,1 ,2 ,7 ,22,19,23,6 ,4 ,2 ,20,16,21,1 ,7 ,18,17,1 ,18,24,24,24,24,21,5 ,
	0 ,0 ,5 ,18,17,5 ,22,19,23,12,14,1 ,7 ,22,24,24,17,5 ,20,24,17,5 ,18,24,24,24,24,17,5 ,18,24,24,24,24,24,24,24,24,24,24,24,16,21,5 ,18,24,24,24,24,16,24,24,16,24,24,24,24,17,1 ,2 ,1 ,18,24,24,16,21,4 ,1 ,1 ,1 ,4 ,20,16,24,24,24,21,5 ,18,24,16,24,24,24,24,24,17,5 ,
	6 ,1 ,1 ,18,17,1 ,1 ,4 ,1 ,2 ,11,24,3 ,7 ,22,24,23,5 ,18,24,23,5 ,18,24,24,24,24,23,5 ,18,24,24,24,24,24,24,24,24,24,19,24,24,17,5 ,18,24,24,19,19,19,24,24,24,24,24,24,24,24,16,16,16,24,24,24,24,24,16,16,16,16,16,24,24,24,24,24,17,5 ,18,24,24,24,24,24,24,24,17,5 ,
	5 ,20,16,24,24,16,16,16,16,21,5 ,18,21,4 ,7 ,24,6 ,2 ,18,17,6 ,1 ,18,24,24,24,23,6 ,3 ,18,24,24,24,24,24,24,24,24,23,5 ,18,24,17,5 ,18,24,17,1 ,1 ,7 ,18,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,19,24,24,24,24,24,24,24,24,17,1 ,7 ,22,19,19,19,24,24,24,17,5 ,
	5 ,18,24,24,24,24,19,19,24,17,5 ,18,24,21,3 ,10,1 ,20,24,17,5 ,20,24,24,24,23,6 ,2 ,20,24,24,24,24,24,24,24,24,23,6 ,11,18,24,17,5 ,18,24,24,16,21,5 ,22,19,19,24,24,24,24,24,24,24,24,24,24,24,24,24,17,5 ,22,24,24,24,24,24,24,24,24,21,1 ,4 ,2 ,1 ,7 ,18,24,24,17,5 ,
	5 ,18,24,24,24,17,6 ,7 ,18,17,5 ,18,24,24,21,5 ,20,24,24,23,5 ,18,24,24,23,6 ,4 ,20,24,24,24,24,24,24,24,24,17,2 ,14,11,18,24,17,5 ,18,24,24,24,17,2 ,2 ,3 ,1 ,18,24,24,24,24,24,19,24,24,24,24,24,24,17,3 ,7 ,18,24,24,24,24,24,24,24,24,16,16,16,21,5 ,22,19,19,17,5 ,
	5 ,18,24,24,24,17,2 ,4 ,18,17,5 ,18,24,24,17,5 ,18,24,17,1 ,11,18,24,17,2 ,11,24,24,24,24,24,24,24,24,24,24,24,21,12,1 ,18,24,17,5 ,18,24,24,24,24,16,16,16,16,24,24,24,24,24,17,5 ,22,19,19,24,24,24,24,21,5 ,18,24,24,24,24,24,24,19,19,24,24,24,17,12,1 ,4 ,7 ,24,5 ,
	5 ,18,24,19,19,24,16,16,24,17,5 ,18,24,24,23,5 ,22,24,24,21,5 ,22,24,24,21,3 ,7 ,22,24,24,24,24,24,24,24,24,24,17,2 ,20,24,24,17,5 ,18,24,24,24,24,24,19,19,19,24,19,19,19,19,17,12,10,10,1 ,18,24,24,24,23,5 ,18,24,24,24,24,24,17,6 ,7 ,18,24,19,23,5 ,20,21,5 ,24,5 ,
	5 ,18,17,6 ,7 ,18,24,24,24,17,5 ,18,24,17,1 ,14,4 ,18,24,17,2 ,7 ,18,24,24,21,12,1 ,18,24,24,24,24,24,24,24,24,24,16,24,24,24,17,5 ,18,24,24,24,24,23,6 ,1 ,7 ,24,6 ,2 ,4 ,7 ,24,12,3 ,4 ,20,24,24,24,17,6 ,2 ,18,24,24,24,24,24,17,4 ,1 ,18,17,1 ,2 ,3 ,18,17,2 ,10,9 ,
	5 ,18,17,3 ,4 ,18,24,24,24,17,5 ,18,24,24,21,1 ,20,24,24,24,24,5 ,18,24,24,17,12,24,24,24,24,24,24,24,24,19,24,24,24,24,24,24,17,5 ,18,24,24,24,23,6 ,2 ,0 ,2 ,3 ,1 ,0 ,0 ,5 ,24,5 ,20,16,24,24,24,24,17,5 ,24,19,19,24,24,24,24,24,16,16,24,24,16,16,16,24,24,21,5 ,0 ,
	5 ,18,24,16,16,24,24,24,24,17,5 ,18,24,19,24,16,24,19,19,23,6 ,4 ,18,24,24,23,12,3 ,18,24,24,24,24,24,23,5 ,22,24,24,24,24,24,23,5 ,22,19,24,23,6 ,2 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,1 ,10,3 ,18,24,24,24,24,24,17,2 ,1 ,3 ,7 ,18,24,24,24,24,24,24,19,19,19,19,24,24,24,17,5 ,0 ,
	5 ,22,19,19,19,19,19,19,19,23,5 ,18,23,5 ,22,24,23,6 ,1 ,4 ,2 ,20,24,19,23,6 ,11,24,24,24,24,24,24,24,6 ,13,7 ,18,24,24,24,17,6 ,13,1 ,7 ,24,6 ,9 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ,20,24,19,19,19,24,24,24,16,16,21,5 ,18,24,24,24,24,24,17,6 ,1 ,1 ,1 ,7 ,18,24,17,5 ,0 ,
	8 ,1 ,1 ,1 ,1 ,2 ,2 ,2 ,1 ,2 ,11,24,6 ,1 ,7 ,24,6 ,11,20,16,16,24,23,6 ,1 ,13,13,7 ,22,19,19,19,19,23,5 ,0 ,5 ,18,24,24,19,23,5 ,0 ,0 ,8 ,1 ,9 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,5 ,22,23,6 ,1 ,7 ,22,24,24,24,24,23,5 ,22,19,19,24,24,19,23,5 ,0 ,0 ,0 ,5 ,22,19,23,5 ,0 ,
	0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,8, 1 ,9 ,0 ,8 ,1 ,14,11,22,19,19,23,6 ,9 ,0 ,0 ,0 ,8 ,1 ,1 ,1 ,1 ,1 ,1 ,9 ,0 ,5 ,22,19,23,6 ,1 ,9 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,8 ,1 ,1 ,9 ,0 ,8 ,7 ,22,19,19,23,6 ,14,1 ,1 ,7 ,22,23,6 ,1 ,9 ,0 ,0 ,0 ,8 ,1 ,1 ,1 ,9 ,0 ,
	0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,8 ,1 ,1 ,1 ,1 ,1 ,9 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,8 ,1 ,2 ,1 ,9 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,8 ,1 ,1 ,1 ,1 ,1 ,9 ,0 ,0 ,8 ,1 ,1 ,9 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0
	);
var currentScale = 48;
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
    for (var i = 0; i < slimeDungeonLevelOne.length; i++) {
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

function SorcererVillain(game) {
    this.ctx = game.ctx;
    this.standingAttackAnimation = new Animation(ASSET_MANAGER.getAsset("./img/sorcererVillain.png"), 0, 0, 100, 100, 0.1, 10, true, false);
    this.animation = this.standingAttackAnimation;
	this.moveSpeed = 70;
	this.fleeSpeed = 90;
	this.attackSpeed = 3;
	this.attackInterval = 0.6;
    this.cooldown = 0;
    this.special = 4;
    this.dangerRange = 50;
    this.fleeRange = 100;
    this.startAttackRange = 80;
    this.stopAttackRange = 300;
    this.startFollowRange = 150;
    this.stopFollowRange = 350;
    Entity.call(this, game, 450, 450); // where it starts

}

SorcererVillain.prototype = new Entity();
SorcererVillain.prototype.constructor = SorcererVillain;

SorcererVillain.prototype.update = function () {
    if (this.cooldown > 0) this.cooldown -= gameEngine.clockTick;
    if (this.special > 0) this.cooldown -= gameEngine.clockTick;

    let xOrigC = (character.x + character.animation.frameWidth / 2);
    let yOrigC = (character.y + character.animation.frameHeight / 2);
    let xOrigS = (this.x + this.animation.frameWidth / 2)
    let yOrigS = (this.y + this.animation.frameHeight / 2)
    let xDiff = xOrigC - xOrigS;
    let yDiff = yOrigC - yOrigS;
    let distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);

    if (distance < this.fleeRange) {
        let velX = (this.fleeSpeed * xDiff) / distance;
        let velY = (this.fleeSpeed * yDiff) / distance;

        this.x -= gameEngine.clockTick * velX;
        this.y -= gameEngine.clockTick * velY;

        if (distance < this.dangerRange) this.specialAttack(xDiff, yDiff, distance, xOrigS, yOrigS);
    } else if (this.startAttackRange <= distance && distance <= this.stopAttackRange) {
        this.attack(xDiff, yDiff, distance, xOrigS, yOrigS);
    }

    if (this.startFollowRange <= distance && distance <= this.stopFollowRange) {
        let velX = (this.moveSpeed * xDiff) / distance;
        let velY = (this.moveSpeed * yDiff) / distance;

        this.x += gameEngine.clockTick * velX;
        this.y += gameEngine.clockTick * velY;
    }

	Entity.prototype.update.call(this);
}

SorcererVillain.prototype.attack = function (xDiff, yDiff, distance, xOrigS, yOrigS) {
    if (this.special <= 0) {
        this.specialAttack(xDiff, yDiff, distance, xOrigS, yOrigS);
    } else if (this.cooldown <= 0) {
        this.normalAttack(xDiff, yDiff, distance, xOrigS, yOrigS);
    }
}

SorcererVillain.prototype.normalAttack = function (xDiff, yDiff, distance, xOrigS, yOrigS) {
    let velX = (this.attackSpeed * xDiff) / distance;
    let velY = (this.attackSpeed * yDiff) / distance;

    let projectile = new Projectile(gameEngine,
        xOrigS,
        yOrigS,
        velX,
        velY);
    gameEngine.addEntity(projectile);
    this.cooldown = this.attackInterval;
}

SorcererVillain.prototype.specialAttack = function (xDiff, yDiff, distance, xOrigS, yOrigS) {
    // TODO
}

SorcererVillain.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

function Projectile(game, x, y, xs, ys) {
    this.xs = xs;
    this.ys = ys;
    this.scale = 4;
    this.life = 10;
    Entity.call(this, game, x, y);
}

Projectile.prototype = new Entity();
Projectile.prototype.constructor = Projectile;

Projectile.prototype.update = function () {
    this.x += this.xs;
    this.y += this.ys;
    this.life -= gameEngine.clockTick;
    if (this.life <= 0) this.removeFromWorld = true;
}

Projectile.prototype.draw = function () {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.scale, 0, 2 * Math.PI);
    ctx.fillStyle = `rgb(253,208,157)`;
    ctx.fill();
    ctx.restore();
}

// The entity's origin is determined by its BoundingBox object.
function Character(game) {                                                                                            //loop  reversed
    this.standAnimation = new Animation(ASSET_MANAGER.getAsset("./img/characterIdleAnimation.png"), 0, 0, 42, 42, 0.08, 4, true, false);
    this.walkRightAnimation = new Animation(ASSET_MANAGER.getAsset("./img/characterRightAnimation.png"), 0,  0, 42, 42, 0.15, 6, true, false);
    this.walkUpLeftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/spritesheet.png"), 32,  32, 33, 32, 1.04, 1, true, false);
    this.walkLeftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/characterLeftAnimation.png"),  0,  0, 42, 42, 0.15, 6, true, false);
    this.walkUpRightAnimation = new Animation(ASSET_MANAGER.getAsset("./img/spritesheet.png"),  32,  64, 33, 32, 1.04, 1, true, false);
    this.walkUpAnimation = new Animation(ASSET_MANAGER.getAsset("./img/characterBackwardRun.png"),    0,  0, 42, 42, 0.15, 5, true, false);
    this.walkDownLeftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/spritesheet.png"),    32,  96, 32, 32, 1.04, 1, true, false);
    this.walkDownAnimation = new Animation(ASSET_MANAGER.getAsset("./img/CharacterForwardRun.png"),  0, 0, 42, 42, 0.15, 5, true, false);
    this.walkDownRightAnimation = new Animation(ASSET_MANAGER.getAsset("./img/spritesheet.png"),  32, 128, 32, 32, 1.04, 1, true, false);
    this.attackUpAnimation = new Animation(ASSET_MANAGER.getAsset("./img/characterUpAttack.png"),    0, 0, 42, 42, 0.04, 3, false, false);
	this.attackDownAnimation = new Animation(ASSET_MANAGER.getAsset("./img/characterDownAttack.png"),    0, 0, 42, 42, 0.04, 3, false, false);
	this.attackLeftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/characterLeftAttack.png"),    0, 0, 42, 42, 0.04, 3, false, false);
	this.attackRightAnimation = new Animation(ASSET_MANAGER.getAsset("./img/characterRightAttack.png"),    0, 0, 42, 42, 0.04, 3, false, false);
	this.whirlwindAttackAnimation = new Animation(ASSET_MANAGER.getAsset("./img/characterWhirlWindAttackAnimation.png"),    0, 0, 42, 42, 0.04, 4, false, false);
    this.animation = this.standAnimation; // initial animation.
    this.isAttacking = false;
	this.isWhirlwinding = false;
    this.isMovingLeft = false;
    this.isMovingRight = false;
    this.isMovingUp = false;
    this.isMovingDown = false;
    this.isMovingUpLeft = false;
    this.isMovingUpRight = false;
    this.isMovingDownLeft = false;
    this.isMovingDownRight = false;
    this.radius = 100;
    this.travelSpeed = 2;
    this.boxes = game.debug;         // For debugging, game.debug = true;
    this.scale = 1; // set to 1 if the sprite dimensions are the exact size that should be rendered.
    //console.log(this); // Debugging.
    Entity.call(this, game, 384, 384); // Spawn the entity's upper left corner at these coordinates of the world.
}

Character.prototype = new Entity();

Character.prototype.constructor = Character;

Character.prototype.update = function() {
    this.isMovingUp = false;
    this.isMovingLeft = false;
    this.isMovingDown = false;
    this.isMovingRight = false;
    this.isMovingUpLeft = false;
    this.isMovingUpRight = false;
    this.isMovingDownLeft = false;
    this.isMovingDownRight = false;

	if (this.game.one) { this.isWhirlwinding = true }
    if (this.game.click) { this.isAttacking = true }
    if (this.game.up && this.game.left) this.isMovingUpLeft = true;
    if (this.game.up && this.game.right) this.isMovingUpRight = true;
    if (this.game.down && this.game.left) this.isMovingDownLeft = true;
    if (this.game.down && this.game.right) this.isMovingDownRight = true;
    if (this.game.left)  { this.isMovingLeft = true }
    if (this.game.right) { this.isMovingRight = true }
    if (this.game.up)    { this.isMovingUp = true }
    if (this.game.down)  { this.isMovingDown = true }

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
        if (this.attackRightAnimation.isDone()) {
            this.attackRightAnimation.elapsedTime = 0
            this.isAttacking = false;
        }
		if (this.attackLeftAnimation.isDone()) {
			this.attackLeftAnimation.elapsedTime = 0
            this.isAttacking = false;
		}
		if (this.attackUpAnimation.isDone()) {
			this.attackUpAnimation.elapsedTime = 0
            this.isAttacking = false;
		}
		if (this.attackDownAnimation.isDone()) {
			this.attackDownAnimation.elapsedTime = 0
            this.isAttacking = false;
		}
    }
	if (this.isWhirlwinding) {
		if (this.whirlwindAttackAnimation.isDone()) {
			this.whirlwindAttackAnimation.elapsedTime = 0
            this.isWhirlwinding = false;
		}
	}

    Entity.prototype.update.call(this);
}

Character.prototype.draw = function(ctx) {
    if (this.isAttacking) {
        if (this.isAttacking && this.isMovingUp) {
			this.animation = this.attackUpAnimation;
		} else if (this.isAttacking && this.isMovingLeft) {
			this.animation = this.attackLeftAnimation;
		} else if (this.isAttacking && this.isMovingRight) {
			this.animation = this.attackRightAnimation;
		} else {
			this.animation = this.attackDownAnimation;
		}
    } else if (this.isWhirlwinding) {
        this.animation = this.whirlwindAttackAnimation;
    } else if (this.isMovingUpLeft) {
        this.animation = this.walkUpLeftAnimation;
    } else if (this.isMovingUpRight) {
        this.animation = this.walkUpRightAnimation;
    } else if (this.isMovingDownLeft) {
        this.animation = this.walkDownLeftAnimation;
    } else if (this.isMovingDownRight) {
        this.animation = this.walkDownRightAnimation;
    } else if (this.isMovingUp) {
        this.animation = this.walkUpAnimation;
    } else if (this.isMovingDown) {
        this.animation = this.walkDownAnimation;
    } else if (this.isMovingLeft) {
        this.animation = this.walkLeftAnimation;
    } else if (this.isMovingRight) {
        this.animation = this.walkRightAnimation;
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

let gameEngine;
let character;
let sorcererVillain;
let canvas;
let ctx;

// the "main" code begins here

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload('./img/spritesheet.png');
ASSET_MANAGER.queueDownload("./img/DungeonBackgroundSpriteSheet.png");
ASSET_MANAGER.queueDownload("./img/spritesheet.png");
ASSET_MANAGER.queueDownload("./img/characterIdleAnimation.png");
ASSET_MANAGER.queueDownload("./img/CharacterForwardRun.png");
ASSET_MANAGER.queueDownload("./img/characterBackwardRun.png");
ASSET_MANAGER.queueDownload("./img/characterRightAnimation.png");
ASSET_MANAGER.queueDownload("./img/characterLeftAnimation.png");
ASSET_MANAGER.queueDownload("./img/characterRightAttack.png");
ASSET_MANAGER.queueDownload("./img/characterLeftAttack.png");
ASSET_MANAGER.queueDownload("./img/characterUpAttack.png");
ASSET_MANAGER.queueDownload("./img/characterDownAttack.png");
ASSET_MANAGER.queueDownload("./img/characterWhirlWindAttackAnimation.png");
ASSET_MANAGER.queueDownload("./img/sorcererVillain.png");
ASSET_MANAGER.downloadAll(function() {
    console.log("starting up da sheild");
    canvas = document.getElementById("gameWorld");
    ctx = canvas.getContext("2d");

    gameEngine = new GameEngine(ctx, ctx.canvas.width, ctx.canvas.height);
    var blockthingy = new BlockThingy(gameEngine); // Debugging point of reference until we have an actual map.
    var bg = new Background(gameEngine, ASSET_MANAGER.getAsset("./img/DungeonBackgroundSpriteSheet.png"));
    character = new Character(gameEngine);
	sorcererVillain = new SorcererVillain(gameEngine);
    var centerthingy = new CenterThingy(gameEngine);

    // Initial configuration of entity.
    character.boundingBox.offsetX = 0;
    character.boundingBox.offsetY = 0;
    character.boundingBox.width = 32;   // Left.
    character.boundingBox.height = 32;  // Down.

	gameEngine.addEntity(bg);
    gameEngine.addEntity(character);
	gameEngine.addEntity(sorcererVillain);

    if (gameEngine.debug) gameEngine.addEntity(centerthingy);

    gameEngine.init();
    gameEngine.start();
});