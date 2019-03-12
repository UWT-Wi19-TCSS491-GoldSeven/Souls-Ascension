/**
 * Put all key event listeners or button event listeners here.
 * Author: Sam Brendel
 */
function startInput(engine) {
    window.addEventListener('keydown', function (e) {
        switch (e.key) {
            case '`':
                engine.toggleDebug();
                break;
            default:
                break;
        }
    })

    engine.ctx.canvas.addEventListener('keydown', function (e) {
        switch (e.key) {
            case '1':
                engine.attack = true;
                break;
            case '2':
                engine.whirlwind = true;
                break;
            case 'ArrowLeft':
            case 'A':
            case 'a':
                engine.left = true;
                break;
            case 'ArrowRight':
            case 'D':
            case 'd':
                engine.right = true;
                break;
            case 'ArrowUp':
            case 'W':
            case 'w':
                engine.up = true;
                break;
            case 'ArrowDown':
            case 'S':
            case 's':
                engine.down = true;
                break;
            case 'M':
            case 'm':
                engine.settings.audio.muted = !engine.settings.audio.muted;
                engine.updateSounds();
                engine.saveSettings();
                break;
            case 'H':
            case 'h':
                engine.heal = true;
                break;
            case ' ':
                engine.space = true;
                break;
            default:
                break;
        }
    }, false);

    engine.ctx.canvas.addEventListener('keyup', function (e) {
        switch (e.key) {
            case '1':
                engine.attack = false;
                break;
            case '2':
                engine.whirlwind = false;
                break;
            case 'ArrowLeft':
            case 'A':
            case 'a':
                engine.left = false;
                break;
            case 'ArrowRight':
            case 'D':
            case 'd':
                engine.right = false;
                break;
            case 'ArrowUp':
            case 'W':
            case 'w':
                engine.up = false;
                break;
            case 'ArrowDown':
            case 'S':
            case 's':
                engine.down = false;
                break;
            case 'H':
            case 'H':
                engine.heal = false;
            default:
                break;
        }
    }, false);

    engine.ctx.canvas.addEventListener('mousedown', function (e) {
        if (e.button == 0) engine.attack = true; // Enables inflicting damage on the enemy.
        else if (e.button == 2) engine.whirlwind = true;
    }, false);

    engine.ctx.canvas.addEventListener('mouseup', function (e) {
        if (e.button == 0) engine.attack = false;
        else if (e.button == 2) engine.whirlwind = false;
    })
}

export default {startInput}