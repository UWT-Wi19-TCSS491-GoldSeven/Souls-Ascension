/**
 * Put all key event listeners or button event listeners here.
 * Author: Sam Brendel
 */
function Events(engine) {
    window.addEventListener('keydown', function (e) {
        switch (e.key) {
            case '`':
                let muted = !engine.settings.audio.muted;
                for (let s of engine.sounds.values()) {
                    s._audio.muted = muted;
                }
                engine.settings.audio.muted = muted;
                break;
            case 'H':
            case 'h':
                engine.used = 'hp';
            default:
                break;
        }
    })

    engine.ctx.canvas.addEventListener("keydown", function (e) {
        switch (e.keyCode) {
            case 49: // 1
                engine.one = true;
                break;
            case 32: // ' '
                engine.space = true;
                break;
            case 37: // arrow left
            case 65: // a
                engine.left = true;
                engine.lefting = e.repeat;
                break;
            case 39: // arrow right
            case 68: // d
                engine.right = true;
                engine.righting = e.repeat;
                break;
            case 38: // arrow up
            case 87: // w
                engine.up = true;
                engine.upping = e.repeat;
                break;
            case 40: // arrow down
            case 83: // s
                engine.down = true;
                engine.downing = e.repeat;
                break;
            default:
                //console.error("Key Down Event - Char: " + e.code + " Code: " + e.keyCode + " Reapeat: " + e.repeat);
                break;
        }
        //if (String.fromCharCode(e.which) === ' ') that.space = true;
    }, false);

    engine.ctx.canvas.addEventListener("keyup", function (e) {
        switch (e.keyCode) {
            case 49: // 1
                engine.one = false;
                break;
            case 32: // ' '
                engine.space = false;
                break;
            case 37: // arrow left
            case 65: // a
                engine.left = engine.lefting = false;
                break;
            case 39: // arrow right
            case 68: // d
                engine.right = engine.righting = false;
                break;
            case 38: // arrow up
            case 87: // w
                engine.up = engine.upping = false;
                break;
            case 40: // arrow down
            case 83: // s
                engine.down = engine.downing = false;
                break;
            default:
                if (engine.debug) console.debug("Key Down Event - Char: " + e.code + " Code: " + e.keyCode + " Reapeat: " + e.repeat);
                break;
        }
    }, false);

    // Right click only.
    window.oncontextmenu = function (e) {
        engine.click = getXandY(e); // Enables inflicting damage on the enemy.
        e.preventDefault(); // cancels default context menu when right clicked.
        engine.one = true;
        setTimeout(function () {
            engine.one = false
        }, 400);
        //return false;  // cancels default context menu when right clicked.
    }

    // Left click only.
    engine.ctx.canvas.addEventListener("click", function (e) {
        engine.click = getXandY(e); // Enables inflicting damage on the enemy.
        if (engine.debug) console.debug("Clicked " + e.button + " button at " + e.clientX + "," + e.clientY); // The coordinates on the browser screen.
    }, false);

    let getXandY = function (e) {
        let x = e.clientX - engine.ctx.canvas.getBoundingClientRect().left;
        let y = e.clientY - engine.ctx.canvas.getBoundingClientRect().top;

        if (x < 1024) {
            x = Math.floor(x / 32);
            y = Math.floor(y / 32);
        }
        return {x: x, y: y};
    }
}
