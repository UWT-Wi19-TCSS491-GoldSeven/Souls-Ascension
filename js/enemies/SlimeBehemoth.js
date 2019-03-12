import Animation from '../Animation.js';
import HostileEntity from '../HostileEnemy.js';
import BoundingBox from '../BoundingBox.js';
import Entity from '../Entity.js';
import Projectile from './Projectile.js';

class SlimeBehemoth extends HostileEntity {
    constructor(game, x, y) {
        super(game, x, y);
        this.boundingBox = new BoundingBox(x, y, 40, 60, 10, 5);
        this.animWalkLeft = new Animation(this.game.assetManager.getAsset('behemoth.walk.left'), 0, 0, 80, 68, 0.1, 8, true, false);
        this.animWalkRight = new Animation(this.game.assetManager.getAsset('behemoth.walk.right'), 0, 0, 80, 68, 0.1, 8, true, false);
        this.animAttackLeft = new Animation(this.game.assetManager.getAsset('behemoth.attack.left'), 0, 0, 117, 68, 0.1, 8, true, false);
        this.animAttackRight = new Animation(this.game.assetManager.getAsset('behemoth.attack.right'), 0, 0, 120, 68, 0.1, 8, true, false);
        this.animDeath = null;
        this.animation = this.animWalkRight;
        this.cooldown = 0;
        this.moveSpeed = 70;
        this.attackDamage = 50;
        this.attackInterval = 4;
        this.attackRange = 40;
        this.followRange = 200;
        this.maxHealth = 200;
        this.health = 200;
    }

    update() {
        super.update();

        if (!this.alive) {
            if (this.animDeath && this.animation == this.animDeath) {
                this.life -= this.game.clockTick;
                if (this.life <= 0) this.destroyed = true;
            } else {
                this.destroyed = true;
            }

            return;
        }

        let player = this.game.level.getEntityWithTag('Player');

        if (player) {
            if (this.cooldown > 0) this.cooldown = Math.max(this.cooldown - this.game.clockTick, 0);
            let xOrigC = (player.x + player.animation.frameWidth / 2);
            let yOrigC = (player.y + player.animation.frameHeight / 2);
            let xOrigS = this.boundingBox.origin.x;
            let yOrigS = this.boundingBox.origin.y;
            let xDiff = xOrigC - xOrigS;
            let yDiff = yOrigC - yOrigS;
            let distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);

            if (distance > this.detectRange || !this.checkSight(player.boundingBox)) {
                return;
            }

            if (this.attackRange <= distance && distance <= this.followRange) {
                this.xMot = this.game.clockTick * (this.moveSpeed * xDiff) / distance;
                this.yMot = this.game.clockTick * (this.moveSpeed * yDiff) / distance;
            }

            this.updatePosition(this.boundingBox);

            if (distance <= this.attackRange) {
                this.attack(xDiff, yDiff, distance, xOrigS, yOrigS);
            } else {
                if (this.direction == 'left') {
                    this.animation = this.animWalkLeft;
                } else {
                    this.animation = this.animWalkRight;
                }
            }
        }
    }

    attack() {
        if (this.cooldown == 0) {
            let player = this.game.level.getEntityWithTag('Player');

            if (this.direction == 'left') {
                this.animation = this.animAttackLeft;
            } else {
                this.animation = this.animAttackRight;
            }

            player.damage(this.attackDamage);

            this.cooldown = this.attackInterval;
        }
    }

    updatePosition(collider = this.boundingBox) {
        super.updatePosition(collider);

        if (this.xMot < 0) this.direction = 'left';
        else if (this.xMot > 0) this.direction = 'right';
    }

    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);

        super.draw(ctx);
    }
}

export default SlimeBehemoth;