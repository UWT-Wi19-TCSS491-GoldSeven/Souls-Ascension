/*----------------------------------------------Silver Key Start--------------------------------------------------------------------------------------------- */
function SilverKey(x, y) {
    this.silverKeyAnimation = new Animation(ASSET_MANAGER.getAsset("./assets/sprites/SilverKeyAnimation.png"), 0, 0, 48, 48, 0.1, 4, true, world1.currentScale);
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
    this.goldKeyAnimation = new Animation(ASSET_MANAGER.getAsset("./assets/sprites/GoldKeyAnimation.png"), 0, 0, 48, 48, 0.1, 4, true, world1.currentScale);
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
    this.sparkleAnimation = new Animation(ASSET_MANAGER.getAsset("./assets/sprites/HealthPotionAnimation.png"), 0, 0, 48, 48, 0.1, 4, true, world1.currentScale);
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
    this.sparkleAnimation = new Animation(ASSET_MANAGER.getAsset("./assets/sprites/SoulJarAnimation.png"), 0, 0, 48, 48, 0.1, 4, true, world1.currentScale);
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