class LevelManager {
    constructor(game) {
        this.game = game;
        this.level = null;
    }

    unload() {
        if (this.level != null) {
            this.level.tearDown();
            this.level = null;
        }
    }

    load(level) {
        this.unload();
        this.level = level;
        this.level.game = this.game;
        this.level.init();
        this.level.setup();
    }

    update() {
        if (this.level != null) this.level._update();
    }

    draw(ctx) {
        if (this.level != null) this.level._draw(ctx);
    }
}

export default LevelManager;