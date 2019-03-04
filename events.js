/**
 * Put all key event listeners or button event listeners here.
 * Author: Sam Brendel
 */
function Events(that) {

    window.addEventListener('keydown', function (e) {
        switch (e.key) {
            case '`':
                let muted = !that.settings.audio.muted;
                for (let s of that.sounds.values()) {
                    s._audio.muted = muted;
                }
                that.settings.audio.muted = muted;
                break;
            case 'H':
            case 'h':
                that.used = 'hp';
            default:
                break;
        }
    })

    that.ctx.canvas.addEventListener("keydown", function (e) {
        switch (e.keyCode) {
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

    that.ctx.canvas.addEventListener("keyup", function (e) {
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
                if (that.debug) console.debug("Key Down Event - Char: " + e.code + " Code: " + e.keyCode + " Reapeat: " + e.repeat);
                break;
        }
    }, false);

    // Right click only.
    window.oncontextmenu = function (e) {
        that.click = getXandY(e); // Enables inflicting damage on the enemy.
        e.preventDefault(); // cancels default context menu when right clicked.
        that.one = true;
        that.sounds.get('characterAttack02').replay();
        setTimeout(function() {
            that.one = false
        }, 400);
        //return false;  // cancels default context menu when right clicked.
    }

    // Left click only.
    that.ctx.canvas.addEventListener("click", function (e) {
        that.click = getXandY(e); // Enables inflicting damage on the enemy.
        that.sounds.get('characterAttack01').replay();
        if (that.debug) console.debug("Clicked " + e.button +  " button at " + e.clientX + "," + e.clientY); // The coordinates on the browser screen.
    }, false);

    var getXandY = function (e) {
        var x = e.clientX - that.ctx.canvas.getBoundingClientRect().left;
        var y = e.clientY - that.ctx.canvas.getBoundingClientRect().top;

        if (x < 1024) {
            x = Math.floor(x / 32);
            y = Math.floor(y / 32);
        }
        return { x: x, y: y };
    }
}
