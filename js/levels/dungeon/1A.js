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
        this.queueTemplate(1, 49, Templates.roomTemplateSquare1);
		this.queueTemplate(25, 73, Templates.roomTemplateSquare3);
		this.queueTemplate(49, 49, Templates.roomTemplateSquare4);
		this.queueTemplate(25, 49, Templates.roomTemplateSquare13);
		this.queueTemplate(40, 33, Templates.roomTemplateSquare21);
        this.queueTemplate(54, 17, Templates.roomTemplateExitSquare1);
		this.queueTemplate(15, 51, Templates.hallwayTemplate1);
		this.queueTemplate(39, 51, Templates.hallwayTemplate1);
		this.queueTemplate(27, 15, Templates.hallwayTemplate2);
		this.queueTemplate(31, 39, Templates.hallwayTemplate3);
		this.queueTemplate(52, 31, Templates.hallwayTemplate5);
        this.queueTemplate(27, 63, Templates.hallwayTemplate2);
		
    }

    postPopulate() {
        let player = new Player(this.game, this.fromColumn(33), this.fromRow(87));

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