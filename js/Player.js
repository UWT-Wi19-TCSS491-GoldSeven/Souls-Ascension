import Animation from './Animation.js'
import BoundingBox from './BoundingBox.js'
import LivingEntity from './LivingEntity.js'
import TextIndicator from './ui/TextIndicator.js';

class Player extends LivingEntity {
    constructor(game, x, y) {
        super(game, x, y);
        this.boundingBox = new BoundingBox(this.x, this.y, 20, 40, 5);
        this.wallAABB = new BoundingBox(this.x, this.y, 20, 20, 5, 10);
        this.standAnimation = new Animation(game.assetManager.getAsset('player.idle.down'), 0, 0, 42, 42, 0.08, 4, true, false);
        this.standLeftAnimation = new Animation(game.assetManager.getAsset('player.idle.left'), 0, 0, 42, 42, 0.08, 1, true, false);
        this.standRightAnimation = new Animation(game.assetManager.getAsset('player.idle.right'), 0, 0, 42, 42, 0.08, 1, true, false);
        this.standUpAnimation = new Animation(game.assetManager.getAsset('player.idle.up'), 0, 0, 42, 42, 0.08, 1, true, false);
        this.walkRightAnimation = new Animation(game.assetManager.getAsset('./assets/sprites/characterRightAnimation.png'), 0, 0, 42, 42, 0.15, 6, true, false);
        this.walkLeftAnimation = new Animation(game.assetManager.getAsset('./assets/sprites/characterLeftAnimation.png'), 0, 0, 42, 42, 0.15, 6, true, false);
        this.walkUpAnimation = new Animation(game.assetManager.getAsset('./assets/sprites/characterBackwardRun.png'), 0, 0, 42, 42, 0.15, 5, true, false);
        this.walkDownAnimation = new Animation(game.assetManager.getAsset('./assets/sprites/CharacterForwardRun.png'), 0, 0, 42, 42, 0.15, 5, true, false);
        this.attackUpAnimation = new Animation(game.assetManager.getAsset('./assets/sprites/characterUpAttack.png'), 0, 0, 42, 42, 0.04, 3, false, false);
        this.attackDownAnimation = new Animation(game.assetManager.getAsset('./assets/sprites/characterDownAttack.png'), 0, 0, 42, 42, 0.04, 3, false, false);
        this.attackLeftAnimation = new Animation(game.assetManager.getAsset('./assets/sprites/characterLeftAttack.png'), 0, 0, 42, 42, 0.04, 3, false, false);
        this.attackRightAnimation = new Animation(game.assetManager.getAsset('./assets/sprites/characterRightAttack.png'), 0, 0, 42, 42, 0.04, 3, false, false);
        this.whirlwindAttackAnimation = new Animation(game.assetManager.getAsset('./assets/sprites/characterWhirlWindAttackAnimation.png'), 0, 0, 42, 42, 0.04, 4, false, false);
        this.animation = this.standAnimation; // initial animation.

        this.attackDamage = 8;
        this.attackCooldown = 0;
        this.attackCooldownTime = 5;
        this.attackReady = true;
        this.attackLeftAABB = new BoundingBox(0, 0, 20, 40, 5);
        this.attackRightAABB = new BoundingBox(0, 0, 20, 40, 5);
        this.attackDownAABB = new BoundingBox(0, 0, 20, 40, 5);
        this.attackUPAABB = new BoundingBox(0, 0, 20, 40, 5);

        this.whirlwindDamage = 30;
        this.whirlwindCooldown = 0;
        this.whirlwindCooldownTime = 200;
        this.whirlwindReady = true;
        this.whirlwindAABB = new BoundingBox(0, 0, 60, 80);

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

    updateDirection() {
        if (this.game.left) this.direction = 'left';
        if (this.game.right) this.direction = 'right';
        if (this.game.up) this.direction = 'up';
        if (this.game.down) this.direction = 'down';
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
            if (this.isWhirlwinding && this.whirlwindAttackAnimation.isDone()) {
                this.whirlwindAttackAnimation.elapsedTime = 0
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

        this.updateAABBs();
        this.updateViewport();

        if (this.game.whirlwind) this.isWhirlwinding = true;
        if (this.game.attack) this.isAttacking = true;

        if (this.game.heal && this.inventory.HealingPotion > 0) {
            this.health = this.maxHealth;
            this.inventory.HealingPotion -= 1;
            this.game.heal = null;
        }

        this.animation = this.standAnimation;

        if (this.isAttacking && this.attackCooldown == 0) {
            if (this.direction === 'left') {
                this.animation = this.attackLeftAnimation;
                this.attackAABB = this.attackLeftAABB;
            } else if (this.direction === 'right') {
                this.animation = this.attackRightAnimation;
                this.attackAABB = this.attackRightAABB;
            } else if (this.direction === 'up') {
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
            if (this.isMoving()) {
                if (this.direction === 'left') {
                    this.animation = this.walkLeftAnimation;
                } else if (this.direction === 'right') {
                    this.animation = this.walkRightAnimation;
                } else if (this.direction === 'up') {
                    this.animation = this.walkUpAnimation;
                } else {
                    this.animation = this.walkDownAnimation;
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

                                if (other.death === null) {
                                    other.destroy();
                                } else {
                                    other.animation = other.death;
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


    getIdleAnimation(direction) {
        if (direction === 'left') return this.standLeftAnimation;
        if (direction === 'right') return this.standRightAnimation;
        if (direction === 'up') return this.standUpAnimation;
        return this.standAnimation;
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

            let text = document.getElementById('game-over');

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