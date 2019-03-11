import Level from '../../Level.js';
import Player from "../../Player.js";
import Templates from './DungeonTemplates.js';

class Level1A extends Level {
    constructor(game) {
        super(game, 48);
    }

    init() {
        this.appendTileSheet(this.game.assetManager.getAsset("map.dungeon"));

        this.game.sounds.get('dungeon1').play();
    }

    prePopulate() {
        this.queueTemplate(0, 0, Templates.roomTemplateSquare1);
    }

    postPopulate() {
        this.addEntity(new Player(this.game, 0, 0), "Player");
    }

    isImpassable(id) {
        return id > 0 && id < 16;
    }
}

export default Level1A;