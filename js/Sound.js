/**
 * An object to control sound effects.
 * @param {*} sourceFileName
 */
class Sound {
    constructor(sourceFileName, repeat) {
        this._source = sourceFileName;
        this._audio = (this._source) ? new Audio(this._source) : null;
        if (this._audio && repeat) {
            this._audio.loop = repeat;
        }
    }

    /** Integer whole number where 50 < speedPercent < 200 to represent the speed of the sound played.
     *  Speed can be dynamically changed during playback.
     *  WARNING: Values other than 100 may cause a choppy sound.
     *  https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/playbackRate
     */
    set playbackSpeed(speedPercent) {
        this._audio.playbackRate = (speedPercent) ? 1.0 * (speedPercent / 100.0) : 1.0
    }

    get playbackSpeed() {
        return this._audio.playbackRate
    }

    play() {
        if (this._source && this._audio) {
            this._audio.play();
        } else {
            console.error('Cannot play audio object.');
        }
    }

    /**
     * Allows for many repeats of this sound to overlap and play simultaneously. i.e. when pressing a key quickly several times during an attack.
     */
    replay() {
        if (this._source && this._audio) {
            let temp = this._audio;
            this._audio = new Audio(this._source);
            this._audio.muted = temp.muted;
            this._audio.play();
        } else {
            console.error('Cannot play audio object.');
        }
    }

    pause() {
        if (this._source && this._audio) {
            this._audio.pause();
        } else {
            console.error('Cannot pause audio object.');
        }
    }
}

export default Sound;