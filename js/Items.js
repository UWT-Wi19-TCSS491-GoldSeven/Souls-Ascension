/*----------------------------------------------Silver Key Start--------------------------------------------------------------------------------------------- */

class SilverKey extends Entity {
    constructor(x, y) {
        super(gameEngine, x, y);
        this.silverKeyAnimation = new Animation(ASSET_MANAGER.getAsset("./assets/sprites/SilverKeyAnimation.png"), 0, 0, 48, 48, 0.1, 4, true, world1.currentScale);
        this.killable = true;
    }

    draw() {
        this.silverKeyAnimation.drawFrame(gameEngine.clockTick, ctx, this.x, this.y);
    }
}

/*----------------------------------------------Silver Key End----------------------------------------------------------------------------------------------- */

/*----------------------------------------------Gold Key Start----------------------------------------------------------------------------------------------- */

class GoldKey extends Entity {
    constructor(x, y) {
        super(gameEngine, x, y);
        this.goldKeyAnimation = new Animation(ASSET_MANAGER.getAsset("./assets/sprites/GoldKeyAnimation.png"), 0, 0, 48, 48, 0.1, 4, true, world1.currentScale);
        this.killable = true;
    }

    draw() {
        this.goldKeyAnimation.drawFrame(gameEngine.clockTick, ctx, this.x, this.y);
    }
}

/*----------------------------------------------Gold Key End------------------------------------------------------------------------------------------------- */

/*----------------------------------------------Healing Potion Start----------------------------------------------------------------------------------------- */

class HealingPotion extends Entity {
    constructor(x, y) {
        super(gameEngine, x, y);
        this.sparkleAnimation = new Animation(ASSET_MANAGER.getAsset("./assets/sprites/HealthPotionAnimation.png"), 0, 0, 48, 48, 0.1, 4, true, world1.currentScale);
        this.killable = true;
        this.health = 100;
        this.toX = 0;
        this.toY = 0;
        this.killed = false;
        this.life = 2;
    }

    update() {
        this.x += this.toX;
        this.y += this.toY;
        if (this.killed) this.life -= gameEngine.clockTick;
        if (this.life <= 0) this.isDestroyed = true;
    }

    draw() {
        if (this.x >= character.x - 280)
            this.sparkleAnimation.drawFrame(gameEngine.clockTick, ctx, this.x, this.y);
        if (!this.killed) this.sparkleAnimation.drawFrame(gameEngine.clockTick, ctx, this.x, this.y);
    }
}

/*----------------------------------------------Healing Potion end------------------------------------------------------------------------------------------- */

/*----------------------------------------------Soul Jar Start----------------------------------------------------------------------------------------------- */

class SoulJar extends Entity {
    constructor(x, y) {
        super(gameEngine, x, y);
        this.sparkleAnimation = new Animation(ASSET_MANAGER.getAsset("./assets/sprites/SoulJarAnimation.png"), 0, 0, 48, 48, 0.1, 4, true, world1.currentScale);
        this.killable = true;
        this.jar = 100;
        this.toX = 0;
        this.toY = 0;
        this.killed = false;
        this.life = 2;
    }

    update() {
        this.x += this.toX;
        this.y += this.toY;
        if (this.killed) this.life -= gameEngine.clockTick;
        if (this.life <= 0) {
            this.isDestroyed = true;
        }
    }

    draw() {
        if (this.x >= character.x - 280)
            this.sparkleAnimation.drawFrame(gameEngine.clockTick, ctx, this.x, this.y);
        if (!this.killed) this.sparkleAnimation.drawFrame(gameEngine.clockTick, ctx, this.x, this.y);
    }
}

/*----------------------------------------------Soul Jar end------------------------------------------------------------------------------------------------- */