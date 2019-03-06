class HostileEntity extends LivingEntity {
    constructor(x, y) {
        super(gameEngine, x, y);
        this.visited = new Array();
    }

    checkSight(aabbA, aabbB) {
        let start = aabbA.origin.x < aabbB.origin.x ? aabbA : aabbB;
        let end = aabbA.origin.x < aabbB.origin.x ? aabbB : aabbA;

        // Starting tile x and y tile indices
        let six = Math.floor(start.origin.x / world1.currentScale), siy = Math.floor(start.origin.y / world1.currentScale);
        // Ending tile x and y indices
        let eix = Math.floor(end.origin.x / world1.currentScale), eiy = Math.floor(end.origin.y / world1.currentScale);

        if (six != eix || eix != eiy) {
            if (six == eix) {
                // Organize tile y indices
                if (siy < eiy) {
                    siy += 1;
                } else {
                    let tmp = siy;
                    siy = eiy;
                    eiy = tmp - 1;
                }

                // All tiles are in one column. Skip the starting tile.
                for (let cy = siy; cy <= eiy; cy++) {
                    if (this.game.debug) this.visited.push({
                        x: six,
                        y: cy
                    });

                    if (isImpassible(getIndex(six, cy)))
                        return false;
                }
            } else if (siy == eiy) {
                for (let cx = six + 1; cx <= eix; cx++) {
                    if (this.game.debug) this.visited.push({
                        x: cx,
                        y: siy
                    });

                    if (isImpassible(getIndex(cx, siy)))
                        return false;
                }
            } else {
                let uy = Math.floor(((start.origin.y - end.origin.y) / (start.origin.x - end.origin.x)) * world1.currentScale);
                let y = start.origin.y;
                let ny = y + uy;
                let ciy, miy, niy;

                for (let cx = six; cx <= eix; cx++) {
                    ciy = Math.floor(y / world1.currentScale);
                    miy = (ny - (ny % world1.currentScale)) / world1.currentScale;
                    niy = Math.floor(ny / world1.currentScale);

                    if (uy >= 0) {
                        for (let cy = ciy; cy <= niy; cy++) {
                            if (cy <= miy) {
                                if (this.game.debug) this.visited.push({
                                    x: cx,
                                    y: cy
                                });

                                if (isImpassible(getIndex(cx, cy))) return false;
                            }

                            if (cy >= miy) {
                                if (this.game.debug) this.visited.push({
                                    x: cx + 1,
                                    y: cy
                                });

                                if (isImpassible(getIndex(cx + 1, cy))) return false;
                            }
                        }
                    } else {
                        for (let cy = ciy; cy >= niy; cy--) {
                            if (cy <= miy) {
                                if (this.game.debug) this.visited.push({
                                    x: cx,
                                    y: cy
                                });

                                if (isImpassible(getIndex(cx, cy))) return false;
                            }

                            if (cy >= miy) {
                                if (this.game.debug) this.visited.push({
                                    x: cx + 1,
                                    y: cy
                                });

                                if (isImpassible(getIndex(cx + 1, cy))) return false;
                            }
                        }
                    }

                    y = ny;
                    ny = y + uy;
                }
            }
        }

        return true;
    }

    draw() {
        super.draw();

        if (this.game.debug) {
            let ctx = this.game.ctx;

            for (let i in this.visited) {
                let tile = this.visited[i];
                ctx.save();
                ctx.fillStyle = 'rgba(255, 0, 0, 0.2)';
                ctx.fillRect(tile.x * world1.currentScale, tile.y * world1.currentScale,
                    world1.currentScale, world1.currentScale);
                ctx.restore();
            }

            this.visited.length = 0;
        }
    }
}


/*----------------------------------------------SlimeBehemoth Start------------------------------------------------------------------------------------------ */

class SlimeBehemoth extends HostileEntity {
    constructor(x, y) {
        super(x, y, false);
        this.boundingBox = new BoundingBox(x, y, 40, 60, 20, 5);
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
        this.health = 150;
    }

    update() {
        let xOrigC = (character.x + character.animation.frameWidth / 2);
        let yOrigC = (character.y + character.animation.frameHeight / 2);
        let xOrigS = (this.x + this.animation.frameWidth / 2)
        let yOrigS = (this.y + this.animation.frameHeight / 2)
        let xDiff = xOrigC - xOrigS;
        let yDiff = yOrigC - yOrigS;
        let distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);

