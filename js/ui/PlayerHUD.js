import Entity from '../Entity.js';

class PlayerHUD extends Entity {
    constructor(game, image, hpImage) {
        super(game, 0, 0);
        this.x = 0;
        this.y = 0;
        this.w = 512;
        this.h = 512;
        this.image = image;
        this.hpImange = hpImage;
        this.whirlSkill = game.assetManager.getAsset('./assets/sprites/whirl.png');
    }

    draw(ctx) {
        let player = this.game.level.getEntityWithTag('Player');

        let x = player.x - 380;
        let y = player.y - 380;

        ctx.drawImage(this.image, x, y, 100, 100);
        ctx.drawImage(this.hpImange, x, y + 200, 40, 40);
        ctx.fillStyle = '#0F0';
        ctx.fillText('Level ' + player.level + ' / Soul level ' + player.soul, x + 100, y + 40);
        ctx.fillStyle = 'white';
        ctx.fillText('HP ' + player.health + '/' + player.maxHealth, x + 101, y + 59);
        ctx.fillText('H', x + 30, y + 235);
        ctx.fillText(player.inventory.HealingPotion, x + 5, y + 210);
        ctx.fillStyle = 'white';
        ctx.fillText('EXP ' + player.currentExp + '/' + player.levelExp, x + 100, y + 75);
        ctx.fillStyle = 'white';
        ctx.fillText('Soul ' + player.currentSoul + '/' + player.levelSoul, x + 100, y + 90);

        if (player.currentSoul > player.levelSoul) {
            player.currentSoul = player.currentSoul - player.levelSoul;
            player.soul++;
            player.levelSoul *= player.soul;
        }

        if (player.currentExp > player.levelExp) {
            player.currentExp = player.currentExp - player.levelExp;
            player.level++;
            player.maxHealth += player.maxHealth * player.level / 10;
            player.levelExp *= player.level;
            player.health = player.maxHealth;
        }

        this.skillShow(ctx);

    }

    skillShow(ctx) {
        let player = this.game.level.getEntityWithTag("Player");

        let newX = player.x + 350;
        let newY = player.y + 340;
        this.drawSkillImage(ctx, newX - 10, newY, 25, this.whirlSkill, 24, 50); //skill 2
        this.updateSkillCover(ctx, newX, newY);

    }

    drawSkillImage(ctx, x, y, radius, skillImage, ratio, size) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2, true) //x, y, radius, startAngle, endAngle, anticlockwise
        ctx.clip();
        ctx.drawImage(skillImage, x - ratio, y - ratio, size, size);

        this.updateSkillCover(ctx, x + 10, y)
        ctx.restore();
    }

    updateSkillCover(ctx, newX, newY) { //depend on the skill then set the percent
        let player = this.game.level.getEntityWithTag("Player");

        let full = -Math.PI / 2;
        let percent = this.getPercent(player.whirlwindCooldown, player.whirlwindCooldownTime);

        ctx.fillStyle = 'black';

        this.drawSkillCover(ctx, newX - 10, newY, 25, 0.85, full - percent, full + percent); //skill 2
    }

    drawSkillCover(ctx, x, y, radius, globalAlpha, startAngle, endAngle) {
        ctx.globalAlpha = globalAlpha;
        ctx.beginPath();
        ctx.arc(x, y, radius, startAngle, endAngle, false) //x, y, radius, startAngle, endAngle, anticlockwise
        ctx.fill();
    }

    getPercent(coolDown, coolDownTime) { // 0 is full, 3 is empty
        return 3 * coolDown / coolDownTime;
    }
}

export default PlayerHUD;