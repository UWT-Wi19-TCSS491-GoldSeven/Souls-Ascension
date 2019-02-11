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
    this.sounds = new Map();
    this.showOutlines = false;
    this.ctx = ctx;
    this.click = null;
    this.mouse = null;
    this.wheel = null;
	this.one = null;
    this.surfaceWidth = width;
    this.surfaceHeight = height;
    this.viewport = {x: 0, y: 0, sx: 1, sy: 1 };
    this.debug = false; // If true, console output and entity boxes will appear.
    this.screenSize = {width: width, height: height};
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

    var getXandY = function(e) {
        var x = e.clientX - that.ctx.canvas.getBoundingClientRect().left;
        var y = e.clientY - that.ctx.canvas.getBoundingClientRect().top;

        if (x < 1024) {
            x = Math.floor(x / 32);
            y = Math.floor(y / 32);
        }
        return { x: x, y: y };
    }

    this.ctx.canvas.addEventListener("keydown", function(e) {
        switch(e.keyCode) {
            case 49: // 1
                that.one = true;
                that.sounds.get('characterAttack02').replay();
                break;
			case 32: // ' '
                that.space = true;
                break;
            case 37: // arrow left
            case 65: // a
                that.left = true;
                that.lefting = e.repeat;
                break;
            case 39: // arrow right
            case 68: // d
                that.right = true;
                that.righting = e.repeat;
                break;
            case 38: // arrow up
            case 87: // w
                that.up = true;
                that.upping = e.repeat;
                break;
            case 40: // arrow down
            case 83: // s
                that.down = true;
                that.downing = e.repeat;
                break;
            default:
                //console.error("Key Down Event - Char: " + e.code + " Code: " + e.keyCode + " Reapeat: " + e.repeat);
                break;
        }
        //if (String.fromCharCode(e.which) === ' ') that.space = true;
    }, false);

    this.ctx.canvas.addEventListener("keyup", function(e) {
        switch (e.keyCode) {
            case 49: // 1
                that.one = false;
                break;
			case 32: // ' '
                that.space = false;
                break;
            case 37: // arrow left
            case 65: // a
                that.left = that.lefting = false;
                break;
            case 39: // arrow right
            case 68: // d
                that.right = that.righting = false;
                break;
            case 38: // arrow up
            case 87: // w
                that.up = that.upping = false;
                break;
            case 40: // arrow down
            case 83: // s
                that.down = that.downing = false;
                break;
            default:
                //console.error("Key Down Event - Char: " + e.code + " Code: " + e.keyCode + " Reapeat: " + e.repeat);
                break;
        }
    }, false);

    this.ctx.canvas.addEventListener("click", function(e) {
        that.click = getXandY(e);
        that.sounds.get('characterAttack01').replay();
        if (that.debug) console.log("Clicked at " + e.clientX + "," + e.clientY); // The coordinates on the browser screen.
    }, false);
    console.log('Input started');
}

GameEngine.prototype.addEntity = function (entity) {
    console.log('added entity');
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

function Entity(game, x, y, genAABB = true) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.removeFromWorld = false;
    if (genAABB) this.boundingBox = new BoundingBox(this.x, this.y, 99, 99); // 99 is default width and height.
}

// The imaginary box around the entity.
function BoundingBox(theX, theY, width, height, xOffset, yOffset) {
    this._xOffset = xOffset || 0;
    this._yOffset = yOffset || 0;
    this._x;
    this._y;
    this._width = width;
    this._height = height;
    this.left = theX;
    this.top = theY;
    this.right = this.left + width;
    this.bottom = this.top + height;
    this._origin = {x: this.left + this.width/2, y: this.top + this.height/2};
}

BoundingBox.prototype = {
    set x(value) {
        this._x = value + this._xOffset;
        this._origin.x = this._x - (this.width/2);
    },
    get x() { return this._x },
    set y(value) {
        this._y = value + this._yOffset;
        this._origin.y = this._y - (this.height/2);
    },
    get y() { return this._y },
    get origin() { return this._origin },
    set offsetX(value) { this._xOffset = value },
    set offsetY(value) { this._yOffset = value },
    set width(value) { this._width = value },
    get width() { return this._width },
    set height(value) { this._height = value },
    get height() { return this._height },
}

// Not yet used.
BoundingBox.prototype.collide = function (oth) {
    if (    this.right > oth.left 
        &&   this.left < oth.right 
        &&    this.top < oth.bottom 
        && this.bottom > oth.top) 
        return true;
    return false;
}

BoundingBox.prototype.setPos = function (x, y) {
    this.left = x;
    this.top = y;
    this.right = this.left + this.width;
    this.bottom = this.top + this.height
    this.origin.x = this.left + this.width / 2;
    this.origin.y = this.top + this.height / 2;
}


// Do not delete this, else all entities will not draw!
Entity.prototype.update = function () {

}

Entity.prototype.draw = function (ctx) {
    if (this.game.showOutlines && this.radius) {
        this.game.ctx.beginPath();
        this.game.ctx.strokeStyle = "green";
        this.game.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.game.ctx.stroke();
        this.game.ctx.closePath();
    }
}

Entity.prototype.rotateAndCache = function (image, angle) {
    var offscreenCanvas = document.createElement('canvas');
    var size = Math.max(image.width, image.height);
    offscreenCanvas.width = size;
    offscreenCanvas.height = size;
    var offscreenCtx = offscreenCanvas.getContext('2d');
    offscreenCtx.save();
    offscreenCtx.translate(size / 2, size / 2);
    offscreenCtx.rotate(angle);
    offscreenCtx.translate(0, 0);
    offscreenCtx.drawImage(image, -(image.width / 2), -(image.height / 2));
    offscreenCtx.restore();
    //offscreenCtx.strokeStyle = "red";
    //offscreenCtx.strokeRect(0,0,size,size);
    return offscreenCanvas;
}
