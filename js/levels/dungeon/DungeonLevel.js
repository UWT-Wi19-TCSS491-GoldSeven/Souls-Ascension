import Level from '../../Level.js';
import PlayerHUD from '../../ui/PlayerHUD.js';

class DungeonLevel extends Level {
    constructor(game) {
        super(game, 48);
        this.hud = new PlayerHUD(this.game)
    }

    init() {
        this.appendTileSheet(this.game.assetManager.getAsset('map.dungeon'));

        this.game.sounds.get('dungeon1.music').play();
    }

    isImpassable(id) {
        return (id >= 0 && id < 16) || (id > 28);
    }

    drawUserInterface(ctx) {
        this.hud.draw(ctx);
    }
}

export default DungeonLevel;