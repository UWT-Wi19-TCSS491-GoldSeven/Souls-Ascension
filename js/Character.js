/*----------------------------------------------Character Start---------------------------------------------------------------------------------------------- */
// The entity's viewport is determined by its BoundingBox object.
let inventory = {
    hp: {value: 100, quantity: 1},
    SilverKey: 1,
    GoldKey: 0
};

let world;

class Character extends Entity {
    constructor(x, y, theCurrentWorld) {
        super(gameEngine, x, y);
        world = theCurrentWorld;
        this.standAnimation = new Animation(ASSET_MANAGER.getAsset("./assets/sprites/characterIdleAnimation.png"), 0, 0, 42, 42, 0.08, 4, true, false);
        this.walkRightAnimation = new Animation(ASSET_MANAGER.getAsset("./assets/sprites/characterRightAnimation.png"), 0, 0, 42, 42, 0.15, 6, true, false);
        this.walkUpLeftAnimation = new Animation(ASSET_MANAGER.getAsset("./assets/sprites/spritesheet.png"), 32, 32, 33, 32, 1.04, 1, true, false);
        this.walkLeftAnimation = new Animation(ASSET_MANAGER.getAsset("./assets/sprites/characterLeftAnimation.png"), 0, 0, 42, 42, 0.15, 6, true, false);
        this.walkUpRightAnimation = new Animation(ASSET_MANAGER.getAsset("./assets/sprites/spritesheet.png"), 32, 64, 33, 32, 1.04, 1, true, false);
        this.walkUpAnimation = new Animation(ASSET_MANAGER.getAsset("./assets/sprites/characterBackwardRun.png"), 0, 0, 42, 42, 0.15, 5, true, false);
        this.walkDownLeftAnimation = new Animation(ASSET_MANAGER.getAsset("./assets/sprites/spritesheet.png"), 32, 96, 32, 32, 1.04, 1, true, false);
        this.walkDownAnimation = new Animation(ASSET_MANAGER.getAsset("./assets/sprites/CharacterForwardRun.png"), 0, 0, 42, 42, 0.15, 5, true, false);
        this.walkDownRightAnimation = new Animation(ASSET_MANAGER.getAsset("./assets/sprites/spritesheet.png"), 32, 128, 32, 32, 1.04, 1, true, false);
        this.attackUpAnimation = new Animation(ASSET_MANAGER.getAsset("./assets/sprites/characterUpAttack.png"), 0, 0, 42, 42, 0.04, 3, false, false);
        this.attackDownAnimation = new Animation(ASSET_MANAGER.getAsset("./assets/sprites/characterDownAttack.png"), 0, 0, 42, 42, 0.04, 3, false, false);
        this.attackLeftAnimation = new Animation(ASSET_MANAGER.getAsset("./assets/sprites/characterLeftAttack.png"), 0, 0, 42, 42, 0.04, 3, false, false);
        this.attackRightAnimation = new Animation(ASSET_MANAGER.getAsset("./assets/sprites/characterRightAttack.png"), 0, 0, 42, 42, 0.04, 3, false, false);
        this.whirlwindAttackAnimation = new Animation(ASSET_MANAGER.getAsset("./assets/sprites/characterWhirlWindAttackAnimation.png"), 0, 0, 42, 42, 0.04, 4, false, false);
        this.animation = this.standAnimation; // initial animation.

        this.isAttacking = false;
        this.isWhirlwinding = false;
        this.isMovingLeft = false;
        this.isMovingRight = false;
        this.isMovingUp = false;
        this.isMovingDown = false;
        this.isMovingUpLeft = false;
        this.isMovingUpRight = false;
        this.isMovingDownLeft = false;
        this.isMovingDownRight = false;

        this.attackDamage = 8;
        this.attackCooldown = 0;
        this.attackCooldownTime = 3;
        this.attackReady = true;

        this.whirlwindDamage = 30;
        this.whirlwindCooldown = 0;
        this.whirlwindCooldownTime = 200;
        this.whirlwindReady = true;

        this.radius = 100;
        this.inventory = inventory;
        this.level = 1;
        this.soul = 1;
        this.travelSpeed = 2;
        this.killable = true;
        this.maxHealth = 1000 + 1000 * (this.level - 1) * 0.2;
        this.currentHealth = 1000;
        this.currentSoul = 0;
        this.levelSoul = this.soul * 150;
        this.currentExp = 0;
        this.levelExp = this.level * 100;
        this.scale = 1; // set to 1 if the sprite dimensions are the exact size that should be rendered.
        this.boundingBox = new BoundingBox(0, 0, 20, 40, 10);
    }

