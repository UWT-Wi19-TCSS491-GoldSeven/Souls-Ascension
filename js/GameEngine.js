// This game shell was happily copied from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

import AssetManager from './AssetManager.js';
import LevelManager from './LevelManager.js';
import Events from './Events.js';
import Camera from './Camera.js';

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
        this.sounds = new Map();
        this.camera = new Camera(this);
        this.settings = {
            audio: {
                muted: false
            },
            debug: {
                enabled: false,
                verbosity: 0
            }
        }
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

    get level() {
        return this.levelManager.level;
    }

    get entities() {
        return this.level ? this.level.entities : [];
    }

    get debug() {
        return this.settings.debug;
    }

    toggleDebug() {
        let debug = this.debug;
        if (!debug.enabled) {
            this.debug.enabled = true;
            this.debug.verbosity = 0;
        } else {
            if (this.debug.verbosity < 4) {
                this.debug.verbosity += 1;
            } else {
                this.debug.enabled = false;
            }
        }
    }
}

export default GameEngine;