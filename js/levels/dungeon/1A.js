import Player from '../../Player.js';
import Templates from './DungeonTemplates.js';
import Sorcerer from '../../enemies/Sorcerer.js';
import Slime from '../../enemies/Slime.js';
import DungeonLevel from './DungeonLevel.js';

class Level1A extends DungeonLevel {
    constructor(game) {
        super(game, 33, 87);
    }

    prePopulate() {
		this.queueTemplate(25, 73, Templates.roomTemplateSquare9);
		this.queueTemplate(25, 49, Templates.roomTemplateSquare1);
		this.queueTemplate(49, 49, Templates.roomTemplateSquare5);
		this.queueTemplate(73, 49, Templates.roomTemplateSquare12);
        this.queueTemplate(73, 25, Templates.roomTemplateExitSquare1);
		this.queueTemplate(27, 63, Templates.hallwayTemplate2);
		this.queueTemplate(39, 51, Templates.hallwayTemplate1);
		this.queueTemplate(63, 51, Templates.hallwayTemplate1);
		this.queueTemplate(75, 39, Templates.hallwayTemplate2);
		
    }

    postPopulate() {
        this.addEntity(new Slime(this.game, this.fromColumn(28), this.fromRow(76)))
		this.addEntity(new Slime(this.game, this.fromColumn(36), this.fromRow(76)))
    }
}

export default Level1A;