    updateViewport() {
        let sx = this.game.viewport.sx;
        let sy = this.game.viewport.sy;
        // Calculates the position with the given scale.
        this.game.viewport.x = (this.x + this.boundingBox.width) * sx - this.game.ctx.canvas.width / 2;
        this.game.viewport.y = (this.y + this.boundingBox.height / 2) * sy - this.game.ctx.canvas.height / 2;
    }

    update() {
        this.isMovingUp = false;
        this.isMovingLeft = false;
        this.isMovingDown = false;
        this.isMovingRight = false;
        this.isMovingUpLeft = false;
        this.isMovingUpRight = false;
        this.isMovingDownLeft = false;
        this.isMovingDownRight = false;
        if (this.game.one) {
            this.isWhirlwinding = true;
        }
        if (this.game.click) {
            this.isAttacking = true;
        }
        if (this.game.up && this.game.left) this.isMovingUpLeft = true;
        if (this.game.up && this.game.right) this.isMovingUpRight = true;
        if (this.game.down && this.game.left) this.isMovingDownLeft = true;
        if (this.game.down && this.game.right) this.isMovingDownRight = true;
        if (this.game.left && !collisionDetect(this.x + 8 - this.travelSpeed, world.currentScale - 5 + this.y, 25, true)) {
            this.isMovingLeft = true
        }//
        if (this.game.right && !collisionDetect(this.x + 8 + this.travelSpeed, world.currentScale - 5 + this.y, 25, true)) {
            this.isMovingRight = true
        }
        if (this.game.up && !collisionDetect(this.x + 8, 25 + this.y - this.travelSpeed, 25, true)) {
            this.isMovingUp = true;
        }
        if (this.game.down && !collisionDetect(this.x + 8, world.currentScale + this.y, 25, true)) {
            this.isMovingDown = true;
        }
        if (this.game.debug && (this.isMovingLeft || this.isMovingRight || this.isMovingUp || this.isMovingDown)) {
            // console.log(this);
        }
        if (this.isMovingUp) {
            this.y -= this.travelSpeed; // Moves the entity.
        } else if (this.isMovingDown) {
            this.y += this.travelSpeed; // Moves the entity.
        }
        if (this.isMovingLeft) {
            let speed = this.travelSpeed;
            this.x -= this.travelSpeed; // Moves the entity.
        } else if (this.isMovingRight) {
            let speed = this.travelSpeed;
            this.x += this.travelSpeed; // Moves the entity.
        }
        // The boundingBox follows the entity.
        this.boundingBox.x = this.x;
        this.boundingBox.y = this.y;

        this.updateViewport();

        if (this.isAttacking) {
            if (this.attackRightAnimation.isDone()) {
                this.attackRightAnimation.elapsedTime = 0
                this.isAttacking = false;
                this.attackCooldown = this.attackCooldownTime;
            }
            if (this.attackLeftAnimation.isDone()) {
                this.attackLeftAnimation.elapsedTime = 0
                this.isAttacking = false;
                this.attackCooldown = this.attackCooldownTime;
            }
            if (this.attackUpAnimation.isDone()) {
                this.attackUpAnimation.elapsedTime = 0
                this.isAttacking = false;
                this.attackCooldown = this.attackCooldownTime;
            }
            if (this.attackDownAnimation.isDone()) {
                this.attackDownAnimation.elapsedTime = 0
                this.isAttacking = false;
                this.attackCooldown = this.attackCooldownTime;
            }
        }
        if (this.isWhirlwinding) {
            if (this.whirlwindAttackAnimation.isDone()) {
                this.whirlwindAttackAnimation.elapsedTime = 0
                this.isWhirlwinding = false;
                this.whirlwindCooldown = this.whirlwindCooldownTime;
            }
        }
        if (this.game.used === 'hp' && this.inventory['hp'].quantity > 0) {
            this.currentHealth = Math.min(this.currentHealth + this.inventory['hp'].value, this.maxHealth);
            this.inventory['hp'].quantity -= 1;
            this.game.used = null;
        }

        // Animation Selection Start
        this.animation = this.standAnimation;

        if (this.isAttacking && this.attackCooldown == 0) {
            //console.debug("Character isAttacking");
            if (this.isMovingUp) {
                this.animation = this.attackUpAnimation;
            } else if (this.isMovingLeft) {
                this.animation = this.attackLeftAnimation;
            } else if (this.isMovingRight) {
                this.animation = this.attackRightAnimation;
            } else {
                this.animation = this.attackDownAnimation;
            }
        } else if (this.isWhirlwinding && this.whirlwindCooldown == 0) {
            //console.debug("Character isWhirlwinding");
            this.animation = this.whirlwindAttackAnimation;
        } else {
            if (this.isMovingUpLeft) {
                this.animation = this.walkLeftAnimation;
            } else if (this.isMovingUpRight) {
                this.animation = this.walkRightAnimation;
            } else if (this.isMovingDownLeft) {
                this.animation = this.walkLeftAnimation;
            } else if (this.isMovingDownRight) {
                this.animation = this.walkRightAnimation;
            } else if (this.isMovingUp) {
                this.animation = this.walkUpAnimation;
            } else if (this.isMovingDown) {
                this.animation = this.walkDownAnimation;
            } else if (this.isMovingLeft) {
                this.animation = this.walkLeftAnimation;
            } else if (this.isMovingRight) {
                this.animation = this.walkRightAnimation;
            } else {
                this.animation = this.standAnimation;
            }
        }
// Animation Selection End

// Attack Start
        if (this.attackCooldown > 0) {
            this.attackCooldown -= 1;
            if (this.attackCooldown == 0) {
                this.attackReady = true;
                this.game.click = null;
                this.isAttacking = false;
            }
        }

        if (this.whirlwindCooldown > 0) {
            this.whirlwindCooldown -= 1;
            if (this.whirlwindCooldown == 0) {
                this.whirlwindReady = true;
                this.isWhirlwinding = false;
            }
        }

        let scaleOf = 4;
        let range = (this.isWhirlwinding) ? world.currentScale * 1.5 : (this.isAttacking) ? world.currentScale / 2 : 0;
        let newXY = this.getNewXY();
        let newX = newXY.x;
        let newY = newXY.y;

        if (new Date().getTime() - damageST.time > 500) {
            damageST.damaged = 0;
            damageST.exp = 0;
        } //hide

// Iterate through all entities to check if anyone has collided with another, and take appropriate action.
        for (let i = 0; i < gameEngine.entities.length; i++) {
            let other = gameEngine.entities[i];
            if (other == this || typeof other === 'undefined') continue;
            scaleOf = (other instanceof Projectile) ? 4 : world.currentScale - 10;
            if (isCollide(newX + 20, newY - scaleOf + 20, 5 + range, 42 + range, other, scaleOf + range, scaleOf + range)) {
                // TODO: This should really be handled by individual enemies/entities and updated in their update methods.
                if (other instanceof Projectile) {
                    other.isDestroyed = true;
                    this.currentHealth -= 5;
                    break;
                }
                if (other instanceof SilverKey) {
                    this.inventory['SilverKey'] += 1;
                    other.isDestroyed = true;
                    break;
                }
                if (other instanceof GoldKey) {
                    this.inventory['GoldKey'] += 1;
                    other.isDestroyed = true;
                    break;
                }
                if (other instanceof HealingPotion) {
                    this.inventory['hp'].quantity += 1;
                    other.isDestroyed = true;
                    break;
                }
                if (other instanceof SoulJar) {
                    let jar = other.jar || 0;
                    this.currentSoul += jar;
                    if (jar > 0 || heal > 0) {
                        other.killed = true;
                        let xOrigC = (character.x + character.animation.frameWidth / 2 - 380 + 100);
                        let yOrigC = (character.y + character.animation.frameHeight / 2 - 380 + 60);
                        let xOrigS = (other.x)
                        let yOrigS = (other.y)
                        let xDiff = xOrigC - xOrigS;
                        let yDiff = yOrigC - yOrigS;
                        let distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
                        other.toX = (10 * xDiff) / distance;
                        other.toY = (10 * yDiff) / distance;
                        other.x += (50 * xDiff) / distance;
                        other.y += (50 * yDiff) / distance;
                        break;
                    }
                }

                // Inflict damage on the enemy. Kick the Satan! Punch the Devil!
                let damage = 0;
                if (this.attackReady && this.game.click) {
                    this.game.click = false;

                    damage = this.attackDamage * (1 + (this.level - 1) * 0.1 + this.soul);
                    if (this.game.debug) console.debug("Attacking!");
                }

                if (this.whirlwindReady && this.game.one) {
                    damage = this.whirlwindDamage * (1 + (this.level - 1) * 0.1 + this.soul); // TODO Is this where to adjust damage amount?
                    if (this.game.debug) console.debug("Whirlwinding!");
                }

                if (damage > 0) {
                    other.currentHealth -= damage;
                    damageST.x = other.x;
                    damageST.y = other.y;
                    damageST.damaged = damage;
                    damageST.time = new Date().getTime();
                    bug = 0;
                }

                if (other.currentHealth <= 0 || other.currentHealth == null) {
                    if (!other.killed) {
                        other.killed = true;

                        if (other.death === null) {
                            other.isDestroyed;
                        } else {
                            gameEngine.entities[i].animation = gameEngine.entities[i].death;
                            gameEngine.entities[i].killable = false;
                        }

                        this.currentExp += (this.level + 1) * 20; // may change the formular later
                        damageST.exp = (this.level + 1) * 20;
                    }
                }
            }
        }

        if (this.currentHealth <= 0) {//check here if got bug
            this.isDestroyed = true;
            let text = document.getElementById('gameover');
            text.style.display = 'inline';
            let tPos = text.getBoundingClientRect();
            let cPos = gameEngine.ctx.canvas.getBoundingClientRect();
            let x = cPos.left + (cPos.width - tPos.width) / 2
            let y = cPos.top + (cPos.height - tPos.height) / 2
            //console.log(tPos);
            text.style.position = 'absolute';
            text.style.left = x + 'px';
            text.style.top = y + 'px';
        }
// Attack End

        if (this.isAttacking && this.attackReady) {
            this.game.sounds.get('characterAttack01').replay();
            this.attackReady = false;
        }

        if (this.isWhirlwinding && this.whirlwindReady) {
            this.game.sounds.get('characterAttack02').replay();
            this.whirlwindReady = false;
        }
    }

