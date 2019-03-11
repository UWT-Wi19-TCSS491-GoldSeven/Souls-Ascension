import HostileEntity from '../HostileEnemy.js';
import Animation from '../Animation.js';
import BoundingBox from '../BoundingBox.js';

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
        let player = this.game.levelManager.level.getEntityWithTag('Player');

        if (this.cooldown > 0) this.cooldown -= this.game.clockTick;
        if (this.special > 0) this.cooldown -= this.game.clockTick;
        let canMove = false;
        let xOrigC = (player.x + player.animation.frameWidth / 2);
        let yOrigC = (player.y + player.animation.frameHeight / 2);
        let xOrigS = (this.x + this.animation.frameWidth / 2)
        let yOrigS = (this.y + this.animation.frameHeight / 2)
        let xDiff = xOrigC - xOrigS;
        let yDiff = yOrigC - yOrigS;
        let distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
        let origX = this.x;
        let origY = this.y;

        if (!this.alive) {
            if (this.death && this.animation == this.death) {
                this.life -= this.game.clockTick;
                if (this.life <= 0) this.destroyed = true;
            } else {
                this.destroyed = true;
            }

            return;
        }

        super.update();

        if (distance > this.detectRange || !this.checkSight(player.boundingBox)) {
            return;
        }

        if (distance < this.fleeRange) {
            let velX = (this.fleeSpeed * xDiff) / distance;
            let velY = (this.fleeSpeed * yDiff) / distance;

            this.x -= this.game.clockTick * velX;
            this.y -= this.game.clockTick * velY;

            if (distance < this.dangerRange) this.specialAttack(xDiff, yDiff, distance, xOrigS, yOrigS);
        } else if (this.startAttackRange <= distance && distance <= this.stopAttackRange) {
            this.attack(xDiff, yDiff, distance, xOrigS, yOrigS);
        }

        if (this.startFollowRange <= distance && distance <= this.stopFollowRange) {
            let velX = (this.moveSpeed * xDiff) / distance;
            let velY = (this.moveSpeed * yDiff) / distance;

            this.x += this.game.clockTick * velX;
            this.y += this.game.clockTick * velY;

        }

        if (!this.game.levelManager.level.hasCollidedWithWalls(this)) {
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
        this.game.levelManager.addEntity(projectile);
        this.cooldown = this.attackInterval;
    }

    specialAttack(xDiff, yDiff, distance, xOrigS, yOrigS) {
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
            } else if (this.health == 0 && !this.hasDied) {
                this.animation = this.death;
                this.hasDied = true;
            } else {
                this.animation = this.slimeEnemyIdleAnimation;
            }
        }

        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);

        super.draw(ctx);
    }
}

export default Slime;