        if (!this.alive) {
            if (this.death && this.animation == this.death) {
                this.life -= gameEngine.clockTick;
                if (this.life <= 0) this.destroyed = true;
            } else {
                this.destroyed = true;
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

        super.update();
    }

    draw() {
        if (this.isMovingWest) {
            this.animation = this.slimeBehemothWalkingLeftAnimation;
        } else {
            this.animation = this.slimeBehemothWalkingRightAnimation;
        }

        this.animation.drawFrame(gameEngine.clockTick, ctx, this.x, this.y);

        super.draw();
    }
}

/*----------------------------------------------SlimeBehemoth End-------------------------------------------------------------------------------------------- */

/*----------------------------------------------Slime Start--------------------------------------------------------------------------------------------- */

class Slime extends HostileEntity {
    constructor(x, y) {
        super(x, y);
        this.slimeEnemyWalkingLeftAnimation = new Animation(ASSET_MANAGER.getAsset("./assets/sprites/SlimeWalkLeft.png"), 0, 0, 80, 80, 0.1, 8, true, false);
        this.slimeEnemyWalkingRightAnimation = new Animation(ASSET_MANAGER.getAsset("./assets/sprites/SlimeWalkRight.png"), 0, 0, 80, 80, 0.1, 8, true, false);
        this.slimeEnemyAttackLeftAnimation = new Animation(ASSET_MANAGER.getAsset("./assets/sprites/SlimeAttackLeft.png"), 0, 0, 80, 80, 0.1, 10, true, false);
        this.slimeEnemyAttackRightAnimation = new Animation(ASSET_MANAGER.getAsset("./assets/sprites/SlimeAttackRight.png"), 0, 0, 80, 80, 0.1, 10, true, false);
        this.slimeEnemyIdleAnimation = new Animation(ASSET_MANAGER.getAsset("./assets/sprites/SlimeIdle.png"), 0, 0, 80, 80, 0.1, 8, true, false);
        this.death = new Animation(ASSET_MANAGER.getAsset("./assets/sprites/SlimeDeath.png"), 0, 0, 80, 80, 0.1, 8, false, false);
        this.animation = this.slimeEnemyIdleAnimation;
        this.boundingBox = new BoundingBox(x, y, 35, 20, 25, 35);
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
        this.detectRange = 360;
        this.maxHealth = 40;
        this.health = 40;
        this.hasDied = false;
        this.life = 1;
    }

    update() {
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

        if (!this.alive) {
            if (this.death && this.animation == this.death) {
                this.life -= gameEngine.clockTick;
                if (this.life <= 0) this.destroyed = true;
            } else {
                this.destroyed = true;
            }

            return;
        }

        super.update();

        if (distance > this.detectRange || !this.checkSight(this.boundingBox, character.boundingBox)) {
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

        if (!Collision.hasCollidedWithWalls(this.x + 20, 55 + this.y, 20)) {
            canMove = true
        }

        if (!canMove) {
            this.x = origX;
            this.y = origY;
        }
    }

    attack(xDiff, yDiff, distance, xOrigS, yOrigS) {
        if (this.special <= 0) {
            this.specialAttack(xDiff, yDiff, distance, xOrigS, yOrigS);
        } else if (this.cooldown <= 0) {
            this.normalAttack(xDiff, yDiff, distance, xOrigS, yOrigS);
        }
    }

    normalAttack(xDiff, yDiff, distance, xOrigS, yOrigS) {
        let velX = (this.attackSpeed * xDiff) / distance;
        let velY = (this.attackSpeed * yDiff) / distance;

        let projectile = new Projectile(
            xOrigS,
            yOrigS,
            velX,
            velY);
        gameEngine.addEntity(projectile);
        this.cooldown = this.attackInterval;
    }

    specialAttack(xDiff, yDiff, distance, xOrigS, yOrigS) {
    }

    draw() {
        if (this.animation !== this.death) {
            if (this.isMovingWest) {
                this.animation = this.slimeEnemyWalkingLeftAnimation;
            } else if (this.isMovingEast) {
                this.animation = this.slimeEnemyWalkingRightAnimation;
            } else if (this.isAttackingLeft) {
                this.animation = this.slimeEnemyAttackLeftAnimation;
            } else if (this.isAttackingRight) {
                this.animation = this.slimeEnemyAttackRightAnimation;
            } else if (this.health == 0 && !this.hasDied) {
                this.animation = this.death;
                this.hasDied = true;
            } else {
                this.animation = this.slimeEnemyIdleAnimation;
            }
        }

        this.animation.drawFrame(gameEngine.clockTick, ctx, this.x, this.y);

        super.draw();
    }
}

/*----------------------------------------------Slime End---------------------------------------------------------------------------------------------- */

/*----------------------------------------------skeleton Start---------------------------------------------------------------------------------------------- */

class Skeleton extends HostileEntity {
    constructor(x, y) {
        super(x, y);
        this.boundingBox = new BoundingBox(x, y, 30, 50, 10, 15);
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
        this.health = 60;
    }

    update() {
        let xOrigC = (character.x + character.animation.frameWidth / 2);
        let yOrigC = (character.y + character.animation.frameHeight / 2);
        let xOrigS = (this.x + this.animation.frameWidth / 2)
        let yOrigS = (this.y + this.animation.frameHeight / 2)
        let xDiff = xOrigC - xOrigS;
        let yDiff = yOrigC - yOrigS;
        let distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);

