import Player from '../../Player.js';
import Templates from './DungeonTemplates.js';
import Sorcerer from '../../enemies/Sorcerer.js';
import Slime from '../../enemies/Slime.js';
import DungeonLevel from './DungeonLevel.js';

class Level1B extends DungeonLevel {
    constructor(game) {
        super(game, 33, 87);
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
        //this.addEntity(new Sorcerer(this.game, this.fromColumn(112), this.fromRow(112)));
        //this.addEntity(new Slime(this.game, this.fromColumn(103), this.fromRow(103)))
    }
}

export default Level1B;