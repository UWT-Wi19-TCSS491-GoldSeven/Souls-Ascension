import HostileEntity from '../HostileEnemy.js';
import Animation from '../Animation.js';
import BoundingBox from '../BoundingBox.js';
import Projectile from './Projectile.js';

class Slime extends HostileEntity {
    constructor(game, x, y) {
        super(game, x, y);
        this.slimeEnemyWalkingLeftAnimation = new Animation(this.game.assetManager.getAsset('./assets/sprites/SlimeWalkLeft.png'), 0, 0, 80, 80, 0.1, 8, true, false);
        this.slimeEnemyWalkingRightAnimation = new Animation(this.game.assetManager.getAsset('./assets/sprites/SlimeWalkRight.png'), 0, 0, 80, 80, 0.1, 8, true, false);
        this.slimeEnemyAttackLeftAnimation = new Animation(this.game.assetManager.getAsset('./assets/sprites/SlimeAttackLeft.png'), 0, 0, 80, 80, 0.1, 10, true, false);
        this.slimeEnemyAttackRightAnimation = new Animation(this.game.assetManager.getAsset('./assets/sprites/SlimeAttackRight.png'), 0, 0, 80, 80, 0.1, 10, true, false);
        this.slimeEnemyIdleAnimation = new Animation(this.game.assetManager.getAsset('./assets/sprites/SlimeIdle.png'), 0, 0, 80, 80, 0.1, 8, true, false);
        this.death = new Animation(this.game.assetManager.getAsset('./assets/sprites/SlimeDeath.png'), 0, 0, 80, 80, 0.1, 8, false, false);
        this.animation = this.slimeEnemyIdleAnimation;
        this.boundingBox = new BoundingBox(x, y, 35, 20, 13, 18);
        this.isMovingWest = false;
        this.isMovingEast = false;
        this.moveSpeed = 40;
        this.cooldown = 1;
        this.attackSpeed = 4;
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

        let player = this.game.level.getEntityWithTag('Player');

        if (this.cooldown > 0) this.cooldown = Math.max(this.cooldown - this.game.clockTick, 0);
        let xOrigC = (player.x + player.animation.frameWidth / 2);
        let yOrigC = (player.y + player.animation.frameHeight / 2);
        let xOrigS = this.boundingBox.origin.x;
        let yOrigS = this.boundingBox.origin.y;
        let xDiff = xOrigC - xOrigS;
        let yDiff = yOrigC - yOrigS;
        let distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);

        if (!this.alive) {
            if (this.death && this.animation == this.death) {
                if (this.death.isDone()) this.destroyed = true;
            } else {
                this.destroyed = true;
            }

            return;
        }

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
                15);
            this.game.level.addEntity(projectile);
            this.cooldown = this.attackInterval;
        }
    }

    draw(ctx) {
        if (this.animation !== this.death) {
            if (this.isMovingWest) {
                this.animation = this.slimeEnemyWalkingLeftAnimation;
            } else if (this.isMovingEast) {
                this.animation = this.slimeEnemyWalkingRightAnimation;
            } else if (this.isAttackingLeft) {
                this.animation = this.slimeEnemyAttackLeftAnimation;
            } else if (this.isAttackingRight) {
                this.animation = this.slimeEnemyAttackRightAnimation;
            } else if (this.health == 0 && !this.destroyed) {
                this.animation = this.death;
            } else {
                this.animation = this.slimeEnemyIdleAnimation;
            }
        }

        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);

        super.draw(ctx);
    }
}

export default Slime;