// This game shell was happily copied from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (/* function */ callback, /* DOMElement */ element) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

class Timer {
    constructor() {
        this.gameTime = 0;
        this.maxStep = 0.05;
        this.wallLastTimestamp = 0;
    }

    tick() {
        let wallCurrent = Date.now();
        let wallDelta = (wallCurrent - this.wallLastTimestamp) / 1000;
        this.wallLastTimestamp = wallCurrent;

        let gameDelta = Math.min(wallDelta, this.maxStep);
        this.gameTime += gameDelta;
        return gameDelta;
    }
}

class GameEngine {
    constructor(ctx, width, height) {
        this.entities = [];
        this.sounds = new Map(); // The key name can be different than the audio file name.
        this.showOutlines = false;
        this.ctx = ctx;
        this.click = null;
        this.mouse = null;
        this.wheel = null;
        this.attack = null;
        this.surfaceWidth = width;
        this.surfaceHeight = height;
        this.viewport = {x: 0, y: 0, sx: 1, sy: 1};
        this.debug = false; // If true, console output and entity boxes will appear.
        this.screenSize = {width: width, height: height};
        this.settings = {
            audio: {
                muted: false
            }
        }
    }

    init() {
        this.startInput();
        this.timer = new Timer();
        console.log('game initialized');
    }

    start() {
        console.log("starting game");
        let that = this;
        (function gameLoop() {
            that.loop();
            requestAnimFrame(gameLoop, that.ctx.canvas);
        })();
    }

    startInput() {
        console.log('Starting input');
        let that = this;
        let events = new Events(this);
        console.log('Input started');
    }

    addEntity(entity) {
        //console.log('added entity');  // DEBUG
        entity.game = this;
        this.entities.push(entity);
    }

    draw() {
        let ctx = this.ctx;
        let viewport = this.viewport;
        let sx = viewport.sx;
        let sy = viewport.sy;
        let cw = ctx.canvas.width;
        let ch = ctx.canvas.height;
        // Calculate the x and y (top left) of a scaled window.
        let tx = viewport.x / sx;
        let ty = viewport.y / sy;

        ctx.clearRect(0, 0, cw, ch);
        ctx.save();
        ctx.resetTransform();
        // Scaling the context ahead of time can simulate zooming.
        ctx.scale(sx, sy);
        // We must translate the canvas to it's expected position.
        ctx.translate(-tx, -ty);
        for (let i = 0; i < this.entities.length; i++) {
            this.entities[i].draw(ctx);
        }

        if (this.debug) {
            // Calculates the width and height of a scaled window.
            let sw = cw / sx;
            let sh = ch / sy;
            // ctx.fillStyle = 'blue';
            // ctx.fillRect(tx, ty, sw / 2, sh / 2);
            ctx.strokeStyle = 'blue';
            ctx.beginPath();
            ctx.moveTo(tx, ty + sh / 2);
            ctx.lineTo(tx + sw, ty + sh / 2);
            ctx.moveTo(tx + sw / 2, ty);
            ctx.lineTo(tx + sw / 2, ty + sh);
            ctx.stroke();
        }
        this.ctx.restore();
    }

    update() {
        // Makes the viewport zoom in and out.
        // this.viewport.sx = this.viewport.sy = 1 + (Math.sin(performance.now() / 1000) + 1) / 2;
        let entitiesCount = this.entities.length;

        for (let i = 0; i < entitiesCount; i++) {
            let entity = this.entities[i];

            if (!entity.update)
                continue;

            if (!entity.destroyed) {
                entity.update();
            }
        }

        for (let i = this.entities.length - 1; i >= 0; --i) {
            if (this.entities[i].destroyed) {
                this.entities.splice(i, 1);
            }
        }
    }

    loop() {
        this.clockTick = this.timer.tick();
        this.update();
        this.draw();
        this.space = null;
        this.click = null;
        this.attack = null;
    }
}
