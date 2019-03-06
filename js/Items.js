/*----------------------------------------------Silver Key Start--------------------------------------------------------------------------------------------- */

class SilverKey extends Entity {
    constructor(x, y) {
        super(gameEngine, x, y, false);
        this.boundingBox = new BoundingBox(x, y, 10, 10, 20, 20);
        this.silverKeyAnimation = new Animation(ASSET_MANAGER.getAsset("./assets/sprites/SilverKeyAnimation.png"), 0, 0, 48, 48, 0.1, 4, true, world1.currentScale);
    }

    update() {
        super.update();

        if (this.boundingBox.hasCollided(character.boundingBox)) {
            this.destroy();
            character.inventory.SilverKey += 1;
        }
    }

    draw() {
        this.silverKeyAnimation.drawFrame(gameEngine.clockTick, ctx, this.x, this.y);
        super.draw();
    }
}

/*----------------------------------------------Silver Key End----------------------------------------------------------------------------------------------- */

/*----------------------------------------------Gold Key Start----------------------------------------------------------------------------------------------- */

class GoldKey extends Entity {
    constructor(x, y) {
        super(gameEngine, x, y, false);
        this.boundingBox = new BoundingBox(x, y, 10, 10, 20, 20);
        this.goldKeyAnimation = new Animation(ASSET_MANAGER.getAsset("./assets/sprites/GoldKeyAnimation.png"), 0, 0, 48, 48, 0.1, 4, true, world1.currentScale);
    }

    update() {
        super.update();

        if (this.boundingBox.hasCollided(character.boundingBox)) {
            this.destroy();
            character.inventory.GoldKey += 1;
        }
    }

    draw() {
        this.goldKeyAnimation.drawFrame(gameEngine.clockTick, ctx, this.x, this.y);
        super.draw();
    }
}

/*----------------------------------------------Gold Key End------------------------------------------------------------------------------------------------- */

/*----------------------------------------------Healing Potion Start----------------------------------------------------------------------------------------- */

class HealingPotion extends Entity {
    constructor(x, y) {
        super(gameEngine, x, y, false);
        this.boundingBox = new BoundingBox(x, y, 10, 10, 20, 20);
        this.sparkleAnimation = new Animation(ASSET_MANAGER.getAsset("./assets/sprites/HealthPotionAnimation.png"), 0, 0, 48, 48, 0.1, 4, true, world1.currentScale);
    }

    update() {
        super.update();

        if (this.boundingBox.hasCollided(character.boundingBox)) {
            this.destroy();
            character.inventory.HealingPotion += 1;
        }
    }

    draw() {
        if (!this.collected) this.sparkleAnimation.drawFrame(gameEngine.clockTick, ctx, this.x, this.y);
        super.draw();
    }
}

/*----------------------------------------------Healing Potion end------------------------------------------------------------------------------------------- */

/*----------------------------------------------Soul Jar Start----------------------------------------------------------------------------------------------- */

class SoulJar extends Entity {
    constructor(x, y) {
        super(gameEngine, x, y, false);
        this.boundingBox = new BoundingBox(x, y, 10, 10, 20, 20);
        this.sparkleAnimation = new Animation(ASSET_MANAGER.getAsset("./assets/sprites/SoulJarAnimation.png"), 0, 0, 48, 48, 0.1, 4, true, world1.currentScale);
        this.jar = 100;
    }

    update() {
        super.update();

        if (this.boundingBox.hasCollided(character.boundingBox)) {
            this.destroy();
            character.currentSoul += this.jar;
        }
    }

    draw() {
        if (!this.collected) this.sparkleAnimation.drawFrame(gameEngine.clockTick, ctx, this.x, this.y);
        super.draw();
    }
}

/*----------------------------------------------Soul Jar end------------------------------------------------------------------------------------------------- */