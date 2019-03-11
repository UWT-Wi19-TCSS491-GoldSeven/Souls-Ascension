import Entity from '../Entity.js';

class PlayerHUD extends Entity {
    constructor(game, player, image, hpImage) {
        super(game, 0, 0);
        this.player = player;
        this.x = 0;
        this.y = 0;
        this.w = 512;
        this.h = 512;
        this.image = image;
        this.hpImange = hpImage;
        this.whirlSkill = game.assetManager.getAsset('./assets/sprites/whirl.png');
        this.oneAttackSKill = game.assetManager.getAsset('./assets/sprites/oneAttack.png');
    }

    draw() {
        let ctx = this.game.ctx;

        let x = this.player.x - 380;
        let y = this.player.y - 380;

        ctx.drawImage(this.image, x, y, 100, 100);
        ctx.drawImage(this.hpImange, x, y + 200, 40, 40);
        ctx.fillStyle = '#0F0';
        ctx.fillText('Level ' + this.player.level + ' / Soul level ' + this.player.soul, x + 100, y + 40);
        ctx.fillStyle = 'white';
        ctx.fillText('HP ' + this.player.health + '/' + this.player.maxHealth, x + 101, y + 59);
        ctx.fillText('H', x + 30, y + 235);
        ctx.fillText(this.player.inventory.HealingPotion, x + 5, y + 210);
        ctx.fillStyle = 'white';
        ctx.fillText('EXP ' + this.player.currentExp + '/' + this.player.levelExp, x + 100, y + 75);
        ctx.fillStyle = 'white';
        ctx.fillText('Soul ' + this.player.currentSoul + '/' + this.player.levelSoul, x + 100, y + 90);

        if (this.player.currentSoul > this.player.levelSoul) {
            this.player.currentSoul = this.player.currentSoul - this.player.levelSoul;
            this.player.soul++;
            this.player.levelSoul *= this.player.soul;
        }

        if (this.player.currentExp > this.player.levelExp) {
            this.player.currentExp = this.player.currentExp - this.player.levelExp;
            this.player.level++;
            this.player.maxHealth += this.player.maxHealth * this.player.level / 10;
            this.player.levelExp *= this.player.level;
            this.player.health = this.player.maxHealth;
        }

        this.skillShow(ctx);

    }

    skillShow(ctx) {
        let newX = this.player.x + 350;
        let newY = this.player.y + 340;
        this.drawSkillImage(ctx, newX + 40, newY - 20, 25, this.oneAttackSKill, 24, 50); // skill 1
        this.drawSkillImage(ctx, newX - 10, newY, 25, this.whirlSkill, 24, 50); //skill 2
        this.drawSkillImage(ctx, newX - 25, newY + 50, 25, this.whirlSkill, 24, 50); // skill 3
        this.drawSkillImage(ctx, newX + 35, newY + 40, 35, this.whirlSkill, 34, 70);//x, y, radius, startAngle, endAngle, anticlockwise
        this.updateSkillCover(ctx, newX, newY);

    }

    drawSkillImage(ctx, x, y, radius, skillImage, ratio, size) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2, true) //x, y, radius, startAngle, endAngle, anticlockwise
        ctx.clip();
        ctx.drawImage(skillImage, x - ratio, y - ratio, size, size);
        ctx.restore();
    }

    drawSkillCover(ctx, x, y, radius, globalAlpha, startAngle, endAngle) {
        ctx.globalAlpha = globalAlpha;
        ctx.beginPath();
        ctx.arc(x, y, radius, startAngle, endAngle, false) //x, y, radius, startAngle, endAngle, anticlockwise
        ctx.fill();
    }

    updateSkillCover(ctx, newX, newY) { //depend on the skill then set the percent
        let percent = 0;
        let full = -Math.PI / 2;
        ctx.fillStyle = 'black';
        percent = this.getPercent(this.player.attackCooldown, this.player.attackCooldownTime);
        this.drawSkillCover(ctx, newX + 40, newY - 20, 25, 0.85, full - percent, full + percent); // skill 1
        percent = this.getPercent(ctx, this.player.whirlwindCooldown, this.player.whirlwindCooldownTime);
        this.drawSkillCover(ctx, newX - 10, newY, 25, 0.85, full - percent, full + percent); //skill 2
        percent = 3;//no skill yet
        this.drawSkillCover(ctx, newX - 25, newY + 50, 25, 0.85, full - percent, full + percent); // skill 3
        this.drawSkillCover(ctx, newX + 35, newY + 40, 35, 0.85, full - percent, full + percent);//center
    }

    getPercent(coolDown, coolDownTime) { // 0 is full, 3 is empty
        return 3 * coolDown / coolDownTime;
    }
}

export default PlayerHUD;