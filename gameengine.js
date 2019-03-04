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


function Timer() {
    this.gameTime = 0;
    this.maxStep = 0.05;
    this.wallLastTimestamp = 0;
}

Timer.prototype.tick = function () {
    var wallCurrent = Date.now();
    var wallDelta = (wallCurrent - this.wallLastTimestamp) / 1000;
    this.wallLastTimestamp = wallCurrent;

    var gameDelta = Math.min(wallDelta, this.maxStep);
    this.gameTime += gameDelta;
    return gameDelta;
}

function GameEngine(ctx, width, height) {
    this.entities = [];
    this.sounds = new Map(); // The key name can be different than the audio file name.
    this.showOutlines = false;
    this.ctx = ctx;
    this.click = null;
    this.mouse = null;
    this.wheel = null;
    this.one = null;
    this.surfaceWidth = width;
    this.surfaceHeight = height;
    this.viewport = { x: 0, y: 0, sx: 1, sy: 1 };
    this.debug = false; // If true, console output and entity boxes will appear.
    this.screenSize = { width: width, height: height };
    this.settings = {
        audio: {
            muted: false
        }
    }
}

GameEngine.prototype.init = function () {

    this.startInput();
    this.timer = new Timer();
    console.log('game initialized');
}

GameEngine.prototype.start = function () {
    console.log("starting game");
    var that = this;
    (function gameLoop() {
        that.loop();
        requestAnimFrame(gameLoop, that.ctx.canvas);
    })();
}

GameEngine.prototype.startInput = function () {
    console.log('Starting input');
    var that = this;
    var events = new Events(this);
    console.log('Input started');
}

GameEngine.prototype.addEntity = function (entity) {
    //console.log('added entity');  // DEBUG
    this.entities.push(entity);
}

GameEngine.prototype.draw = function () {
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
    for (var i = 0; i < this.entities.length; i++) {
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
        ctx.moveTo(tx, ty + sh / 2);;
        ctx.lineTo(tx + sw, ty + sh / 2);;
        ctx.moveTo(tx + sw / 2, ty);
        ctx.lineTo(tx + sw / 2, ty + sh);
        ctx.stroke();
    }
    this.ctx.restore();
}

GameEngine.prototype.update = function () {
    // Makes the viewport zoom in and out.
    // this.viewport.sx = this.viewport.sy = 1 + (Math.sin(performance.now() / 1000) + 1) / 2;
    var entitiesCount = this.entities.length;

    for (var i = 0; i < entitiesCount; i++) {
        var entity = this.entities[i];

        if (!entity.removeFromWorld) {
            entity.update();
        }
    }

    for (var i = this.entities.length - 1; i >= 0; --i) {
        if (this.entities[i].removeFromWorld) {
            this.entities.splice(i, 1);
        }
    }
}

GameEngine.prototype.loop = function () {
    this.clockTick = this.timer.tick();
    this.update();
    this.draw();
    this.space = null;
    this.click = null;
    this.one = null;
}
