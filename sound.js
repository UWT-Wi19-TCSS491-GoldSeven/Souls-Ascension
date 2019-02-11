/*
 * Author: Sam Brendel
 */

/**
 * An object to control sound effects.
 * @param {*} sourceFileName 
 */
function Sound(sourceFileName, repeat) {
    this.source = (sourceFileName) ? "sounds\\" + sourceFileName : null;
    this.audio = (this.source) ? new Audio(this.source) : null;
    if (repeat) {
        this.repeat = repeat;
    }
}

Sound.prototype.play = function() {
    if(this.source) {
        this.audio.play();
    } else {
        console.log("Cannot play because of empty source.");
    }
}

/**
 * Allows for many repeats of this sound to overlap and play simultaneously. i.e. when pressing a key quickly several times during an attack.
 */
Sound.prototype.replay = function() {
    if(this.source) {
        this.audio = new Audio(this.source);
        this.audio.play();
    } else {
        console.log("Cannot play because of empty source.");
    }
}

Sound.prototype.pause = function() {
    if(this.source) {
        this.audio.pause();
    } else {
        console.log("Cannot pause because of empty source.");
    }
}

/** Integer whole number where 50 < speedPercent < 200 to represent the speed of the sound played.
 *  WARNING: Values other than 100 may cause a choppy sound.
 *  https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/playbackRate
 */ 
Sound.prototype.playbackSpeed = function (speedPercent)  {
    this.audio.playbackRate = (speedPercent) ? 1.0 * (speedPercent/100.0) : 1.0;
}
