/*----------------------------------------------Boiler Code Start-------------------------------------------------------------------------------------------- */
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
Animation.prototype.drawFrame = function (tick, ctx, x, y, scaleBy) {
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
Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}
Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}
/*----------------------------------------------Boiler Code End---------------------------------------------------------------------------------------------- */

/*----------------------------------------------Dungeon Procedural Generation Start-------------------------------------------------------------------------- */
// random number generator
function generateRandomNumber(minValue, maxValue) {
    let randomNumber = Math.random() * (maxValue - minValue) + minValue;
    return Math.floor(randomNumber);
}
// Base shapes
// create rectangle room
function generateRectangle(minX, maxX, minY, maxY) {
    var x = generateRandomNumber(minX, maxX);
    var y = generateRandomNumber(minY, maxY);
    var recArea = x * y;
    var rectangle = new Array(recArea);
    var currentLevel = 1;
    for (var i = 0; i < recArea; i++) {
        if (((i > recArea - x - 1) && i != recArea - 1) || (i < x && i != 0)) {
            rectangle[i] = 2;
        }
        else if ((i % x == 0) || ((i + 1) % x == 0)) {
            rectangle[i] = 1;
        }
        else {
            rectangle[i] = 7;
        }
    }
    rectangle[0] = 3;
    rectangle[x - 1] = 4;
    rectangle[recArea - x] = 5;
    rectangle[recArea - 1] = 6;
    rectangle.push(x);
    rectangle.push(y);
    return rectangle;
}

// Generate world1 object.
var world1 = new World1();

function damgeStat() {
    this.x = 0;
    this.y = 0;
    this.damged = 0;
    this.exp = 0;
    this.time = new Date().getTime();

}
damgeStat.prototype = new Entity();
damgeStat.prototype.constructor = damgeStat;
damgeStat.prototype.update = function () {
    Entity.prototype.update.call(this);
}
damgeStat.prototype.draw = function () {
    if (this.damged !== 0) {
        ctx.fillStyle = "red";
        ctx.font = "30px Arial";
        ctx.fillText(" - " + this.damged, this.x, this.y);
    }
    if (this.exp !== 0) {
        ctx.fillStyle = "blue";
        ctx.font = "30px Arial";
        ctx.fillText(" + " + this.exp + 'Exp', this.x + 10, this.y + 10);
    }
}
/*----------------------------------------------Character Information-------------------------------------------------------------------------------- */
function CharacterInfo(image, hpImage) {
    this.x = 0;
    this.y = 0;
    this.w = 512;
    this.h = 512;
    this.image = image;
    this.hpImange = hpImage;
};

CharacterInfo.prototype = new Entity();
CharacterInfo.prototype.constructor = CharacterInfo;
CharacterInfo.prototype.update = function () { }
CharacterInfo.prototype.draw = function () {
    var x = character.x - 380;
    var y = character.y - 380;
    //var gradient = this.ctx.createLinearGradient(0, 0, 100, 0);
    //gradient.addColorStop("0", " magenta");
    //gradient.addColorStop("0.5", "blue");
    //gradient.addColorStop("1.0", "white");
    // Fill with gradient
    ctx.drawImage(this.image, x, y, 100, 100);
    ctx.drawImage(this.hpImange, x, y + 200, 40, 40);
    ctx.fillStyle = "#0F0";
    ctx.fillText("Level " + character.level + ' / Soul level ' + character.soul, x + 100, y + 40);
    ctx.fillStyle = "white";
    ctx.fillText("HP " + character.currentHealth + '/' + character.maxHealth, x + 101, y + 59);
    ctx.fillText("H", x + 30, y + 235);
    ctx.fillText(character.inventory['hp'].quantity, x + 5, y + 210);
    ctx.fillStyle = "white";
    ctx.fillText("EXP " + character.currentExp + '/' + character.levelExp, x + 100, y + 75);
    ctx.fillStyle = "white";
    ctx.fillText("Soul " + character.currentSoul + '/' + character.levelSoul, x + 100, y + 90);
    if (character.currentSoul > character.levelSoul) {
        character.currentSoul = character.currentSoul - character.levelSoul;
        character.soul++;
        character.levelSoul *= character.soul;
    }
    if (character.currentExp > character.levelExp) {
        character.currentExp = character.currentExp - character.levelExp;
        character.level++;
        character.maxHealth += character.maxHealth * character.level / 10;
        character.levelExp *= character.level;
        character.currentHealth = character.maxHealth;
    }
};
/*----------------------------------------------End character information--------------------------------------------------------------------------------- */


/*----------------------------------------------BSP TREE Start----------------------------------------------------------------------------------------------- */

var Tree = function (leaf) {
    this.leaf = leaf
    this.lchild = undefined
    this.rchild = undefined
}

Tree.prototype.getLeafs = function () {
    if (this.lchild === undefined && this.rchild === undefined)
        return [this.leaf]
    else
        return [].concat(this.lchild.getLeafs(), this.rchild.getLeafs())
}

