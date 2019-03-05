/*----------------------------------------------SlimeBehemoth Start------------------------------------------------------------------------------------------ */
function SlimeBehemoth(startingX, startingY) {
    this.slimeBehemothWalkingLeftAnimation = new Animation(ASSET_MANAGER.getAsset("./assets/sprites/SlimeBehemothWalkingLeft.png"), 0, 0, 80, 68, 0.1, 8, true, false);
    this.slimeBehemothWalkingRightAnimation = new Animation(ASSET_MANAGER.getAsset("./assets/sprites/SlimeBehemothWalkingRight.png"), 0, 0, 80, 68, 0.1, 8, true, false);
    this.slimeBehemothAttackLeftAnimation = new Animation(ASSET_MANAGER.getAsset("./assets/sprites/SlimeBehemothAttackLeft.png"), 0, 0, 117, 68, 0.1, 8, true, false);
    this.slimeBehemothAttackRightAnimation = new Animation(ASSET_MANAGER.getAsset("./assets/sprites/SlimeBehemothAttackRight.png"), 0, 0, 120, 68, 0.1, 8, true, false);
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
    this.maxHealth = 150;
    this.currentHealth = 150;
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

    if (this.killed) {
        if (this.death && this.animation == this.death) {
            this.life -= gameEngine.clockTick;
            if (this.life <= 0) this.removeFromWorld = true;
        } else {
            this.removeFromWorld = true;
        }

        return;
    }

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

/*----------------------------------------------Slime Start--------------------------------------------------------------------------------------------- */
function Slime(startingX, startingY) {
    this.slimeEnemyWalkingLeftAnimation = new Animation(ASSET_MANAGER.getAsset("./assets/sprites/SlimeWalkLeft.png"), 0, 0, 80, 80, 0.1, 8, true, false);
    this.slimeEnemyWalkingRightAnimation = new Animation(ASSET_MANAGER.getAsset("./assets/sprites/SlimeWalkRight.png"), 0, 0, 80, 80, 0.1, 8, true, false);
    this.slimeEnemyAttackLeftAnimation = new Animation(ASSET_MANAGER.getAsset("./assets/sprites/SlimeAttackLeft.png"), 0, 0, 80, 80, 0.1, 10, true, false);
    this.slimeEnemyAttackRightAnimation = new Animation(ASSET_MANAGER.getAsset("./assets/sprites/SlimeAttackRight.png"), 0, 0, 80, 80, 0.1, 10, true, false);
    this.slimeEnemyIdleAnimation = new Animation(ASSET_MANAGER.getAsset("./assets/sprites/SlimeIdle.png"), 0, 0, 80, 80, 0.1, 8, true, false);
    this.death = new Animation(ASSET_MANAGER.getAsset("./assets/sprites/SlimeDeath.png"), 0, 0, 80, 80, 0.1, 8, false, false);
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
    this.maxHealth = 40;
    this.currentHealth = 40;
    this.hasDied = false;
    this.life = 1;
    this.killable = true;


    Entity.call(this, gameEngine, startingX - 50, startingY - 15); // where it starts

}

Slime.prototype = new Entity();
Slime.prototype.constructor = Slime;

Slime.prototype.update = function () {
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

    if (this.killed) {
        if (this.death && this.animation == this.death) {
            this.life -= gameEngine.clockTick;
            if (this.life <= 0) this.removeFromWorld = true;
        } else {
            this.removeFromWorld = true;
        }

        return;
    }

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
Slime.prototype.attack = function (xDiff, yDiff, distance, xOrigS, yOrigS) {
    if (this.special <= 0) {
        this.specialAttack(xDiff, yDiff, distance, xOrigS, yOrigS);
    } else if (this.cooldown <= 0) {
        this.normalAttack(xDiff, yDiff, distance, xOrigS, yOrigS);
    }
}

Slime.prototype.normalAttack = function (xDiff, yDiff, distance, xOrigS, yOrigS) {
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
Slime.prototype.specialAttack = function (xDiff, yDiff, distance, xOrigS, yOrigS) {
    // TODO
}
Slime.prototype.draw = function () {
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

    if (this.animation == null) return;

    this.animation.drawFrame(gameEngine.clockTick, ctx, this.x, this.y);

    Entity.prototype.draw.call(this);
}
/*----------------------------------------------Slime End---------------------------------------------------------------------------------------------- */

/*----------------------------------------------Skeleton Start---------------------------------------------------------------------------------------------- */
function Skeleton(game, startingX, startingY) {
    this.ctx = game.ctx;
    this.skeletonWalkingLeftAnimation = new Animation(ASSET_MANAGER.getAsset("./assets/sprites/SkeletonWalkLeft.png"), 0, 0, 44, 66, 0.1, 13, true, false);
    this.skeletonWalkingRightAnimation = new Animation(ASSET_MANAGER.getAsset("./assets/sprites/SkeletonWalkRight.png"), 0, 0, 44, 66, 0.1, 13, true, false);
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
    this.maxHealth = 60;
    this.currentHealth = 60;
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

    if (this.killed) {
        if (this.death && this.animation == this.death) {
            this.life -= gameEngine.clockTick;
            if (this.life <= 0) this.removeFromWorld = true;
        } else {
            this.removeFromWorld = true;
        }

        return;
    }

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

/*----------------------------------------------Wraith Start------------------------------------------------------------------------------------------------ */
function Wraith(game, startingX, startingY) {
    this.ctx = game.ctx;
    this.wizardWalkingLeftAnimation = new Animation(ASSET_MANAGER.getAsset("./assets/sprites/wizardWalkLeft.png"), 0, 0, 80, 80, 0.1, 6, true, false);
    this.wizardWalkingRightAnimation = new Animation(ASSET_MANAGER.getAsset("./assets/sprites/wizardWalkRight.png"), 0, 0, 80, 80, 0.1, 6, true, false);
    this.wizardAttackLeftAnimation = new Animation(ASSET_MANAGER.getAsset("./assets/sprites/wizardAttackLeft.png"), 0, 0, 80, 80, 0.1, 6, true, false);
    this.wizardAttackRightAnimation = new Animation(ASSET_MANAGER.getAsset("./assets/sprites/wizardAttackRight.png"), 0, 0, 80, 80, 0.1, 6, true, false);
    this.wizardIdleAnimation = new Animation(ASSET_MANAGER.getAsset("./assets/sprites/wizardIdle.png"), 0, 0, 80, 80, 0.1, 10, true, false);
    this.death = new Animation(ASSET_MANAGER.getAsset("./assets/sprites/wizardDeath.png"), 0, 0, 80, 80, 0.1, 10, false, false);
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
    this.maxHealth = 60;
    this.currentHealth = 60;
    this.killable = true;
    this.life = 1;
    Entity.call(this, game, startingX - 50, startingY - 25); // where it starts

}

Wraith.prototype = new Entity();
Wraith.prototype.constructor = Wraith;

Wraith.prototype.update = function () {
    let xOrigC = (character.x + character.animation.frameWidth / 2);
    let yOrigC = (character.y + character.animation.frameHeight / 2);
    let xOrigS = (this.x + this.animation.frameWidth / 2)
    let yOrigS = (this.y + this.animation.frameHeight / 2)
    let xDiff = xOrigC - xOrigS;
    let yDiff = yOrigC - yOrigS;
    let distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);

    if (this.killed) {
        if (this.death && this.animation == this.death) {
            this.life -= gameEngine.clockTick;
            if (this.life <= 0) this.removeFromWorld = true;
        } else {
            this.removeFromWorld = true;
        }

        return;
    }

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
Wraith.prototype.normalAttack = function (xDiff, yDiff, distance, xOrigS, yOrigS) {
    // to do
}
Wraith.prototype.draw = function () {
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
/*----------------------------------------------Wraith End--------------------------------------------------------------------------------------------------- */

/*----------------------------------------------SorcererVillain Start---------------------------------------------------------------------------------------- */
function SorcererVillain(game, x, y) {
    this.ctx = game.ctx;
    this.standingAttackAnimation = new Animation(ASSET_MANAGER.getAsset("./assets/sprites/sorcererVillain.png"), 0, 0, 100, 100, 0.1, 10, true, false);
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
    this.maxHealth = 200;
    this.currentHealth = 200;
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

    if (this.killed) {
        if (this.death && this.animation == this.death) {
            this.life -= gameEngine.clockTick;
            if (this.life <= 0) this.removeFromWorld = true;
        } else {
            this.removeFromWorld = true;
        }

        return;
    }

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
    if (collisionDetect(this.x, this.y, world.currentScale)) {
        this.removeFromWorld = true;
        return;
    }

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