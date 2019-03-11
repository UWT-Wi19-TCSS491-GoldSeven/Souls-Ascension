import Entity from '../Entity.js';

class TextIndicator extends Entity {
    constructor(game) {
        super(game, 0, 0, false);
        this.damaged = 0;
        this.exp = 0;
        this.time = new Date().getTime();
    }

    draw(ctx) {
        if (this.damaged !== 0) {
            ctx.fillStyle = 'red';
            ctx.font = '30px Arial';
            ctx.fillText(' - ' + this.damaged, this.x, this.y);
        }

        if (this.exp !== 0) {
            ctx.fillStyle = 'blue';
            ctx.font = '30px Arial';
            ctx.fillText(' + ' + this.exp + 'Exp', this.x + 10, this.y + 10);
        }
    }
}

export default TextIndicator;