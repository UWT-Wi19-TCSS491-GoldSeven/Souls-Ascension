import Level from '../../Level.js';
import Player from '../../Player.js';
import Templates from './DungeonTemplates.js';
import Sorcerer from '../../enemies/Sorcerer.js';
import PlayerHUD from '../../ui/PlayerHUD.js';
import Slime from '../../enemies/Slime.js';

class Level1A extends Level {
    constructor(game) {
        super(game, 48);
        this.hud = new PlayerHUD(this.game,
            this.game.assetManager.getAsset('./assets/sprites/characterInfo2.png'),
            this.game.assetManager.getAsset('./assets/sprites/HP.png'));
    }

    init() {
        this.appendTileSheet(this.game.assetManager.getAsset('map.dungeon'));

        this.game.sounds.get('dungeon1').play();
    }

    prePopulate() {
        this.queueTemplate(0, 0, Templates.roomTemplateSquare2);
    }

    postPopulate() {
        let player = new Player(this.game, 150, 150);

        this.addEntity(player, 'Player');
        this.addEntity(new Sorcerer(this.game, 500, 400));
        this.addEntity(new Slime(this.game, 400, 200))
    }

    isImpassable(id) {
        return (id >= 0 && id < 16) || (id > 28);
    }

    drawUserInterface(ctx) {
        this.hud.draw(ctx);
    }
}

export default Level1A;