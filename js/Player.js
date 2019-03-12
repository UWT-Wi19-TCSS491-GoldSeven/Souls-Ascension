import Animation from './Animation.js'
import BoundingBox from './BoundingBox.js'
import LivingEntity from './LivingEntity.js'
import TextIndicator from './ui/TextIndicator.js';

class Player extends LivingEntity {
    constructor(game, x, y) {
        super(game, x, y);

        // Collision Detection
        this.boundingBox = new BoundingBox(this.x, this.y, 20, 40, 5);
        this.wallAABB = new BoundingBox(this.x, this.y, 20, 20, 5, 10);

        // Animations
        this.animIdleUp = new Animation(game.assetManager.getAsset('player.idle.up'), 0, 0, 42, 42, 0.08, 1, true, false);
        this.animIdleDown = new Animation(game.assetManager.getAsset('player.idle.down'), 0, 0, 42, 42, 0.08, 4, true, false);
        this.animIdleLeft = new Animation(game.assetManager.getAsset('player.idle.left'), 0, 0, 42, 42, 0.08, 1, true, false);
        this.animIdleRight = new Animation(game.assetManager.getAsset('player.idle.right'), 0, 0, 42, 42, 0.08, 1, true, false);
        this.animRunUp = new Animation(game.assetManager.getAsset('player.run.up'), 0, 0, 42, 42, 0.15, 5, true, false);
        this.animRunDown = new Animation(game.assetManager.getAsset('player.run.down'), 0, 0, 42, 42, 0.15, 5, true, false);
        this.animRunLeft = new Animation(game.assetManager.getAsset('player.run.left'), 0, 0, 42, 42, 0.15, 6, true, false);
        this.animRunRight = new Animation(game.assetManager.getAsset('player.run.right'), 0, 0, 42, 42, 0.15, 6, true, false);
        this.animAttackUp = new Animation(game.assetManager.getAsset('player.attack.up'), 0, 0, 42, 42, 0.04, 3, false, false);
        this.animAttackDown = new Animation(game.assetManager.getAsset('player.attack.down'), 0, 0, 42, 42, 0.04, 3, false, false);
        this.animAttackLeft = new Animation(game.assetManager.getAsset('player.attack.left'), 0, 0, 42, 42, 0.04, 3, false, false);
        this.animAttackRight = new Animation(game.assetManager.getAsset('player.attack.right'), 0, 0, 42, 42, 0.04, 3, false, false);
        this.animWhirlwind = new Animation(game.assetManager.getAsset('player.attack.whirlwind'), 0, 0, 42, 42, 0.04, 4, false, false);

        this.animation = this.animIdleDown; // initial animation.

        // Attack Parameters
        this.attackDamage = 8;
        this.attackCooldown = 0;
        this.attackCooldownTime = 5;
        this.attackReady = true;
        this.attackLeftAABB = new BoundingBox(0, 0, 20, 40, 5);
        this.attackRightAABB = new BoundingBox(0, 0, 20, 40, 5);
        this.attackDownAABB = new BoundingBox(0, 0, 20, 40, 5);
        this.attackUPAABB = new BoundingBox(0, 0, 20, 40, 5);

        // Whirlwind Parameters
        this.whirlwindDamage = 30;
        this.whirlwindCooldown = 0;
        this.whirlwindCooldownTime = 200;
        this.whirlwindReady = true;
        this.whirlwindAABB = new BoundingBox(0, 0, 60, 80);

        // Player Stats
        this.level = 1;
        this.currentExp = 0;
        this.levelExp = this.level * 100;

        this.health = 1000;
        this.maxHealth = 1000 + 1000 * (this.level - 1) * 0.2;

        this.soul = 1;
        this.currentSoul = 0;
        this.levelSoul = this.soul * 150;

        this.travelSpeed = 2;

        // Inventory
        this.inventory = {
            HealingPotion: 1,
            SilverKey: 0,
            GoldKey: 0
        };

        // Utility
        this.textIndicator = new TextIndicator(game, x, y);
    }

    updateViewport() {
        let camera = this.game.camera;
        camera.setOrigin(this.boundingBox.origin.x, this.boundingBox.origin.y);
    }