    draw() {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);

        if (this.game.debug) {
            ctx.strokeStyle = "green";
            ctx.strokeRect(this.boundingBox.x, this.boundingBox.y, this.boundingBox.width, this.boundingBox.height);
            //ctx.strokeStyle = "orange";
            //ctx.strokeRect(this.x, this.y, this.animation.frameWidth*this.scale, this.animation.frameHeight*this.scale); //
            //console.log('BoundingBox: ' + this.boundingBox.x + ',' + this.boundingBox.y); // Debugging.
            for (let i = 0; i < leafs.length; i++) {
                ctx.strokeStyle = "red";
                ctx.strokeRect(leafs[i].x, leafs[i].y, leafs[i].w, leafs[i].h);
                ctx.strokeStyle = "green";
                for (let j = 0; j < leafs[i].walls.length; j++)
                    ctx.strokeRect(leafs[i].walls[j].x, leafs[i].walls[j].y, 48, 48);
            }
        }

        Entity.prototype.draw.call(this);

        let scaleOf = 4;
        let range = (this.isWhirlwinding) ? world.currentScale * 1.5 : (this.isAttacking) ? world.currentScale / 2 : 0;
        let newX = this.x;
        let newY = this.y;
        switch (this.animation) {
            case this.attackLeftAnimation:
                newX -= world.currentScale / 2;
                break;
            case this.attackRightAnimation:
                newX += world.currentScale / 10;
                break;
            case this.attackDownAnimation:
                newY -= world.currentScale / 5;
                break;
            case this.attackUpAnimation:
                newY += world.currentScale / 5;
                break;
            case this.whirlwindAttackAnimation:
                newX -= world.currentScale;
                newY -= world.currentScale;
            default:
                break;
        }//Sorcerer

        if (new Date().getTime() - damageST.time > 500) {
            damageST.damaged = 0;
            damageST.exp = 0;
        } //hide

        drawHPBar();
    }

    getNewXY() {
        let newX = this.x;
        let newY = this.y;
        switch (this.animation) {
            case this.attackLeftAnimation:
                newX -= world.currentScale / 2;
                break;
            case this.attackRightAnimation:
                newX += world.currentScale / 10;
                break;
            case this.attackDownAnimation:
                newY -= world.currentScale / 5;
                break;
            case this.attackUpAnimation:
                newY += world.currentScale / 5;
                break;
            case this.whirlwindAttackAnimation:
                newX -= world.currentScale;
                newY -= world.currentScale;
            default:
                break;
        }

        return {
            x: newX,
            y: newY
        }
    }
}

/*----------------------------------------------Character End---------------------------------------------------------------------------------------------- */
