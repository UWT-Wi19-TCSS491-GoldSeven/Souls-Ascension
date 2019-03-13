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

        if (this.player == null)
            this.player = new Player(this.game, this.fromColumn(this.playerStartX), this.fromRow(this.playerStartY));
        else {
            this.player.x = this.fromColumn(this.playerStartX);
            this.player.y = this.fromRow(this.playerStartY);
        }

        this.hud = new PlayerHUD(this.game, this.player);

        this.addEntity(this.player, "Player");

        this.game.sounds.get('dungeon1.music').play();
    }

    isImpassable(id) {
        return (id >= 0 && id < 16) || (id > 28);
    }

    isDoor(id) {
        return this.isExitDoor(id) || this.isSilverDoor(id) || this.isGoldDoor(id);
    }

    isExitDoor(id) {
        return id == 15;
    }

    isSilverDoor(id) {
        return id == 29;
    }

    isGoldDoor(id) {
        return id == 30;
    }

    openDoor(column, row) {
        this.grid[this.toIndex(column, row)] = 24;
    }

    drawUserInterface(ctx) {
        this.hud.draw(ctx);
    }

    update() {
        super.update();

        if (this.player.destroyed && this.game.space) {
            this.player.toggleGameOver();
            this.doReset = true;
        }
    }
}

export default DungeonLevel;