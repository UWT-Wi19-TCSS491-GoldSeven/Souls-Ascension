import HostileEntity from '../HostileEnemy.js';
import BoundingBox from '../BoundingBox.js';
import Animation from '../Animation.js';
import Projectile from './Projectile.js';

class Sorcerer extends HostileEntity {
    constructor(game, x, y) {
        super(game, x, y);
        this.boundingBox = new BoundingBox(x, y, 20, 60, 18, 15);
        this.animAttack = new Animation(this.game.assetManager.getAsset('sorcerer.attack'), 0, 0, 100, 100, 0.1, 10, true, false);
        this.animDeath = null;
        this.animation = this.animAttack;
        this.moveSpeed = 1;
        this.fleeSpeed = 90;
        this.attackSpeed = 3;
        this.attackDamage = 40;
        this.attackInterval = 0.6;
        this.cooldown = 0;
        this.fleeRange = 100;
        this.startAttackRange = 60;
        this.stopAttackRange = 300;
        this.startFollowRange = 150;
        this.stopFollowRange = 350;
        this.detectRange = 400;
        this.maxHealth = 200;
        this.health = 200;
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

        let player = this.game.levelManager.level.getEntityWithTag('Player');

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

            if (distance < this.fleeRange) {
                this.xMot = -this.game.clockTick * (this.fleeSpeed * xDiff) / distance;
                this.yMot = -this.game.clockTick * (this.fleeSpeed * yDiff) / distance;
            }

            if (this.startAttackRange <= distance && distance <= this.stopAttackRange) {
                this.attack(xDiff, yDiff, distance, xOrigS, yOrigS);
            }

            if (this.startFollowRange <= distance && distance <= this.stopFollowRange) {
                this.xMot = (this.moveSpeed * xDiff) / distance;
                this.yMot = (this.moveSpeed * yDiff) / distance;
            }
        }

        this.updatePosition(this.boundingBox);
    }

    attack(xDiff, yDiff, distance, xOrigS, yOrigS) {
        if (this.cooldown == 0) {
            let velX = (this.attackSpeed * xDiff) / distance;
            let velY = (this.attackSpeed * yDiff) / distance;

            let projectile = new Projectile(
                this.game,
                this,
                xOrigS,
                yOrigS,
                velX,
                velY,
                this.attackDamage);
            this.game.levelManager.level.addEntity(projectile);
            this.cooldown = this.attackInterval;
        }
    }

    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);

        super.draw(ctx);
    }
}

export default Sorcerer;