Tree.prototype.getLevel = function (level, queue) {
    if (queue === undefined)
        queue = []
    if (level == 1) {
        queue.push(this)
    } else {
        if (this.lchild !== undefined)
            this.lchild.getLevel(level - 1, queue)
        if (this.rchild !== undefined)
            this.rchild.getLevel(level - 1, queue)
    }
    return queue
}
var Point = function (x, y) {
    this.x = x;
    this.y = y;
}
var Door = function (x, y, position) {
    this.x = x;
    this.y = y;
    this.position = position;
    this.removed = false;
}
//a container prototype.
var Container = function (x, y, w, h) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.walls = [];
    this.center = new Point(
        this.x + (this.w / 2),
        this.y + (this.h / 2)
    )
}
Container.prototype.pushWall = function (theX, theY, thePosition, code) {//position #0 is a door
    let point = new Point(theX, theY);
    if (code === 15) { //door
        point = new Door(theX, theY, thePosition);
    }
    if (this.x <= theX + world1.currentScale / 2 && theX + world1.currentScale / 2 < this.x + this.w
        && this.y <= theY + world1.currentScale / 2 && theY + world1.currentScale / 2 < this.y + this.h) {
        this.walls.push(point);
    } else if (this.x <= theX && theX < this.x + this.w
        && this.y <= theY && theY < this.y + this.h) {
        this.walls.push(point);
    } else if (this.x <= theX && theX < this.x + this.w
        && this.y <= theY + world1.currentScale && theY + world1.currentScale < this.y + this.h) {
        this.walls.push(point);
    }
}
Container.prototype.paint = function (c) {
    c.strokeStyle = "#0F0"
    c.lineWidth = 2
    c.strokeRect(this.x * SQUARE, this.y * SQUARE,
        this.w * SQUARE, this.h * SQUARE)
}
// build this tree
function split_container(container, iter) {
    var root = new Tree(container)
    if (iter != 0) {
        var sr = random_split(container)
        root.lchild = split_container(sr[0], iter - 1)
        root.rchild = split_container(sr[1], iter - 1)
    }
    return root
}
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
function random_split(container) {
    var r1, r2
    if (random(0, 1) == 0) {
        // Vertical
        r1 = new Container(
            container.x, container.y,             // r1.x, r1.y
            random(1, container.w), container.h   // r1.w, r1.h
        )
        r2 = new Container(
            container.x + r1.w, container.y,      // r2.x, r2.y
            container.w - r1.w, container.h       // r2.w, r2.h
        )

        if (DISCARD_BY_RATIO) {
            var r1_w_ratio = r1.w / r1.h
            var r2_w_ratio = r2.w / r2.h
            if (r1_w_ratio < W_RATIO || r2_w_ratio < W_RATIO) {
                return random_split(container)
            }
        }
    } else {
        // Horizontal
        r1 = new Container(
            container.x, container.y,             // r1.x, r1.y
            container.w, random(1, container.h)   // r1.w, r1.h
        )
        r2 = new Container(
            container.x, container.y + r1.h,      // r2.x, r2.y
            container.w, container.h - r1.h       // r2.w, r2.h
        )

        if (DISCARD_BY_RATIO) {
            var r1_h_ratio = r1.h / r1.w
            var r2_h_ratio = r2.h / r2.w
            if (r1_h_ratio < H_RATIO || r2_h_ratio < H_RATIO) {
                return random_split(container)
            }
        }
    }
    return [r1, r2]
}

const mapWidth = world1.currentWTiles * world1.currentScale + world1.currentScale;
const mapHeight = (world1.slimeDungeonLevelOne.length / world1.currentWTiles) * world1.currentScale;
var MAP_SIZE = world1.currentScale;
var SQUARE = world1.currentWTiles;
var N_ITERATIONS = 6;
var DISCARD_BY_RATIO = true;
var H_RATIO = 0.45;
var W_RATIO = 0.45;
var main_container = new Container(0, 0, mapWidth, mapHeight);
var container_tree = split_container(main_container, N_ITERATIONS);

var leafs = container_tree.getLeafs();


function fillBSPTree(target) {//, background) {

    var x = 0;
    var y = 0;
    var count = 0;
    for (var i = 0; i <= target.length; i++) {
        if (count >= world1.currentWTiles) // change the value based on how many tiles you will draw. (88 atm)
        {
            x = 0;
            y += world1.currentScale;
            count = 0;
        }
        if (15 >= target[i] && target[i] >= 0) { //wall code
            x = count * world1.currentScale;
            //and the wall into property container
            for (var j = 0; j < leafs.length; j++) leafs[j].pushWall(x, y, i, target[i]);//i position, target = code
        }

        count++;
    };
}
fillBSPTree(world1.slimeDungeonLevelOne);
/*----------------------------------------------BSP TREE End------------------------------------------------------------------------------------------------- */

/*----------------------------------------------Collision Start---------------------------------------------------------------------------------------------- */
var Collision = function (entity, killable, width, height) {
    this.Entity = entity;
    this.killable = false;
    this.w = width;
    this.h = height;
};
// if enemies got kill (empty health) override
//entityPosition  is position in array of entities
function isCollise(targetX, targetY, targetW, targetH, entity, entityW, entityH) {
    if (!entity.killable) return false;

    if (entity.x < targetX + targetW &&
        entity.x + entityW > targetX &&
        entity.y < targetY + targetH &&
        entity.y + entityH > targetY) {
        return true;
    }
    return false;
}
//var isColli = false;
function collisionDetect(characterX, characterY, width) {
    var targetX, targetY;
    var j; // area to check collision
    for (j = 0; j < leafs.length; j++) {
        if (leafs[j].x <= characterX && characterX <= leafs[j].x + leafs[j].w
            && leafs[j].y <= characterY && characterY <= leafs[j].y + leafs[j].h) {
            break;
        }
    }
    if (typeof leafs[j] === 'undefined') return true;
    for (var i = 0; i < leafs[j].walls.length; i++) {
        targetX = leafs[j].walls[i].x;
        targetY = leafs[j].walls[i].y;
        targetX = leafs[j].walls[i].x;
        targetY = leafs[j].walls[i].y;
        if (characterX < targetX + world1.currentScale &&// - width for more percise when work with character
            characterX + world1.currentScale - width > targetX &&
            characterY < targetY + world1.currentScale &&
            characterY > targetY) {
            if (leafs[j].walls[i] instanceof Door == true && character.inventory['SilverKey'] > 0) {
                leafs[j].walls[i].removed = true;
                character.inventory['SilverKey'] -= 1;
                world1.slimeDungeonLevelOne[leafs[j].walls[i].position] = 24; // center floor.
                removeDoor(characterX, characterY,width); //remove opened door
                return false;
            }
            return true;
        }
    }
    return false;
}
const removeDoor = (characterX, characterY, width) => {
    var targetX, targetY;
    var j; // area to check collision
    for (j = 0; j < leafs.length; j++) {

        for (var i = 0; i < leafs[j].walls.length; i++) {
            targetX = leafs[j].walls[i].x;
            targetY = leafs[j].walls[i].y;
            targetX = leafs[j].walls[i].x;
            targetY = leafs[j].walls[i].y;
            if (characterX < targetX + world1.currentScale &&// - width for more percise when work with character
                characterX + world1.currentScale - width > targetX &&
                characterY < targetY + world1.currentScale &&
                characterY > targetY) { leafs[j].walls.splice(i, 1); }
        }
    }
}

