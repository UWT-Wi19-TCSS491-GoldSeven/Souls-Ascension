import Level from '../../Level.js';
import Player from '../../Player.js';
import Templates from './DungeonTemplates.js';
import Sorcerer from '../../enemies/Sorcerer.js';
import PlayerHUD from '../../ui/PlayerHUD.js';
import Slime from '../../enemies/Slime.js';

class Level1A extends Level {
    constructor(game) {
        super(game, 48);
        this.hud = new PlayerHUD(this.game)
    }

    init() {
        this.appendTileSheet(this.game.assetManager.getAsset('map.dungeon'));

        this.game.sounds.get('dungeon1.music').play();
    }

    prePopulate() {
        this.queueTemplate(1, 45, Templates.roomTemplateSquare2);
		this.queueTemplate(22, 67, Templates.roomTemplateSquare3);
		this.queueTemplate(45, 45, Templates.roomTemplateSquare4);
		this.queueTemplate(22, 45, Templates.roomTemplateSquare13);
		this.queueTemplate(22, 22, Templates.roomTemplateSquare21);
        this.queueTemplate(22, 1, Templates.roomTemplateExitSquare1);
		this.queueTemplate(14, 52, Templates.hallwayTemplate1);
		this.queueTemplate(36, 52, Templates.hallwayTemplate1);
		this.queueTemplate(28, 14, Templates.hallwayTemplate2);
		this.queueTemplate(28, 36, Templates.hallwayTemplate2);
        this.queueTemplate(28, 58, Templates.hallwayTemplate2);
		
    }

    postPopulate() {
        let player = new Player(this.game, this.fromColumn(28), this.fromRow(77));

        this.addEntity(player, 'Player');
        //this.addEntity(new Sorcerer(this.game, this.fromColumn(112), this.fromRow(112)));
        //this.addEntity(new Slime(this.game, this.fromColumn(103), this.fromRow(103)))
    }

    isImpassable(id) {
        return (id >= 0 && id < 16) || (id > 28);
    }

    drawUserInterface(ctx) {
        this.hud.draw(ctx);
    }
}

export default Level1A;