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
    var scaleBy = scaleBy || 0.5; //The size of the sprite. 1 = 100%
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

function BlockThingy(game) {
    Entity.call(this, game, 400, 0);
    this.radius = 200;
}

// The BockThingy is only for testing a point of reference.  OK to delete.
BlockThingy.prototype = new Entity();

BlockThingy.prototype.constructor = Background;

BlockThingy.prototype.update = function() {}

BlockThingy.prototype.draw = function(ctx) {
    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, 20, 800);
    Entity.prototype.draw.call(this);
}

function CenterThingy(game) {
    Entity.call(this, game, 390, 390);
    this.radius = 200;
}

// The BockThingy is only for testing a point of reference.  OK to delete.
CenterThingy.prototype = new Entity();

CenterThingy.prototype.constructor = Background;

CenterThingy.prototype.update = function() {}

CenterThingy.prototype.draw = function(ctx) {
    ctx.fillStyle = "blue";
    ctx.fillRect(390, 390, 20, 20);
    Entity.prototype.draw.call(this);
}

// The entity's origin is determined by its BoundingBox object.
function Samurai(game) {                                                                                               //loop   reversed
    this.alertAnimation = new Animation(ASSET_MANAGER.getAsset("./img/SamuraiHeavy_Alert.png"), 0, 0, 512, 512, 0.04, 9, true, false);
    this.standAnimation = new Animation(ASSET_MANAGER.getAsset("./img/SamuraiHeavy_Stand.png"), 0, 0, 512, 512, 0.04, 10, true, false);
    this.walkAnimation = new Animation(ASSET_MANAGER.getAsset("./img/SamuraiHeavy_Walk.png"), 0, 0, 512, 512, 0.04, 10, false, false);
    this.runAnimation = new Animation(ASSET_MANAGER.getAsset("./img/SamuraiHeavy_Run.png"), 0, 0, 512, 512, 0.02, 10, false, false);
    this.attackAnimation = new Animation(ASSET_MANAGER.getAsset("./img/SamuraiHeavy_Attack.png"), 0, 0, 512, 512, 0.04, 10, false, false);
    this.hitAnimation = new Animation(ASSET_MANAGER.getAsset("./img/SamuraiHeavy_Hit.png"), 0, 0, 512, 512, 0.04, 10, false, false);
    this.dieAnimation = new Animation(ASSET_MANAGER.getAsset("./img/SamuraiHeavy_Die.png"), 0, 0, 512, 512, 0.04, 10, false, false);
    this.animation = this.standAnimation; // initial animation.
    this.isAttacking = false;
    this.isMovingLeft = false;
    this.isMovingRight = false;
    this.isMovingUp = false;
    this.isMovingDown = false;
    this.radius = 100;
    this.travelSpeed = 8;
    this.boxes = game.debug;         // For debugging, game.debug = true;
    this.scale = 0.5;
    //console.log(this); // Debugging.
    Entity.call(this, game, 211, 299); // Spawn the entity's upper left corner at these coordinates of the world.
}

Samurai.prototype = new Entity();
Samurai.prototype.constructor = Samurai;

Samurai.prototype.update = function() {
    this.game.ctx.clearRect(0, 0, this.game.ctx.canvas.width, this.game.ctx.canvas.height);;
    this.game.ctx.save();
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
        this.game.ctx.translate(0,this.travelSpeed);  // Screen-in-world movement.
        this.game.ctx.save();
        this.y -= this.travelSpeed; // Moves the entity.
    } else if (this.isMovingDown) {
        this.game.origin.y += this.travelSpeed;
        this.game.ctx.translate(0,-this.travelSpeed);
        this.game.ctx.save();
        this.y += this.travelSpeed;
    }

    if(this.isMovingLeft) {
        var speed = this.travelSpeed;
        this.game.origin.x -= speed;
        this.game.ctx.translate(speed,0);
        this.game.ctx.save();
        this.x -= this.travelSpeed; // Moves the entity.
    } else if (this.isMovingRight) {
        var speed = this.travelSpeed;
        this.game.origin.x += speed;
        this.game.ctx.translate(-speed,0);
        this.game.ctx.save();
        this.x += this.travelSpeed;
    }
    //console.log("Origin " + this.game.origin.x + "," + this.game.origin.y); // Debugging.
    //console.log("Entity " + this.x + "," + this.y); // Debugging.
    
    // The boundingBox follows the entity.
    this.boundingBox.x = this.x;
    this.boundingBox.y = this.y;

    if (this.isAttacking) {
        if (this.attackAnimation.isDone()) {
            this.attackAnimation.elapsedTime = 0;
            this.isAttacking = false;
        }
    }
    Entity.prototype.update.call(this);
}

Samurai.prototype.draw = function(ctx) {
    if (this.isMovingUp || this.isMovingDown || this.isMovingLeft || this.isMovingRight) {
        this.animation = this.runAnimation;
    } else if (this.isAttacking) {
        this.animation = this.attackAnimation;
    } else {
         this.animation = this.standAnimation;
    }
    this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    //console.log("Entity is (" + this.x + "," + this.y +")"); // Debugging.
    if(this.boxes) {
        ctx.strokeStyle = "green";
        ctx.strokeRect(this.boundingBox.x, this.boundingBox.y, this.boundingBox.width, this.boundingBox.height); //this.animation.width, this.animation.height);
        ctx.strokeStyle = "orange";
        ctx.strokeRect(this.x, this.y, this.animation.frameWidth*this.scale, this.animation.frameHeight*this.scale); //
        //console.log('BoundingBox: ' + this.boundingBox.x + ',' + this.boundingBox.y); // Debugging.
    }
    Entity.prototype.draw.call(this);
}

// the "main" code begins here

var ASSET_MANAGER = new AssetManager();

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

    var gameEngine = new GameEngine(ctx.canvas.width, ctx.canvas.height);
    var blockthingy = new BlockThingy(gameEngine); // Debugging point of reference until we have an actual map.
    var bg = new Background(gameEngine); // Debugging point of reference until we have an actual map.
    var samurai = new Samurai(gameEngine);
    var centerthingy = new CenterThingy(gameEngine);
    // Initial configuration of entity.
    samurai.boundingBox.offsetX = 130;
    samurai.boundingBox.offsetY = 36;
    samurai.boundingBox.width = 117;   // Left.
    samurai.boundingBox.height = 128;  // Down.
    //var newX = samurai.x - samurai.boundingBox.origin.x;
    //var newY = samurai.y - samurai.boundingBox.origin.y;
    //samurai.x = 211; // center
    //samurai.y = 299; // center

    gameEngine.addEntity(bg);
    gameEngine.addEntity(samurai);
    gameEngine.addEntity(blockthingy);
    if (gameEngine.debug) gameEngine.addEntity(centerthingy);

    gameEngine.init(ctx);
    gameEngine.start();
});