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

function Background(game) {
    Entity.call(this, game, 0, 400);
    this.radius = 200;
}
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
BlockThingy.prototype.update = function() {}
BlockThingy.prototype.draw = function(ctx) {
    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, 20, 800);
    Entity.prototype.draw.call(this);
}

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
    this.standAnimation = new Animation(ASSET_MANAGER.getAsset("./img/spritesheet.png"),     0,   0, 32, 32, 0.04, 5, true, false);
    this.walkRightAnimation = new Animation(ASSET_MANAGER.getAsset("./img/spritesheet.png"), 0,  33, 32, 32, 0.04, 1, true, false);
    this.walkLeftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/spritesheet.png"),  0,  65, 32, 32, 0.04, 1, true, false);
    this.walkUpAnimation = new Animation(ASSET_MANAGER.getAsset("./img/spritesheet.png"),    0,  97, 32, 32, 0.04, 1, true, false);
    this.walkDownAnimation = new Animation(ASSET_MANAGER.getAsset("./img/spritesheet.png"),  0, 129, 32, 32, 0.04, 1, true, false);
    this.attackAnimation = new Animation(ASSET_MANAGER.getAsset("./img/spritesheet.png"),    0, 161, 32, 32, 0.04, 1, true, false);
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
            this.attackAnimation.elapsedTime = 0; //0
            this.isAttacking = false;
        }
    }

    if (this.isMovingLeft && this.walkLeftAnimation.isDone()) {
        this.walkLeftAnimation.elapsedTime = 0; // 0
        this.isMovingLeft = false;
    } else if(this.isMovingRight && this.walkRightAnimation.isDone()) {
        this.walkRightAnimation.elapsedTime = 0; // 0
        this.isMovingRight = false;
    } else  if(this.isMovingUp && this.walkUpAnimation.isDone()) {
        this.walkUpAnimation.elapsedTime = 0; // 0
        this.isMovingUp = false;
    } else if(this.isMovingDown && this.walkDownAnimation.isDone()) {
        this.walkDownAnimation.elapsedTime = 0; // 0
        this.isMovingDown = false;
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

// Put your spritesheet(s) here.
 ASSET_MANAGER.queueDownload("./img/spritesheet.png");

ASSET_MANAGER.downloadAll(function() {
    console.log("starting up da sheild");
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');

    var gameEngine = new GameEngine(ctx.canvas.width, ctx.canvas.height);
    var blockthingy = new BlockThingy(gameEngine); // Debugging point of reference until we have an actual map.
    var bg = new Background(gameEngine); // Debugging point of reference until we have an actual map.
    var character = new Character(gameEngine);
    var centerthingy = new CenterThingy(gameEngine); // Keep this.

    // Initial configuration of entity.
    character.boundingBox.offsetX = 0;
    character.boundingBox.offsetY = 0;
    character.boundingBox.width = 32;   // Left.
    character.boundingBox.height = 32;  // Down.

    gameEngine.addEntity(bg);
    gameEngine.addEntity(character);
    gameEngine.addEntity(blockthingy);

    if (gameEngine.debug) gameEngine.addEntity(centerthingy);

    gameEngine.init(ctx);
    gameEngine.start();
});