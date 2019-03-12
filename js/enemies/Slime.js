import HostileEntity from '../HostileEnemy.js';
import Animation from '../Animation.js';
import BoundingBox from '../BoundingBox.js';
import Projectile from './Projectile.js';

class Slime extends HostileEntity {
    constructor(game, x, y) {
        super(game, x, y);
        this.animIdle = new Animation(this.game.assetManager.getAsset('slime.idle'), 0, 0, 80, 80, 0.1, 8, true, false);
        this.animWalkLeft = new Animation(this.game.assetManager.getAsset('slime.walk.left'), 0, 0, 80, 80, 0.1, 8, true, false);
        this.animWalkRight = new Animation(this.game.assetManager.getAsset('slime.walk.right'), 0, 0, 80, 80, 0.1, 8, true, false);
        this.animAttackLeft = new Animation(this.game.assetManager.getAsset('slime.attack.left'), 0, 0, 80, 80, 0.1, 10, true, false);
        this.animAttackRight = new Animation(this.game.assetManager.getAsset('slime.attack.right'), 0, 0, 80, 80, 0.1, 10, true, false);
        this.animDeath = new Animation(this.game.assetManager.getAsset('slime.animDeath'), 0, 0, 80, 80, 0.1, 8, false, false);
        this.animation = this.animIdle;
        this.boundingBox = new BoundingBox(x, y, 35, 20, 13, 18);
        this.isMovingWest = false;
        this.isMovingEast = false;
        this.moveSpeed = 40;
        this.cooldown = 1;
        this.attackDamage = 15;
        this.attackInterval = 2;
        this.startAttackRange = 20;
        this.stopAttackRange = 250;
        this.startFollowRange = 100;
        this.stopFollowRange = 200;
        this.detectRange = 250;
        this.maxHealth = 40;
        this.health = 40;
    }

    update() {
        super.update();

        if (!this.alive) {
            if (this.animDeath && this.animation == this.animDeath) {
                if (this.animDeath.isDone()) this.destroyed = true;
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

            if (this.startAttackRange <= distance && distance <= this.stopAttackRange) {
                this.attack(xDiff, yDiff, distance, xOrigS, yOrigS);
            }

            if (this.startFollowRange <= distance && distance <= this.stopFollowRange) {
                this.xMot = this.game.clockTick * (this.moveSpeed * xDiff) / distance;
                this.yMot = this.game.clockTick * (this.moveSpeed * yDiff) / distance;
            }
        }

        this.updatePosition(this.boundingBox);
    }

    attack(xDiff, yDiff, distance, xOrigS, yOrigS) {
        if (this.cooldown == 0) {
            let velX = (this.attackSpeed * xDiff) / distance;
            let velY = (this.attackSpeed * yDiff) / distance;

            let projectile = new Projectile(this.game,
                this,
                xOrigS,
                yOrigS,
                velX,
                velY,
                this.attackDamage);
            this.game.level.addEntity(projectile);
            this.cooldown = this.attackInterval;
        }
    }

    draw(ctx) {
        if (this.animation !== this.animDeath) {
            if (this.isMovingWest) {
                this.animation = this.animWalkLeft;
            } else if (this.isMovingEast) {
                this.animation = this.animWalkRight;
            } else if (this.isAttackingLeft) {
                this.animation = this.animAttackLeft;
            } else if (this.isAttackingRight) {
                this.animation = this.animAttackRight;
            } else if (this.health == 0 && !this.destroyed) {
                this.animation = this.animDeath;
            } else {
                this.animation = this.animIdle;
            }
        }

        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);

        super.draw(ctx);
    }
}

export default Slime;