    isMoving() {
        return this.game.left || this.game.right || this.game.up || this.game.down;
    }

    isPerformingAction() {
        return this.isAttacking || this.isWhirlwinding;
    }

    isIdle() {
        return !this.isMoving() && !this.isPerformingAction();
    }

    attemptOpenDoor(column, row, id) {
        if (this.game.level.isExitDoor(id)) {
            this.game.level.openDoor(column, row);
            this.game.level.loadNextLevel();
        } else if (this.game.level.isSilverDoor(id) && this.inventory.SilverKey > 0) {
            this.inventory.SilverKey -= 1;
            this.game.level.openDoor(column, row);
        } else if (this.game.level.isGoldDoor(id) && this.inventory.GoldKey > 0) {
            this.inventory.GoldKey -= 1;
            this.game.level.openDoor(column, row);
        }
    }

    updateAttackStates() {
        if (this.isAttacking) {
            if (this.attackCooldown > 0) {
                this.attackCooldown -= 1;
                if (this.attackCooldown == 0) {
                    this.attackReady = true;
                    this.isAttacking = false;
                }
            }

            if (this.animAttackRight.isDone()) {
                this.animAttackRight.elapsedTime = 0
                this.isAttacking = false;
                this.attackCooldown = this.attackCooldownTime;
            }

            if (this.animAttackLeft.isDone()) {
                this.animAttackLeft.elapsedTime = 0
                this.isAttacking = false;
                this.attackCooldown = this.attackCooldownTime;
            }

            if (this.animAttackUp.isDone()) {
                this.animAttackUp.elapsedTime = 0
                this.isAttacking = false;
                this.attackCooldown = this.attackCooldownTime;
            }

            if (this.animAttackDown.isDone()) {
                this.animAttackDown.elapsedTime = 0
                this.isAttacking = false;
                this.attackCooldown = this.attackCooldownTime;
            }
        }

        if (this.isWhirlwinding) {
            if (this.isWhirlwinding && this.animWhirlwind.isDone()) {
                this.animWhirlwind.elapsedTime = 0
                this.isWhirlwinding = false;
                this.whirlwindCooldown = this.whirlwindCooldownTime;
            }
        }

        if (this.whirlwindCooldown > 0) {
            this.whirlwindCooldown -= 1;
            if (this.whirlwindCooldown == 0) {
                this.whirlwindReady = true;
                this.isWhirlwinding = false;
            }
        }
    }

