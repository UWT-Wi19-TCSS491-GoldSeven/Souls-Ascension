import Level from '../../Level.js';
import Player from '../../Player.js';
import Templates from './DungeonTemplates.js';
import Sorcerer from '../../enemies/Sorcerer.js';

class Level1A extends Level {
    constructor(game) {
        super(game, 48);
    }

    init() {
        this.appendTileSheet(this.game.assetManager.getAsset('map.dungeon'));

        this.game.sounds.get('dungeon1').play();
    }

    prePopulate() {
        this.queueTemplate(0, 0, Templates.roomTemplateBoss3);
    }

    postPopulate() {
        this.addEntity(new Player(this.game, 150, 150), 'Player');
        this.addEntity(new Sorcerer(this.game, 550, 150));
    }

    isImpassable(id) {
        return (id >= 0 && id < 16) || (id > 28);
    }
}

export default Level1A;