Container.prototype.pushWall = function (theX, theY, thePosition, code) {//position #0 is a door
    let point = new Point(theX, theY);
    if (code === 15) { //door
        point = new Door(theX, theY, thePosition);
    }
    if (this.x <= theX + world1.currentScale / 2 && theX + world1.currentScale / 2 < this.x + this.w
        && this.y <= theY + world1.currentScale / 2 && theY + world1.currentScale / 2 < this.y + this.h) {
        leafs[i].walls.splice(j, 1); //remove opened door
    } else if (this.x <= theX && theX < this.x + this.w
        && this.y <= theY && theY < this.y + this.h) {
        leafs[i].walls.splice(j, 1); //remove opened door
    } else if (this.x <= theX && theX < this.x + this.w
        && this.y <= theY + world1.currentScale && theY + world1.currentScale < this.y + this.h) {
        leafs[i].walls.splice(j, 1); //remove opened door
    }
}
/*----------------------------------------------Collision End------------------------------------------------------------------------------------------------ */
/*----------------------------------------------Health Start------------------------------------------------------------------------------------------------ */
var bug = 0;
const drawHPBar = () => {
    var entity;
    for (var i = 0; i < gameEngine.entities.length - 1; i++) {
        entity = gameEngine.entities[i];
        ctx.strokeStyle = "red";
        if (entity.maxHealth > 0 && gameEngine.entities[i] instanceof Character != true) {
            ctx.strokeRect(entity.x + 15, entity.y, 50, 3);
            ctx.fillRect(entity.x + 15, entity.y, 50 * entity.currentHealth / entity.maxHealth, 3);
        }
    }
    ctx.strokeStyle = "#b00642";
    ctx.strokeRect(character.x - 279, character.y - 330, 100, 10);
    ctx.fillStyle = "#9a065f";
    ctx.fillRect(character.x - 279, character.y - 329, 100 * character.currentHealth / character.maxHealth, 8);
    ctx.strokeStyle = "#0FF";
    ctx.strokeRect(character.x - 280, character.y - 315, 100, 10);
    ctx.fillStyle = "blue";
    ctx.fillRect(character.x - 280, character.y - 314, 100 * character.currentExp / character.levelExp, 8);
    ctx.strokeStyle = "#0CF";
    ctx.strokeRect(character.x - 280, character.y - 300, 100, 10);
    ctx.fillStyle = "blue";
    ctx.fillRect(character.x - 280, character.y - 299, 100 * character.currentSoul / character.levelSoul, 8);
}

/*----------------------------------------------Health End------------------------------------------------------------------------------------------------ */
/*----------------------------------------------Torch Start-------------------------------------------------------------------------------------------------- */
function Torch(x, y) {
    this.flameAnimation = new Animation(ASSET_MANAGER.getAsset("./img/torchAnimation.png"), 0, 0, 48, 48, 0.1, 4, true, world1.currentScale);
    this.killable = false;
    Entity.call(this, gameEngine, x, y);// where it starts
}

Torch.prototype = new Entity();
Torch.prototype.constructor = Torch;

