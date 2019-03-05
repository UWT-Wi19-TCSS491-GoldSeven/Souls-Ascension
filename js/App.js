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

function damageStat() {
    this.x = 0;
    this.y = 0;
    this.damaged = 0;
    this.exp = 0;
    this.time = new Date().getTime();

}
damageStat.prototype = new Entity();
damageStat.prototype.constructor = damageStat;
damageStat.prototype.update = function () {
    Entity.prototype.update.call(this);
}
damageStat.prototype.draw = function () {
    if (this.damaged !== 0) {
        ctx.fillStyle = "red";
        ctx.font = "30px Arial";
        ctx.fillText(" - " + this.damaged, this.x, this.y);
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

// If enemies have been killed (empty health) override
// entityPosition is position in array of entities.
function isCollide(targetX, targetY, targetW, targetH, entity, entityW, entityH) {
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
function collisionDetect(characterX, characterY, width, isCharacter) {
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
            if (isCharacter && leafs[j].walls[i] instanceof Door == true && character.inventory['SilverKey'] > 0) {
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
    this.flameAnimation = new Animation(ASSET_MANAGER.getAsset("./assets/sprites/torchAnimation.png"), 0, 0, 48, 48, 0.1, 4, true, world1.currentScale);
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
var damageST;
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
    ASSET_MANAGER.queueDownload("./assets/sprites/DungeonBackgroundSpriteSheet.png");
    ASSET_MANAGER.queueDownload("./assets/sprites/spritesheet.png");
    ASSET_MANAGER.queueDownload("./assets/sprites/characterIdleAnimation.png");
	ASSET_MANAGER.queueDownload('./assets/sprites/ChatacterAttackRanged.png');
    ASSET_MANAGER.queueDownload("./assets/sprites/CharacterForwardRun.png");
    ASSET_MANAGER.queueDownload("./assets/sprites/characterBackwardRun.png");
    ASSET_MANAGER.queueDownload("./assets/sprites/characterRightAnimation.png");
    ASSET_MANAGER.queueDownload("./assets/sprites/characterLeftAnimation.png");
    ASSET_MANAGER.queueDownload("./assets/sprites/characterRightAttack.png");
    ASSET_MANAGER.queueDownload("./assets/sprites/characterLeftAttack.png");
    ASSET_MANAGER.queueDownload("./assets/sprites/characterUpAttack.png");
    ASSET_MANAGER.queueDownload("./assets/sprites/characterDownAttack.png");
    ASSET_MANAGER.queueDownload("./assets/sprites/characterWhirlWindAttackAnimation.png");
    ASSET_MANAGER.queueDownload("./assets/sprites/sorcererVillain.png");
    ASSET_MANAGER.queueDownload("./assets/sprites/torchAnimation.png");
    ASSET_MANAGER.queueDownload("./assets/sprites/SilverKeyAnimation.png");
    ASSET_MANAGER.queueDownload("./assets/sprites/GoldKeyAnimation.png");
    ASSET_MANAGER.queueDownload("./assets/sprites/HealthPotionAnimation.png");
    ASSET_MANAGER.queueDownload("./assets/sprites/SoulJarAnimation.png");
    ASSET_MANAGER.queueDownload("./assets/sprites/SlimeBehemothWalkingLeft.png");
    ASSET_MANAGER.queueDownload("./assets/sprites/SlimeBehemothWalkingRight.png");
	ASSET_MANAGER.queueDownload("./assets/sprites/SlimeBehemothAttackLeft.png");
    ASSET_MANAGER.queueDownload("./assets/sprites/SlimeBehemothAttackRight.png");
    ASSET_MANAGER.queueDownload("./assets/sprites/SlimeWalkLeft.png");
    ASSET_MANAGER.queueDownload("./assets/sprites/SlimeWalkRight.png");
	ASSET_MANAGER.queueDownload("./assets/sprites/SlimeAttackLeft.png");
    ASSET_MANAGER.queueDownload("./assets/sprites/SlimeAttackRight.png");
	ASSET_MANAGER.queueDownload("./assets/sprites/SlimeIdle.png");
    ASSET_MANAGER.queueDownload("./assets/sprites/SlimeDeath.png");
    ASSET_MANAGER.queueDownload("./assets/sprites/wizardWalkLeft.png");
    ASSET_MANAGER.queueDownload("./assets/sprites/wizardWalkRight.png");
	ASSET_MANAGER.queueDownload("./assets/sprites/wizardAttackLeft.png");
    ASSET_MANAGER.queueDownload("./assets/sprites/wizardAttackRight.png");
	ASSET_MANAGER.queueDownload("./assets/sprites/wizardMagicSpellDown.png");
	ASSET_MANAGER.queueDownload("./assets/sprites/wizardMagicSpellUp.png");
	ASSET_MANAGER.queueDownload("./assets/sprites/wizardMagicSpellLeft.png");
	ASSET_MANAGER.queueDownload("./assets/sprites/wizardMagicSpellRight.png");
	ASSET_MANAGER.queueDownload("./assets/sprites/wizardIdle.png");
    ASSET_MANAGER.queueDownload("./assets/sprites/wizardDeath.png");
    ASSET_MANAGER.queueDownload("./assets/sprites/SkeletonWalkLeft.png");
    ASSET_MANAGER.queueDownload("./assets/sprites/SkeletonWalkRight.png");
    ASSET_MANAGER.queueDownload("./assets/sprites/characterInfo2.png");
    ASSET_MANAGER.queueDownload("./assets/sprites/HP.png");
    ASSET_MANAGER.downloadAll(function () {
        console.log("starting up da sheild");
        canvas = document.getElementById("viewport");
        ctx = canvas.getContext("2d");
        ctx.imageSmoothingEnabled = false;

        // Creates new entity instances
        gameEngine = new GameEngine(ctx, ctx.canvas.width, ctx.canvas.height);
        var bg = new world1.Background(ASSET_MANAGER.getAsset("./assets/sprites/DungeonBackgroundSpriteSheet.png"));
        var chInfo = new CharacterInfo(ASSET_MANAGER.getAsset("./assets/sprites/characterInfo2.png"), ASSET_MANAGER.getAsset("./assets/sprites/HP.png"));
        damageST = new damageStat();
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
                var se = new Slime(seX, seY);
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
                var wizard = new Wraith(gameEngine, wizardX, wizardY);
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
        // gameEngine.audio.set('musicTitle01', new Sound("01_BROKEN_DESTINY.mp3", true));
        // gameEngine.audio.set('musicTitle02', new Sound("02_BATTLE_CRY.mp3", true));
        gameEngine.sounds.set('dungeon1', new Sound('./assets/audio/lost_mine.mp3', true));
        gameEngine.sounds.set('characterAttack01', new Sound("./assets/audio/player_attack.wav"));
        gameEngine.sounds.set('characterAttack02', new Sound("./assets/audio/player_whirlwind_attack.wav"));
        gameEngine.sounds.get('dungeon1').play(); // This is the first thing that plays during starting the game.

        gameEngine.addEntity(character);
        if (gameEngine.debug) gameEngine.addEntity(centerthingy);
        gameEngine.addEntity(chInfo);
        gameEngine.addEntity(damageST);
        gameEngine.debug = false;
        character.updateViewport();

        // Starting up the game
        gameEngine.init();
        gameEngine.start();
    });
}
