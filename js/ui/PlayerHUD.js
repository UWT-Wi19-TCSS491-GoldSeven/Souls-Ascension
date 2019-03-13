class PlayerHUD {
    constructor(game, player) {
        this.game = game;
        this.player = player;
        this.x = 0;
        this.y = 0;
        this.w = 512;
        this.h = 512;
        this.image = game.assetManager.getAsset('ui.avatar');
        this.hpImange = game.assetManager.getAsset('ui.hp');
        this.whirlSkill = game.assetManager.getAsset('ui.whirlwind');
    }

    draw(ctx) {
        let player = this.player;
        let canvas = this.game.canvas;

        this.drawStats(ctx);

        let padding = 25;
        let pW = 100, pH = 100;
        let iW = 40, iH = 40, iX = padding, iY = canvas.height - iH - padding

        ctx.drawImage(this.image, 0, 0, pW, pH);
        ctx.drawImage(this.hpImange, iX, iY, iW, iH);
        ctx.font = '20px bold Arial';
        ctx.fillStyle = 'white';
        ctx.fillText('H', iX + 30, iY + 30);
        ctx.font = '20px bold Arial';
        ctx.textBaseline = 'middle';
        ctx.fillText(`x${player.inventory.HealingPotion}`, iX + 50, iY + 20);

        if (player.currentSoul >= player.levelSoul) {
            player.currentSoul = player.currentSoul - player.levelSoul;
            player.soul++;
            player.levelSoul *= player.soul;
        }

        if (player.currentExp >= player.levelExp) {
            player.currentExp = player.currentExp - player.levelExp;
            player.level++;
            player.maxHealth += player.maxHealth * player.level / 10;
            player.levelExp *= player.level;
            player.health = player.maxHealth;
        }

        this.skillShow(ctx);

    }

    drawStats(ctx) {
        let player = this.player

        let alX = 110;
        let lvY = 25, hpY = 45, expY = 60, soulY = 75;
        let mW = 100, iH = 8, oH = 10;
        let perH = Math.max(Math.min(mW * player.health / player.maxHealth, mW), 0);
        let perE = Math.max(Math.min(mW * player.currentExp / player.levelExp, mW), 0);
        let perS = Math.max(Math.min(mW * player.currentSoul / player.levelSoul, mW), 0);

        ctx.textBaseline = 'top';
        ctx.fillStyle = '#0F0';
        ctx.fillText('Level ' + player.level + ' / Soul level ' + player.soul, alX, lvY);

        // HP Bar

        ctx.strokeStyle = '#b00642';
        ctx.strokeRect(alX, hpY - 1, mW, oH);
        ctx.fillStyle = '#9a065f';
        ctx.fillRect(alX, hpY, perH, iH);
        ctx.fillStyle = 'white';
        ctx.fillText('HP ' + player.health + '/' + player.maxHealth, alX, hpY);

        // EXP Bar

        ctx.strokeStyle = '#0FF';
        ctx.strokeRect(alX, expY - 1, mW, oH);
        ctx.fillStyle = 'blue';
        ctx.fillRect(alX, expY, perE, iH);
        ctx.fillStyle = 'white';
        ctx.fillText('EXP ' + player.currentExp + '/' + player.levelExp, alX, expY);

        // Soul Bar

        ctx.strokeStyle = '#0CF';
        ctx.strokeRect(alX, soulY - 1, mW, oH);
        ctx.fillStyle = 'blue';
        ctx.fillRect(alX, soulY, perS, iH);
        ctx.fillStyle = 'white';
        ctx.fillText('Soul ' + player.currentSoul + '/' + player.levelSoul, alX, soulY);
    }

    skillShow(ctx) {
        let canvas = this.game.canvas;

        let xOff = -50, yOff = -50;
        let radius = 25, ratio = 24, size = 50;
        let alpha = 0.85;

        this.drawSkillImage(ctx, canvas.width + xOff, canvas.height + yOff, radius, this.whirlSkill, ratio, size, alpha);

    }

    drawSkillImage(ctx, x, y, radius, skillImage, ratio, size, alpha) {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2, true)
        ctx.clip();
        ctx.drawImage(skillImage, x - ratio, y - ratio, size, size);

        this.updateSkillCover(ctx, x, y, radius, alpha);
    }

    updateSkillCover(ctx, x, y, radius, alpha = 1, color = 'black') {
        let player = this.player;

        let full = -Math.PI / 2;
        let percent = this.getPercent(player.whirlwindCooldown, player.whirlwindCooldownTime);

        ctx.fillStyle = color;

        this.drawSkillCover(ctx, x, y, radius, alpha, full - percent, full + percent);
    }

    drawSkillCover(ctx, x, y, radius, alpha, startAngle, endAngle) {
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(x, y, radius, startAngle, endAngle, false)
        ctx.fill();
    }

    getPercent(coolDown, coolDownTime) { // 0 is full, 3 is empty
        return 3 * coolDown / coolDownTime;
    }
}

export default PlayerHUD;