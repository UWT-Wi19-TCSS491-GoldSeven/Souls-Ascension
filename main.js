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

function Background(game) {
    Entity.call(this, game, 0, 400);
    this.radius = 200;
}

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

BlockThingy.prototype = new Entity();
BlockThingy.prototype.constructor = Background;

BlockThingy.prototype.update = function() {}

BlockThingy.prototype.draw = function(ctx) {
    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, 20, 800);
    Entity.prototype.draw.call(this);
}

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

    var gameEngine = new GameEngine();
    var blockthingy = new BlockThingy(gameEngine); // Testing.
    var bg = new Background(gameEngine);
    var samurai = new Samurai(gameEngine);

    gameEngine.addEntity(bg);
    gameEngine.addEntity(samurai);
    gameEngine.addEntity(blockthingy);

    gameEngine.init(ctx);
    gameEngine.start();
});