/*----------------------------------------------Character Start---------------------------------------------------------------------------------------------- */

class Character extends LivingEntity {
    constructor(x, y) {
        super(gameEngine, x, y);
        this.boundingBox = new BoundingBox(this.x, this.y, 20, 40, 10);
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
        this.attackCooldownTime = 5;
        this.attackReady = true;
        this.attackLeftAABB = new BoundingBox(0, 0, 20, 40, 10);
        this.attackRightAABB = new BoundingBox(0, 0, 20, 40, 10);
        this.attackDownAABB = new BoundingBox(0, 0, 20, 40, 10);
        this.attackUPAABB = new BoundingBox(0, 0, 20, 40, 10);

        this.direction = null;
        this.facing = null;

        this.whirlwindDamage = 30;
        this.whirlwindCooldown = 0;
        this.whirlwindCooldownTime = 200;
        this.whirlwindReady = true;
        this.whirlwindAABB = new BoundingBox(this.x - 10, this.y - 20, 60, 80);

        this.updateAABBs();

        this.inventory = {
            HealingPotion: 1,
            SilverKey: 2,
            GoldKey: 0
        };
        this.level = 1;
        this.soul = 1;
        this.travelSpeed = 2;
        this.maxHealth = 1000 + 1000 * (this.level - 1) * 0.2;
        this.health = 1000;
        this.currentSoul = 0;
        this.levelSoul = this.soul * 150;
        this.currentExp = 0;
        this.levelExp = this.level * 100;
        this.scale = 1; // set to 1 if the sprite dimensions are the exact size that should be rendered.
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
        if (this.game.whirlwind) {
            this.isWhirlwinding = true;
        }
        if (this.game.attack) {
            this.isAttacking = true;
        }
        if (this.game.up && this.game.left) this.isMovingUpLeft = true;
        if (this.game.up && this.game.right) this.isMovingUpRight = true;
        if (this.game.down && this.game.left) this.isMovingDownLeft = true;
        if (this.game.down && this.game.right) this.isMovingDownRight = true;

        // TODO should look into refactoring this for performance improvement
        if (this.game.left && !Collision.hasCollidedWithWalls(this.x + 8 - this.travelSpeed, world1.currentScale - 5 + this.y, 25, true)) {
            this.isMovingLeft = true
            this.direction = "left";
            this.facing = this.getIDLE("left");
        }
        if (this.game.right && !Collision.hasCollidedWithWalls(this.x + 8 + this.travelSpeed, world1.currentScale - 5 + this.y, 25, true)) {
            this.isMovingRight = true;
            this.direction = "right";
            this.facing = this.getIDLE("right");
        }
        if (this.game.up && !Collision.hasCollidedWithWalls(this.x + 8, 25 + this.y - this.travelSpeed, 25, true)) {
            this.isMovingUp = true;
            this.direction = "up";
            this.facing = this.getIDLE("up");
        }
        if (this.game.down && !Collision.hasCollidedWithWalls(this.x + 8, world1.currentScale + this.y, 25, true)) {
            this.isMovingDown = true;
            this.direction = "down";
            this.facing = this.getIDLE("down");
        }

        if (this.isMovingUp) {
            this.y -= this.travelSpeed; // Moves the entity.
        } else if (this.isMovingDown) {
            this.y += this.travelSpeed; // Moves the entity.
        }

        if (this.isMovingLeft) {
            this.x -= this.travelSpeed; // Moves the entity.
        } else if (this.isMovingRight) {
            this.x += this.travelSpeed; // Moves the entity.
        }

        // Update player bounding box position
        super.update();
        // Update player attack bounding box positions
        this.updateAABBs();
        // Synchronize the viewport/camera with the players position
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
        if (this.game.heal && this.inventory.HealingPotion > 0) {
            this.health = this.maxHealth;
            this.inventory.HealingPotion -= 1;
            this.game.heal = null;
        }

        // Animation Selection Start
        this.animation = this.standAnimation;

        if (this.isAttacking && this.attackCooldown == 0) {
            if (this.isMovingLeft || this.direction === "left") {
                this.animation = this.attackLeftAnimation;
                this.attackAABB = this.attackLeftAABB;
            } else if (this.isMovingRight || this.direction === "right") {
                this.animation = this.attackRightAnimation;
                this.attackAABB = this.attackRightAABB;
            } else if (this.isMovingUp || this.direction === "up") {
                this.animation = this.attackUpAnimation;
                this.attackAABB = this.attackUPAABB;
            } else {
                this.animation = this.attackDownAnimation;
                this.attackAABB = this.attackDownAABB;
            }
        } else if (this.isWhirlwinding && this.whirlwindCooldown == 0) {
            this.animation = this.whirlwindAttackAnimation;
            this.attackAABB = this.whirlwindAABB;
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

        // Hide the damage/exp text popup
        if (new Date().getTime() - damageST.time > 500) {
            damageST.damaged = 0;
            damageST.exp = 0;
        }

        // Iterate through all entities to check if anyone has collided with another, and take appropriate action.
        for (let i = 0; i < this.game.entities.length; i++) {
            let other = this.game.entities[i];
            if (other == this || !(other instanceof LivingEntity)) continue;

            if (other.boundingBox && !other.invulnerable) {
                if (this.attackAABB) {
                    // Inflict damage on the enemy. Kick the Satan! Punch the Devil!
                    // Start Attack
                    if (this.attackAABB.hasCollided(other.boundingBox)) {
                        let damage = 0;
                        if (this.attackReady && this.game.attack) {
                            damage = this.attackDamage * (1 + (this.level - 1) * 0.1 + this.soul);
                        }

                        if (this.whirlwindReady && this.game.whirlwind) {
                            damage = this.whirlwindDamage * (1 + (this.level - 1) * 0.1 + this.soul); // TODO Is this where to adjust damage amount?
                        }

                        if (damage > 0) {
                            other.damage(damage);
                            damageST.x = other.x;
                            damageST.y = other.y;
                            damageST.damaged = damage;
                            damageST.time = new Date().getTime();
                            bug = 0;
                        }

                        if (other.health <= 0 || other.health == null) {
                            if (other.alive) {
                                other.alive = false;

                                if (other.death === null) {
                                    other.destroy();
                                } else {
                                    other.animation = other.death;
                                }

                                this.currentExp += (this.level + 1) * 20; // may change the formular later
                                damageST.exp = (this.level + 1) * 20;
                            }
                        }
                    }
                }
            }
        }

        if (this.isAttacking && this.attackReady) {
            this.game.sounds.get('characterAttack01').replay();
            this.attackReady = false;
            this.attackAABB = null;
        }

        if (this.isWhirlwinding && this.whirlwindReady) {
            this.game.sounds.get('characterAttack02').replay();
            this.whirlwindReady = false;
            this.attackAABB = null;
        }
    }
    getIDLE(direction) {
        if (direction === "left") return ASSET_MANAGER.getAsset("./assets/sprites/CharacterLeftIdle.png");
        if (direction === "right") return ASSET_MANAGER.getAsset("./assets/sprites/CharacterRightIdle.png");
        if (direction === "up") return ASSET_MANAGER.getAsset("./assets/sprites/CharacterUpIdle.png");
        return null;
    }

    updateAABBs() {
        this.attackLeftAABB.setPos(this.x - 15, this.y);
        this.attackRightAABB.setPos(this.x + 15, this.y);
        this.attackDownAABB.setPos(this.x, this.y + 15);
        this.attackUPAABB.setPos(this.x, this.y - 15);
        this.whirlwindAABB.setPos(this.x - 10, this.y - 20);
    }

    damage(amount) {
        super.damage(amount);

        if (this.health <= 0) {
            this.alive = false;

            let text = document.getElementById('game-over');

            text.style.display = 'inline';

            let tPos = text.getBoundingClientRect();
            let cPos = gameEngine.ctx.canvas.getBoundingClientRect();
            let x = cPos.left + (cPos.width - tPos.width) / 2
            let y = cPos.top + (cPos.height - tPos.height) / 2

            text.style.position = 'absolute';
            text.style.left = x + 'px';
            text.style.top = y + 'px';
        }
    }

    draw() {
        if (this.animation !== this.standAnimation || null === this.facing)
            this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        else if (null !== this.facing) {
            ctx.drawImage(this.facing, this.x, this.y, world1.currentScale, world1.currentScale);
        }
        if (this.game.debug) {
            this.whirlwindAABB.draw(ctx, 'red');

            this.attackLeftAABB.draw(ctx, 'orange');
            this.attackRightAABB.draw(ctx, 'orange');
            this.attackUPAABB.draw(ctx, 'orange');
            this.attackDownAABB.draw(ctx, 'orange');

            for (let i = 0; i < leafs.length; i++) {
                ctx.strokeStyle = "red";
                ctx.strokeRect(leafs[i].x, leafs[i].y, leafs[i].w, leafs[i].h);
                ctx.strokeStyle = "green";
                for (let j = 0; j < leafs[i].walls.length; j++)
                    ctx.strokeRect(leafs[i].walls[j].x, leafs[i].walls[j].y, 48, 48);
            }
        }

        super.draw();

        drawHPBar();
    }
}

/*----------------------------------------------Character End---------------------------------------------------------------------------------------------- */
