// This game shell was happily copied from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

import AssetManager from './AssetManager.js';
import LevelManager from "./LevelManager.js";
import Events from "./Events.js";

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
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.assetManager = new AssetManager();
        this.levelManager = new LevelManager(this);
        this.sounds = new Map(); // The key name can be different than the audio file name.
        this.showOutlines = false;
        this.click = null;
        this.mouse = null;
        this.wheel = null;
        this.attack = null;
        this.surfaceWidth = canvas.width;
        this.surfaceHeight = canvas.height;
        this.viewport = {
            x: 0,
            y: 0,
            sx: 1,
            sy: 1
        };
        this.screenSize = {
            width: canvas.width,
            height: canvas.height
        };
        this.settings = {
            audio: {
                muted: false
            }
        }
        this.debug = false; // If true, console output and entity boxes will appear.
    }

    init() {
        Events.startInput(this);
        this.timer = new Timer();
        this.ctx.imageSmoothingEnabled = false;
    }

    start() {
        let that = this;
        (function gameLoop() {
            that.loop();
            requestAnimFrame(gameLoop, that.ctx.canvas);
        })();
    }

    loop() {
        this.clockTick = this.timer.tick();

        this.levelManager.update();
        this.levelManager.draw(this.ctx);
    }

    isInViewPort(x, y, mx, my) {
        let viewport = this.viewport;
        let screenSize = this.screenSize;

        if (viewport.x < mx
            && viewport.x + screenSize.width > x
            && viewport.y < my
            && viewport.y + screenSize.height > y) {
            return true;
        }

        return false;
    }

    get level() {
        return this.levelManager.level;
    }

    get entities() {
        return this.level ? this.level.entities : [];
    }
}

export default GameEngine;