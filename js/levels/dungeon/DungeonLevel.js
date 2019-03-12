import Level from '../../Level.js';
import PlayerHUD from '../../ui/PlayerHUD.js';
import Player from '../../Player.js';

class DungeonLevel extends Level {
    constructor(game, playerStartX, playerStartY) {
        super(game, 48);
        this.playerStartX = playerStartX;
        this.playerStartY = playerStartY;
    }

    init() {
        this.appendTileSheet(this.game.assetManager.getAsset('map.dungeon'));

        this.player = new Player(this.game, this.fromColumn(this.playerStartX), this.fromRow(this.playerStartY));
        this.hud = new PlayerHUD(this.game, this.player);

        this.addEntity(this.player, "Player");

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