        if (!this.alive) {
            if (this.death && this.animation == this.death) {
                this.life -= gameEngine.clockTick;
                if (this.life <= 0) this.destroyed = true;
            } else {
                this.destroyed = true;
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

        super.update();
    }

    draw() {
        if (this.isMovingWest) {
            this.animation = this.skeletonWalkingLeftAnimation;
        } else {
            this.animation = this.skeletonWalkingRightAnimation;
        }

        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);

        super.draw();
    }
}

/*----------------------------------------------skeleton End------------------------------------------------------------------------------------------------- */

/*----------------------------------------------Wraith Start------------------------------------------------------------------------------------------------ */

class Wraith extends HostileEntity {
    constructor(x, y) {
        super(x, y);
        this.boundingBox = new BoundingBox(x, y, 30, 50, 25, 15);
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
        this.health = 60;
        this.life = 1;
    }

    update() {
        let xOrigC = (character.x + character.animation.frameWidth / 2);
        let yOrigC = (character.y + character.animation.frameHeight / 2);
        let xOrigS = (this.x + this.animation.frameWidth / 2)
        let yOrigS = (this.y + this.animation.frameHeight / 2)
        let xDiff = xOrigC - xOrigS;
        let yDiff = yOrigC - yOrigS;
        let distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);

        if (!this.alive) {
            if (this.death && this.animation == this.death) {
                this.life -= gameEngine.clockTick;
                if (this.life <= 0) this.destroyed = true;
            } else {
                this.destroyed = true;
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

        super.update();
    }

    draw() {
        if (this.animation !== this.death) {
            if (this.isMovingWest) {
                this.animation = this.wizardWalkingLeftAnimation;
            } else {
                this.animation = this.wizardWalkingRightAnimation;
            }
        }

        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);

        if (this.animation === this.death) {
            this.life -= gameEngine.clockTick;
            if (this.life <= 0) this.destroyed = true;
        }

        super.draw();
    }
}

/*----------------------------------------------Wraith End--------------------------------------------------------------------------------------------------- */

/*----------------------------------------------Sorcerer Start---------------------------------------------------------------------------------------- */

class Sorcerer extends HostileEntity {
    constructor(x, y) {
        super(x, y);
        this.boundingBox = new BoundingBox(x, y, 20, 60, 35, 30);
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
        this.health = 200;
    }

    update() {
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

        if (!this.alive) {
            if (this.death && this.animation == this.death) {
                this.life -= gameEngine.clockTick;
                if (this.life <= 0) this.destroyed = true;
            } else {
                this.destroyed = true;
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

        if (!Collision.hasCollidedWithWalls(this.x + 30, 90 + this.y, 20)) {
            canMove = true
        }

        if (!canMove) {
            this.x = origX;
            this.y = origY;
        }

        super.update();
    }

    attack(xDiff, yDiff, distance, xOrigS, yOrigS) {
        if (this.special <= 0) {
            this.specialAttack(xDiff, yDiff, distance, xOrigS, yOrigS);
        } else if (this.cooldown <= 0) {
            this.normalAttack(xDiff, yDiff, distance, xOrigS, yOrigS);
        }
    }

    normalAttack(xDiff, yDiff, distance, xOrigS, yOrigS) {
        let velX = (this.attackSpeed * xDiff) / distance;
        let velY = (this.attackSpeed * yDiff) / distance;

        let projectile = new Projectile(
            xOrigS,
            yOrigS,
            velX,
            velY);
        gameEngine.addEntity(projectile);
        this.cooldown = this.attackInterval;
    }

    specialAttack(xDiff, yDiff, distance, xOrigS, yOrigS) {
    }

    draw() {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);

        super.draw();
    }
}

/*----------------------------------------------Sorcerer End------------------------------------------------------------------------------------------ */

/*----------------------------------------------Projectile Start--------------------------------------------------------------------------------------------- */

class Projectile extends Entity {
    constructor(x, y, xs, ys) {
        super(gameEngine, x, y, false);
        this.xs = xs;
        this.ys = ys;
        this.scale = 4;
        this.life = 10;
        this.boundingBox = new BoundingBox(this.x, this.y, this.scale * 2, this.scale * 2, -this.scale, -this.scale);
    }

    update() {
        if (Collision.hasCollidedWithWalls(this.x, this.y, world1.currentScale)) {
            this.destroy();
            return;
        }

        if (this.boundingBox.hasCollided(character.boundingBox)) {
            this.destroy();
            character.damage(5);
        }

        this.x += this.xs;
        this.y += this.ys;
        this.life -= gameEngine.clockTick;
        if (this.life <= 0) this.destroyed = true;

        super.update();
    }

    draw() {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.scale, 0, 2 * Math.PI);
        ctx.fillStyle = `rgb(253,208,157)`;
        ctx.fill();
        ctx.restore()

        super.draw();
    }
}

/*----------------------------------------------Projectile End----------------------------------------------------------------------------------------------- */