Torch.prototype.update = function () {
    Entity.prototype.update.call(this);
}
Torch.prototype.draw = function () {
    this.flameAnimation.drawFrame(gameEngine.clockTick, ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
};
/*----------------------------------------------Torch End---------------------------------------------------------------------------------------------------- */

/*----------------------------------------------Silver Key Start--------------------------------------------------------------------------------------------- */
function SilverKey(x, y) {
    this.silverKeyAnimation = new Animation(ASSET_MANAGER.getAsset("./img/SilverKeyAnimation.png"), 0, 0, 48, 48, 0.1, 4, true, world1.currentScale);
    this.killable = true;
    Entity.call(this, gameEngine, x, y);// where it starts
}

SilverKey.prototype = new Entity();
SilverKey.prototype.constructor = SilverKey;

SilverKey.prototype.update = function () {
    Entity.prototype.update.call(this);
}
SilverKey.prototype.draw = function () {
    this.silverKeyAnimation.drawFrame(gameEngine.clockTick, ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
};
/*----------------------------------------------Silver Key End----------------------------------------------------------------------------------------------- */

/*----------------------------------------------Gold Key Start----------------------------------------------------------------------------------------------- */
function GoldKey(x, y) {
    this.goldKeyAnimation = new Animation(ASSET_MANAGER.getAsset("./img/GoldKeyAnimation.png"), 0, 0, 48, 48, 0.1, 4, true, world1.currentScale);
    this.killable = true;
    Entity.call(this, gameEngine, x, y);// where it starts
}

GoldKey.prototype = new Entity();
GoldKey.prototype.constructor = GoldKey;

GoldKey.prototype.update = function () {
    Entity.prototype.update.call(this);
}
GoldKey.prototype.draw = function () {
    this.goldKeyAnimation.drawFrame(gameEngine.clockTick, ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
};
/*----------------------------------------------Gold Key End------------------------------------------------------------------------------------------------- */

/*----------------------------------------------Healing Potion Start----------------------------------------------------------------------------------------- */
function HealingPotion(x, y) {
    this.sparkleAnimation = new Animation(ASSET_MANAGER.getAsset("./img/HealthPotionAnimation.png"), 0, 0, 48, 48, 0.1, 4, true, world1.currentScale);
    this.killable = true;
    this.health = 100;
    this.toX = 0;
    this.toY = 0;
    this.killed = false;
    this.life = 2;
    Entity.call(this, gameEngine, x, y);// where it starts
}

HealingPotion.prototype = new Entity();
HealingPotion.prototype.constructor = HealingPotion;

HealingPotion.prototype.update = function () {
    this.x += this.toX;
    this.y += this.toY;
    if (this.killed) this.life -= gameEngine.clockTick;
    if (this.life <= 0) this.removeFromWorld = true;
    Entity.prototype.update.call(this);
}
HealingPotion.prototype.draw = function () {
    if (this.x >= character.x - 280)
        this.sparkleAnimation.drawFrame(gameEngine.clockTick, ctx, this.x, this.y);
    if (!this.killed) this.sparkleAnimation.drawFrame(gameEngine.clockTick, ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
};
/*----------------------------------------------Healing Potion end------------------------------------------------------------------------------------------- */

/*----------------------------------------------Soul Jar Start----------------------------------------------------------------------------------------------- */
function SoulJar(x, y) {
    this.sparkleAnimation = new Animation(ASSET_MANAGER.getAsset("./img/SoulJarAnimation.png"), 0, 0, 48, 48, 0.1, 4, true, world1.currentScale);
    this.killable = true;
    this.jar = 100;
    this.toX = 0;
    this.toY = 0;
    this.killed = false;
    this.life = 2;
    Entity.call(this, gameEngine, x, y);// where it starts
}

SoulJar.prototype = new Entity();
SoulJar.prototype.constructor = SoulJar;

SoulJar.prototype.update = function () {
    this.x += this.toX;
    this.y += this.toY;
    if (this.killed) this.life -= gameEngine.clockTick;
    if (this.life <= 0) { this.removeFromWorld = true; }
    Entity.prototype.update.call(this);
}
SoulJar.prototype.draw = function () {
    if (this.x >= character.x - 280)
        this.sparkleAnimation.drawFrame(gameEngine.clockTick, ctx, this.x, this.y);
    if (!this.killed) this.sparkleAnimation.drawFrame(gameEngine.clockTick, ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
};

/*----------------------------------------------Soul Jar end------------------------------------------------------------------------------------------------- */

/*----------------------------------------------SlimeBehemoth Start------------------------------------------------------------------------------------------ */
function SlimeBehemoth(startingX, startingY) {
    this.slimeBehemothWalkingLeftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/SlimeBehemothWalkingLeft.png"), 0, 0, 80, 68, 0.1, 8, true, false);
    this.slimeBehemothWalkingRightAnimation = new Animation(ASSET_MANAGER.getAsset("./img/SlimeBehemothWalkingRight.png"), 0, 0, 80, 68, 0.1, 8, true, false);
	this.slimeBehemothAttackLeftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/SlimeBehemothAttackLeft.png"), 0, 0, 117, 68, 0.1, 8, true, false);
    this.slimeBehemothAttackRightAnimation = new Animation(ASSET_MANAGER.getAsset("./img/SlimeBehemothAttackRight.png"), 0, 0, 120, 68, 0.1, 8, true, false);
    this.death = null;
    this.animation = this.slimeBehemothWalkingRightAnimation;
    this.isMovingWest = true;
    this.isMovingEast = false;
    this.moveSpeed = 70;
    this.attackSpeed = 3;
    this.attackInterval = 0.6;
    this.startAttackRange = 80;
    this.stopAttackRange = 300;
    this.startFollowRange = 150;
    this.stopFollowRange = 350;
    this.maxHealth = 500;
    this.currentHealth = 500;
    this.killable = true;
    Entity.call(this, gameEngine, startingX, startingY - 30); // where it starts

}

SlimeBehemoth.prototype = new Entity();
SlimeBehemoth.prototype.constructor = SlimeBehemoth;

SlimeBehemoth.prototype.update = function () {

        let xOrigC = (character.x + character.animation.frameWidth / 2);
        let yOrigC = (character.y + character.animation.frameHeight / 2);
        let xOrigS = (this.x + this.animation.frameWidth / 2)
        let yOrigS = (this.y + this.animation.frameHeight / 2)
        let xDiff = xOrigC - xOrigS;
        let yDiff = yOrigC - yOrigS;
        let distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);

        if (this.x < 230 && this.isMovingWest) {
            this.isMovingEast = true;
            this.isMovingWest = false;
            this.x += gameEngine.clockTick * this.moveSpeed;
        }
        if (this.x > 1210 && this.isMovingEast) {
            this.isMovingEast = false;
            this.isMovingWest = true;
            this.x -= gameEngine.clockTick * this.moveSpeed;
        }
        if (this.isMovingEast) {
            this.x += gameEngine.clockTick * this.moveSpeed;
        }
        if (this.isMovingWest) {
            this.x -= gameEngine.clockTick * this.moveSpeed;
        }

    Entity.prototype.update.call(this);
}
SlimeBehemoth.prototype.normalAttack = function (xDiff, yDiff, distance, xOrigS, yOrigS) {
    // to do
}
SlimeBehemoth.prototype.draw = function () {
    if (this.isMovingWest) {
        this.animation = this.slimeBehemothWalkingLeftAnimation;
    } else {
        this.animation = this.slimeBehemothWalkingRightAnimation;
    }
    this.animation.drawFrame(gameEngine.clockTick, ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}
/*----------------------------------------------SlimeBehemoth End-------------------------------------------------------------------------------------------- */

/*----------------------------------------------SlimeEnemy Start--------------------------------------------------------------------------------------------- */
function SlimeEnemy(startingX, startingY) {
    this.slimeEnemyWalkingLeftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/SlimeWalkLeft.png"), 0, 0, 80, 80, 0.1, 8, true, false);
    this.slimeEnemyWalkingRightAnimation = new Animation(ASSET_MANAGER.getAsset("./img/SlimeWalkRight.png"), 0, 0, 80, 80, 0.1, 8, true, false);
	this.slimeEnemyAttackLeftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/SlimeAttackLeft.png"), 0, 0, 80, 80, 0.1, 10, true, false);
    this.slimeEnemyAttackRightAnimation = new Animation(ASSET_MANAGER.getAsset("./img/SlimeAttackRight.png"), 0, 0, 80, 80, 0.1, 10, true, false);
	this.slimeEnemyIdleAnimation = new Animation(ASSET_MANAGER.getAsset("./img/SlimeIdle.png"), 0, 0, 80, 80, 0.1, 8, true, false);
    this.death = new Animation(ASSET_MANAGER.getAsset("./img/SlimeDeath.png"), 0, 0, 80, 80, 0.1, 8, true, false);
    this.animation = this.slimeEnemyIdleAnimation;
    this.isMovingWest = false;
    this.isMovingEast = false;
    this.moveSpeed = 40;
	this.fleeSpeed = 10;
    this.cooldown = 0;
    this.special = 4;
    this.dangerRange = 1;
    this.fleeRange = 1;
    this.attackSpeed = 3;
    this.attackInterval = 2;
    this.startAttackRange = 80;
    this.stopAttackRange = 300;
    this.startFollowRange = 150;
    this.stopFollowRange = 350;
    this.maxHealth = 300;
    this.currentHealth = 300;
    this.hasDied = false;
    this.life = 1;
    this.killable = true;


    Entity.call(this, gameEngine, startingX - 50, startingY - 15); // where it starts

}

SlimeEnemy.prototype = new Entity();
SlimeEnemy.prototype.constructor = SlimeEnemy;

SlimeEnemy.prototype.update = function () {
    if (this.cooldown > 0) this.cooldown -= gameEngine.clockTick;
    if (this.special > 0) this.cooldown -= gameEngine.clockTick;
    let canMove = false;
    let xOrigC = (character.x + character.animation.frameWidth / 2);
    let yOrigC = (character.y + character.animation.frameHeight / 2);
    let xOrigS = (this.x + this.animation.frameWidth / 2)
    let yOrigS = (this.y + this.animation.frameHeight / 2)
    let xDiff = xOrigC - xOrigS;
    let yDiff = yOrigC - yOrigS;
    let distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
    let origX = this.x;
    let origY = this.y;


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
    if (!collisionDetect(this.x + 20, 55 + this.y, 20)) { canMove = true }
    if (!canMove) {
        this.x = origX;
        this.y = origY;
    }
    Entity.prototype.update.call(this);
}
SlimeEnemy.prototype.attack = function (xDiff, yDiff, distance, xOrigS, yOrigS) {
    if (this.special <= 0) {
        this.specialAttack(xDiff, yDiff, distance, xOrigS, yOrigS);
    } else if (this.cooldown <= 0) {
        this.normalAttack(xDiff, yDiff, distance, xOrigS, yOrigS);
    }
}

SlimeEnemy.prototype.normalAttack = function (xDiff, yDiff, distance, xOrigS, yOrigS) {
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
SlimeEnemy.prototype.specialAttack = function (xDiff, yDiff, distance, xOrigS, yOrigS) {
    // TODO
}
SlimeEnemy.prototype.draw = function () {
    if (this.animation !== this.death) {
        if (this.isMovingWest) {
            this.animation = this.slimeEnemyWalkingLeftAnimation;
        } else if (this.isMovingEast) {
            this.animation = this.slimeEnemyWalkingRightAnimation;
        } else if (this.isAttackingLeft) {
            this.animation = this.slimeEnemyAttackLeftAnimation;
        } else if (this.isAttackingRight) {
            this.animation = this.slimeEnemyAttackRightAnimation;
        } else if (this.currentHealth == 0 && !this.hasDied) {
            this.animation = this.slimeEnemyDeathAnimation;
            this.hasDied = true;
        } else {
            this.animation = this.slimeEnemyIdleAnimation;
        }
    }
    this.animation.drawFrame(gameEngine.clockTick, ctx, this.x, this.y);
    if (this.animation === this.death) {
        this.life -= gameEngine.clockTick;
        if (this.life <= 0) this.removeFromWorld = true;
    }
    Entity.prototype.draw.call(this);
}
/*----------------------------------------------SlimeEnemy End---------------------------------------------------------------------------------------------- */

/*----------------------------------------------Skeleton Start---------------------------------------------------------------------------------------------- */
function Skeleton(game, startingX, startingY) {
    this.ctx = game.ctx;
    this.skeletonWalkingLeftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/SkeletonWalkLeft.png"), 0, 0, 44, 66, 0.1, 13, true, false);
    this.skeletonWalkingRightAnimation = new Animation(ASSET_MANAGER.getAsset("./img/SkeletonWalkRight.png"), 0, 0, 44, 66, 0.1, 13, true, false);
    this.death = null;
    this.animation = this.skeletonWalkingRightAnimation;
    this.isMovingWest = true;
    this.isMovingEast = false;
    this.moveSpeed = 30;
    this.attackSpeed = 3;
    this.attackInterval = 0.6;
    this.startAttackRange = 80;
    this.stopAttackRange = 300;
    this.startFollowRange = 150;
    this.stopFollowRange = 350;
    this.maxHealth = 1000;
    this.currentHealth = 1000;
    this.killable = true;
    Entity.call(this, game, startingX - 50, startingY - 25); // where it starts

}

Skeleton.prototype = new Entity();
Skeleton.prototype.constructor = Skeleton;

Skeleton.prototype.update = function () {
    let xOrigC = (character.x + character.animation.frameWidth / 2);
    let yOrigC = (character.y + character.animation.frameHeight / 2);
    let xOrigS = (this.x + this.animation.frameWidth / 2)
    let yOrigS = (this.y + this.animation.frameHeight / 2)
    let xDiff = xOrigC - xOrigS;
    let yDiff = yOrigC - yOrigS;
    let distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);

    if (this.x < 2550 && this.isMovingWest) {
        this.isMovingEast = true;
        this.isMovingWest = false;
        this.x += gameEngine.clockTick * this.moveSpeed;
    }
    if (this.x > 3380 && this.isMovingEast) {
        this.isMovingEast = false;
        this.isMovingWest = true;
        this.x -= gameEngine.clockTick * this.moveSpeed;
    }
    if (this.isMovingEast) {
        this.x += gameEngine.clockTick * this.moveSpeed;
    }
    if (this.isMovingWest) {
        this.x -= gameEngine.clockTick * this.moveSpeed;
    }
    Entity.prototype.update.call(this);
}
Skeleton.prototype.normalAttack = function (xDiff, yDiff, distance, xOrigS, yOrigS) {
    // to do
}
Skeleton.prototype.draw = function () {
    if (this.isMovingWest) {
        this.animation = this.skeletonWalkingLeftAnimation;
    } else {
        this.animation = this.skeletonWalkingRightAnimation;
    }
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}
/*----------------------------------------------Skeleton End------------------------------------------------------------------------------------------------- */

/*----------------------------------------------Wizard Start------------------------------------------------------------------------------------------------ */
function Wizard(game, startingX, startingY) {
    this.ctx = game.ctx;
    this.wizardWalkingLeftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/wizardWalkLeft.png"), 0, 0, 80, 80, 0.1, 6, true, false);
    this.wizardWalkingRightAnimation = new Animation(ASSET_MANAGER.getAsset("./img/wizardWalkRight.png"), 0, 0, 80, 80, 0.1, 6, true, false);
	this.wizardAttackLeftAnimation = new Animation(ASSET_MANAGER.getAsset("./img/wizardAttackLeft.png"), 0, 0, 80, 80, 0.1, 6, true, false);
    this.wizardAttackRightAnimation = new Animation(ASSET_MANAGER.getAsset("./img/wizardAttackRight.png"), 0, 0, 80, 80, 0.1, 6, true, false);
	this.wizardIdleAnimation = new Animation(ASSET_MANAGER.getAsset("./img/wizardIdle.png"), 0, 0, 80, 80, 0.1, 10, true, false);
    this.death = new Animation(ASSET_MANAGER.getAsset("./img/wizardDeath.png"), 0, 0, 80, 80, 0.1, 10, true, false);
    this.animation = this.wizardWalkingLeftAnimation;
    this.isMovingWest = false;
    this.isMovingEast = true;
    this.moveSpeed = 140;
    this.attackSpeed = 3;
    this.attackInterval = 0.6;
    this.startAttackRange = 80;
    this.stopAttackRange = 300;
    this.startFollowRange = 150;
    this.stopFollowRange = 350;
    this.maxHealth = 400;
    this.currentHealth = 400;
    this.killable = true;
    this.life = 1;
    Entity.call(this, game, startingX - 50, startingY - 25); // where it starts

}

Wizard.prototype = new Entity();
Wizard.prototype.constructor = Wizard;

Wizard.prototype.update = function () {
    let xOrigC = (character.x + character.animation.frameWidth / 2);
    let yOrigC = (character.y + character.animation.frameHeight / 2);
    let xOrigS = (this.x + this.animation.frameWidth / 2)
    let yOrigS = (this.y + this.animation.frameHeight / 2)
    let xDiff = xOrigC - xOrigS;
    let yDiff = yOrigC - yOrigS;
    let distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);

    if (this.x < 1050 && this.isMovingWest) {
        this.isMovingEast = true;
        this.isMovingWest = false;
        this.x += gameEngine.clockTick * this.moveSpeed;
    }
    if (this.x > 1970 && this.isMovingEast) {
        this.isMovingEast = false;
        this.isMovingWest = true;
        this.x -= gameEngine.clockTick * this.moveSpeed;
    }
    if (this.isMovingEast) {
        this.x += gameEngine.clockTick * this.moveSpeed;
    }
    if (this.isMovingWest) {
        this.x -= gameEngine.clockTick * this.moveSpeed;
    }
    Entity.prototype.update.call(this);
}
Wizard.prototype.normalAttack = function (xDiff, yDiff, distance, xOrigS, yOrigS) {
    // to do
}
Wizard.prototype.draw = function () {
    if (this.animation !== this.death) {
        if (this.isMovingWest) {
            this.animation = this.wizardWalkingLeftAnimation;
        } else {
            this.animation = this.wizardWalkingRightAnimation;
        }
    }
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    if (this.animation === this.death) {
        this.life -= gameEngine.clockTick;
        if (this.life <= 0) this.removeFromWorld = true;
    }
    Entity.prototype.draw.call(this);
}
/*----------------------------------------------Wizard End--------------------------------------------------------------------------------------------------- */

/*----------------------------------------------SorcererVillain Start---------------------------------------------------------------------------------------- */
function SorcererVillain(game, x, y) {
    this.ctx = game.ctx;
    this.standingAttackAnimation = new Animation(ASSET_MANAGER.getAsset("./img/sorcererVillain.png"), 0, 0, 100, 100, 0.1, 10, true, false);
    this.death = null;
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
    this.maxHealth = 1000;
    this.currentHealth = 1000;
    this.killable = true;
    Entity.call(this, game, x, y); // where it starts 350, 100

}

SorcererVillain.prototype = new Entity();
SorcererVillain.prototype.constructor = SorcererVillain;

SorcererVillain.prototype.update = function () {
    if (this.cooldown > 0) this.cooldown -= gameEngine.clockTick;
    if (this.special > 0) this.cooldown -= gameEngine.clockTick;
    let canMove = false;
    let xOrigC = (character.x + character.animation.frameWidth / 2);
    let yOrigC = (character.y + character.animation.frameHeight / 2);
    let xOrigS = (this.x + this.animation.frameWidth / 2)
    let yOrigS = (this.y + this.animation.frameHeight / 2)
    let xDiff = xOrigC - xOrigS;
    let yDiff = yOrigC - yOrigS;
    let distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
    let origX = this.x;
    let origY = this.y;


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
    if (!collisionDetect(this.x + 30, 90 + this.y, 20)) { canMove = true }
    if (!canMove) {
        this.x = origX;
        this.y = origY;
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
    if (this.game.debug) {
        ctx.strokeStyle = "green";
        ctx.strokeRect(this.x, this.y, 100, 100);
        ctx.strokeStyle = "yellow";
        ctx.strokeRect(this.x + 30, this.y + 30, 30, 100);
    }
    Entity.prototype.draw.call(this);
}
/*----------------------------------------------SorcererVillain End------------------------------------------------------------------------------------------ */

/*----------------------------------------------Projectile Start--------------------------------------------------------------------------------------------- */
function Projectile(game, x, y, xs, ys) {
    this.xs = xs;
    this.ys = ys;
    this.scale = 4;
    this.life = 10;
    this.killable = true;
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
/*----------------------------------------------Projectile End----------------------------------------------------------------------------------------------- */

/*----------------------------------------------Slime Projectile Start--------------------------------------------------------------------------------------------- */
function SlimeProjectile(game, x, y, xs, ys) {
    this.xs = xs;
    this.ys = ys;
    this.scale = 4;
    this.life = 10;
    this.killable = true;
    Entity.call(this, game, x, y);
}

SlimeProjectile.prototype = new Entity();
SlimeProjectile.prototype.constructor = SlimeProjectile;

SlimeProjectile.prototype.update = function () {
    this.x += this.xs;
    this.y += this.ys;
    this.life -= gameEngine.clockTick;
    if (this.life <= 0) this.removeFromWorld = true;
}

SlimeProjectile.prototype.draw = function () {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.scale, 0, 2 * Math.PI);
    ctx.fillStyle = `rgb(35,255,50)`;
    ctx.fill();
    ctx.restore();
}
/*----------------------------------------------Slime Projectile End----------------------------------------------------------------------------------------------- */




/*----------------------------------------------Debug Stuff Start------------------------------------------------------------------------------------------ */
function CenterThingy() {
    // Displays the center of the canvas/camera.
    Entity.call(this, gameEngine, 390, 390);
    this.radius = 200;
}
CenterThingy.prototype = new Entity();
CenterThingy.prototype.constructor = world1.Background;
CenterThingy.prototype.update = function () { }
CenterThingy.prototype.draw = function (ctx) {
    ctx.fillStyle = "blue";
    ctx.fillRect(395, 395, 10, 10);
    Entity.prototype.draw.call(this);
}
/*----------------------------------------------Debug Stuff End-------------------------------------------------------------------------------------------- */

/*----------------------------------------------Main Code Start-------------------------------------------------------------------------------------------- */
// the "main" code begins here
var gameEngine;
var damgeST;
let character;
let sorcererVillain;
let slimeBehemoth;
let slimeEnemy;
let wizard;
let skeleton;
let torch;
let sKey;
let gKey;
let hPotion;
let sJar;
let canvas;
var ctx;
var ASSET_MANAGER = new AssetManager();

function startGame() {
    document.getElementById('start-game').hidden = true;
    ASSET_MANAGER.queueDownload("./img/DungeonBackgroundSpriteSheet.png");
    ASSET_MANAGER.queueDownload("./img/spritesheet.png");
    ASSET_MANAGER.queueDownload("./img/characterIdleAnimation.png");
	ASSET_MANAGER.queueDownload('./img/ChatacterAttackRanged.png');
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
    ASSET_MANAGER.queueDownload("./img/torchAnimation.png");
    ASSET_MANAGER.queueDownload("./img/SilverKeyAnimation.png");
    ASSET_MANAGER.queueDownload("./img/GoldKeyAnimation.png");
    ASSET_MANAGER.queueDownload("./img/HealthPotionAnimation.png");
    ASSET_MANAGER.queueDownload("./img/SoulJarAnimation.png");
    ASSET_MANAGER.queueDownload("./img/SlimeBehemothWalkingLeft.png");
    ASSET_MANAGER.queueDownload("./img/SlimeBehemothWalkingRight.png");
	ASSET_MANAGER.queueDownload("./img/SlimeBehemothAttackLeft.png");
    ASSET_MANAGER.queueDownload("./img/SlimeBehemothAttackRight.png");
    ASSET_MANAGER.queueDownload("./img/SlimeWalkLeft.png");
    ASSET_MANAGER.queueDownload("./img/SlimeWalkRight.png");
	ASSET_MANAGER.queueDownload("./img/SlimeAttackLeft.png");``
    ASSET_MANAGER.queueDownload("./img/SlimeAttackRight.png");
	ASSET_MANAGER.queueDownload("./img/SlimeIdle.png");
    ASSET_MANAGER.queueDownload("./img/SlimeDeath.png");
    ASSET_MANAGER.queueDownload("./img/wizardWalkLeft.png");
    ASSET_MANAGER.queueDownload("./img/wizardWalkRight.png");
	ASSET_MANAGER.queueDownload("./img/wizardAttackLeft.png");
    ASSET_MANAGER.queueDownload("./img/wizardAttackRight.png");
	ASSET_MANAGER.queueDownload("./img/wizardMagicSpellDown.png");
	ASSET_MANAGER.queueDownload("./img/wizardMagicSpellUp.png");
	ASSET_MANAGER.queueDownload("./img/wizardMagicSpellLeft.png");
	ASSET_MANAGER.queueDownload("./img/wizardMagicSpellRight.png");
	ASSET_MANAGER.queueDownload("./img/wizardIdle.png");
    ASSET_MANAGER.queueDownload("./img/wizardDeath.png");
    ASSET_MANAGER.queueDownload("./img/SkeletonWalkLeft.png");
    ASSET_MANAGER.queueDownload("./img/SkeletonWalkRight.png");
    ASSET_MANAGER.queueDownload("./img/characterInfo2.png");
    ASSET_MANAGER.queueDownload("./img/HP.png");
    ASSET_MANAGER.downloadAll(function () {
        console.log("starting up da sheild");
        canvas = document.getElementById("viewport");
        ctx = canvas.getContext("2d");
        ctx.imageSmoothingEnabled = false;

        // Creates new entity instances
        gameEngine = new GameEngine(ctx, ctx.canvas.width, ctx.canvas.height);
        var bg = new world1.Background(ASSET_MANAGER.getAsset("./img/DungeonBackgroundSpriteSheet.png"));
        var chInfo = new CharacterInfo(ASSET_MANAGER.getAsset("./img/characterInfo2.png"), ASSET_MANAGER.getAsset("./img/HP.png"));
        damgeST = new damgeStat();
        var torches = [];
        var sKeys = [];
        var gKeys = [];
        var hPotions = [];
        var sJars = [];
        var slimeBehemoths = [];
        var slimeEnemies = [];
        var skeletons = [];
        var wizards = [];
        var sorcererVillains = [];
        // generates an array that will generate each entity in the right spots.
        for (var i = 0; i < world1.slimeDungeonLevelOneEntities.length; i++) {
            if (world1.slimeDungeonLevelOneEntities[i] == 1) {
                var torchX = (i % 88) * 48;
                var torchY = (Math.floor(i / 88)) * 48; // (i / number of blocks long - 1) * scale
                var torch = new Torch(torchX, torchY);
                torches.push(torch);
            }
            if (world1.slimeDungeonLevelOneEntities[i] == 2) {
                var sKeyX = (i % 88) * 48;
                var sKeyY = (Math.floor(i / 88)) * 48; // (i / number of blocks long - 1) * scale
                var sKey = new SilverKey(sKeyX, sKeyY);
                sKeys.push(sKey);
            }
            if (world1.slimeDungeonLevelOneEntities[i] == 3) {
                var gKeyX = (i % 88) * 48;
                var gKeyY = (Math.floor(i / 88)) * 48; // (i / number of blocks long - 1) * scale
                var gKey = new GoldKey(gKeyX, gKeyY);
                gKeys.push(gKey);
            }
            if (world1.slimeDungeonLevelOneEntities[i] == 4) {
                var hPotionX = (i % 88) * 48;
                var hPotionY = (Math.floor(i / 88)) * 48; // (i / number of blocks long - 1) * scale
                var hPotion = new HealingPotion(hPotionX, hPotionY);
                hPotions.push(hPotion);
            }
            if (world1.slimeDungeonLevelOneEntities[i] == 5) {
                var sJarX = (i % 88) * 48;
                var sJarY = (Math.floor(i / 88)) * 48; // (i / number of blocks long - 1) * scale
                var sJar = new SoulJar(sJarX, sJarY);
                sJars.push(sJar);
            }
            if (world1.slimeDungeonLevelOneEntities[i] == 11) {
                var svX = (i % 88) * 48;
                var svY = (Math.floor(i / 88)) * 48; // (i / number of blocks long - 1) * scale
                var sv = new SorcererVillain(gameEngine, svX, svY);
                sorcererVillains.push(sv);
            }
            if (world1.slimeDungeonLevelOneEntities[i] == 12) {
                var seX = (i % 88) * 48;
                var seY = (Math.floor(i / 88)) * 48; // (i / number of blocks long - 1) * scale
                var se = new SlimeEnemy(seX, seY);
                slimeEnemies.push(se);
            }
            if (world1.slimeDungeonLevelOneEntities[i] == 13) {
                var sbX = (i % 88) * 48;
                var sbY = (Math.floor(i / 88)) * 48; // (i / number of blocks long - 1) * scale
                var sb = new SlimeBehemoth(sbX, sbY);
                slimeBehemoths.push(sb);
            }
            if (world1.slimeDungeonLevelOneEntities[i] == 14) {
                var wizardX = (i % 88) * 48;
                var wizardY = (Math.floor(i / 88)) * 48; // (i / number of blocks long - 1) * scale
                var wizard = new Wizard(gameEngine, wizardX, wizardY);
                wizards.push(wizard);
            }
            if (world1.slimeDungeonLevelOneEntities[i] == 15) {
                var skeletonX = (i % 88) * 48;
                var skeletonY = (Math.floor(i / 88)) * 48; // (i / number of blocks long - 1) * scale
                var skeleton = new Skeleton(gameEngine, skeletonX, skeletonY);
                skeletons.push(skeleton);
            }
            if (world1.slimeDungeonLevelOneEntities[i] == 10) { // for the player character
                var characterStartingX = (i % 88) * 48;
                var characterStartingY = (Math.floor(i / 88)) * 48; // (i / number of blocks long - 1) * scale
            }
        }

        character = new Character(world1); // For other worlds, the character object must be update with the new world, or just recreate the character object with the new world.

        var centerthingy = new CenterThingy();

        // Adding the entities
        gameEngine.addEntity(bg);

        for (var i = 0; i < torches.length; i++) {
            gameEngine.addEntity(torches[i]);
        }
        for (var i = 0; i < sKeys.length; i++) {
            gameEngine.addEntity(sKeys[i]);
        }
        for (var i = 0; i < gKeys.length; i++) {
            gameEngine.addEntity(gKeys[i]);
        }
        for (var i = 0; i < hPotions.length; i++) {
            gameEngine.addEntity(hPotions[i]);
        }
        for (var i = 0; i < sJars.length; i++) {
            gameEngine.addEntity(sJars[i]);
        }
        for (var i = 0; i < slimeEnemies.length; i++) {
            gameEngine.addEntity(slimeEnemies[i]);
        }
        for (var i = 0; i < slimeBehemoths.length; i++) {
            gameEngine.addEntity(slimeBehemoths[i]);
        }
        for (var i = 0; i < wizards.length; i++) {
            gameEngine.addEntity(wizards[i]);
        }
        for (var i = 0; i < skeletons.length; i++) {
            gameEngine.addEntity(skeletons[i]);
        }
        for (var i = 0; i < sorcererVillains.length; i++) {
            gameEngine.addEntity(sorcererVillains[i]);
        }

        // Sounds and effects.
        // gameEngine.sounds.set('musicTitle01', new Sound("01_BROKEN_DESTINY.mp3", true));
        // gameEngine.sounds.set('musicTitle02', new Sound("02_BATTLE_CRY.mp3", true));
        gameEngine.sounds.set('dungeon1', new Sound('lost_mine.mp3', true));
        gameEngine.sounds.set('characterAttack01', new Sound("player_attack.wav"));
        gameEngine.sounds.set('characterAttack02', new Sound("player_whirlwind_attack.wav"));
        gameEngine.sounds.get('dungeon1').play(); // This is the first thing that plays during starting the game.

        gameEngine.addEntity(character);
        if (gameEngine.debug) gameEngine.addEntity(centerthingy);
        gameEngine.addEntity(chInfo);
        gameEngine.addEntity(damgeST);
        gameEngine.debug = false;
        character.updateViewport();

        // Starting up the game
        gameEngine.init();
        gameEngine.start();
    });
}