    update() {
        super.update();

        if (this.game.left) {
            this.xMot -= this.travelSpeed;
        } else if (this.game.right) {
            this.xMot += this.travelSpeed;
        }

        if (this.game.up) {
            this.yMot -= this.travelSpeed;
        } else if (this.game.down) {
            this.yMot += this.travelSpeed;
        }

        if (this.xMot != 0 || this.yMot != 0) {
            this.updatePosition(this.wallAABB);
        }

        if (this.wallCollisionResult) {
            let candidates = this.wallCollisionResult.candidates;
            if (candidates.length > 0) {
                for (let i in candidates) {
                    let candidate = candidates[i];
                    let data = candidate.data;

                    if (data instanceof Array) {
                        for (let j in data) {
                            if (this.game.level.isDoor(data[j])) {
                                this.attemptOpenDoor(candidate.column, candidate.row, data[j]);
                            }
                        }
                    } else {
                        if (this.game.level.isDoor(data)) {
                            this.attemptOpenDoor(candidate.column, candidate.row, data);
                        }
                    }
                }
            }
        }

        this.updateAABBs();
        this.updateViewport();

        if (this.game.whirlwind) this.isWhirlwinding = true;
        if (this.game.attack) this.isAttacking = true;

        if (this.game.heal && this.inventory.HealingPotion > 0) {
            this.health = this.maxHealth;
            this.inventory.HealingPotion -= 1;
            this.game.heal = null;
        }

        this.animation = this.animIdleDown;

        if (this.isAttacking && this.attackCooldown == 0) {
            if (this.direction === 'left') {
                this.animation = this.animAttackLeft;
                this.attackAABB = this.attackLeftAABB;
            } else if (this.direction === 'right') {
                this.animation = this.animAttackRight;
                this.attackAABB = this.attackRightAABB;
            } else if (this.direction === 'up') {
                this.animation = this.animAttackUp;
                this.attackAABB = this.attackUPAABB;
            } else {
                this.animation = this.animAttackDown;
                this.attackAABB = this.attackDownAABB;
            }
        } else if (this.isWhirlwinding && this.whirlwindCooldown == 0) {
            this.animation = this.animWhirlwind;
            this.attackAABB = this.whirlwindAABB;
        } else {
            if (this.isMoving()) {
                if (this.direction === 'left') {
                    this.animation = this.animRunLeft;
                } else if (this.direction === 'right') {
                    this.animation = this.animRunRight;
                } else if (this.direction === 'up') {
                    this.animation = this.animRunUp;
                } else {
                    this.animation = this.animRunDown;
                }
            } else {
                this.animation = this.getIdleAnimation(this.direction);
            }
        }

        this.updateAttackStates();

        // Hide the damage/exp text popup
        if (new Date().getTime() - this.textIndicator.time > 500) {
            this.textIndicator.damaged = 0;
            this.textIndicator.exp = 0;
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
                            this.textIndicator.x = other.x;
                            this.textIndicator.y = other.y;
                            this.textIndicator.damaged = damage;
                            this.textIndicator.time = new Date().getTime();
                        }

                        if (other.health <= 0 || other.health == null) {
                            if (other.alive) {
                                other.alive = false;

                                if (other.animDeath === null) {
                                    other.destroy();
                                } else {
                                    other.animation = other.animDeath;
                                }

                                this.currentExp += (this.level + 1) * 20; // may change the formular later
                                this.textIndicator.exp = (this.level + 1) * 20;
                            }
                        }
                    }
                }
            }
        }

        if (this.isAttacking && this.attackReady) {
            this.game.sounds.get('player.attack').replay();
            this.attackReady = false;
            this.attackAABB = null;
        }

        if (this.isWhirlwinding && this.whirlwindReady) {
            this.game.sounds.get('player.whirlwind').replay();
            this.whirlwindReady = false;
            this.attackAABB = null;
        }
    }

    getAttackAnimation(direction) {
        if (direction == 'left') return this.animAttackLeft;
        if (direction == 'right') return this.animAttackRight;
        if (direction == 'up') return this.animAttackUp;
        return this.animAttackDown;
    }

    getRunAnimation(direction) {
        if (direction == 'left') return this.animRunLeft;
        if (direction == 'right') return this.animRunRight;
        if (direction == 'up') return this.animRunUp;
        return this.animRunDown;
    }


    getIdleAnimation(direction) {
        if (direction === 'left') return this.animIdleLeft;
        if (direction === 'right') return this.animIdleRight;
        if (direction === 'up') return this.animIdleUp;
        return this.animIdleDown;
    }

    updateAABBs() {
        this.wallAABB.setPos(this.x, this.y);
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

            this.toggleGameOver();

            this.destroy();
        }
    }

    toggleGameOver() {
        let text = document.getElementById('game-over');
        if (text.style.display === 'inline') {
            text.style.display = 'none';
        } else {
            text.style.display = 'inline';

            let tPos = text.getBoundingClientRect();
            let cPos = this.game.ctx.canvas.getBoundingClientRect();
            let x = cPos.left + (cPos.width - tPos.width) / 2;
            let y = cPos.top + (cPos.height - tPos.height) / 2;

            text.style.position = 'absolute';
            text.style.left = x + 'px';
            text.style.top = y + 'px';
        }
    }

    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);

        if (this.game.debug.enabled) {
            let verbosity = this.game.debug.verbosity;
            if (verbosity > 0) {
                this.wallAABB.draw(ctx, 'blue', 5);

                if (verbosity > 1) {
                    this.whirlwindAABB.draw(ctx, 'red');

                    this.attackLeftAABB.draw(ctx, 'orange');
                    this.attackRightAABB.draw(ctx, 'orange');
                    this.attackUPAABB.draw(ctx, 'orange');
                    this.attackDownAABB.draw(ctx, 'orange');
                }
            }
        }

        super.draw(ctx);
        this.textIndicator.draw(ctx);
    }
}

export default Player;
