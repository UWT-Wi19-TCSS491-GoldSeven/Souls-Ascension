import Player from '../../Player.js';
import Templates from './DungeonTemplates.js';
import Sorcerer from '../../enemies/Sorcerer.js';
import Slime from '../../enemies/Slime.js';
import Wraith from '../../enemies/Wraith.js';
import SlimeBehemoth from '../../enemies/SlimeBehemoth.js';
import Skeleton from '../../enemies/Skeleton.js';
import SoulJar from '../../items/SoulJar.js';
import HealingPotion from '../../items/HealingPotion.js';
import SilverKey from '../../items/SilverKey.js';
import GoldKey from '../../items/GoldKey.js';
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
		// enemies
        this.addEntity(new Slime(this.game, this.fromColumn(28), this.fromRow(76)));
		this.addEntity(new Slime(this.game, this.fromColumn(36), this.fromRow(76)));
		this.addEntity(new Slime(this.game, this.fromColumn(29), this.fromRow(55)));
		this.addEntity(new Slime(this.game, this.fromColumn(36), this.fromRow(55)));
		this.addEntity(new Slime(this.game, this.fromColumn(50), this.fromRow(56)));
		this.addEntity(new Slime(this.game, this.fromColumn(50), this.fromRow(57)));
		this.addEntity(new Slime(this.game, this.fromColumn(60), this.fromRow(52)));
		this.addEntity(new Slime(this.game, this.fromColumn(60), this.fromRow(60)));
		this.addEntity(new Slime(this.game, this.fromColumn(80), this.fromRow(51)));
		this.addEntity(new Slime(this.game, this.fromColumn(80), this.fromRow(62)));
		this.addEntity(new Slime(this.game, this.fromColumn(75), this.fromRow(30)));
		this.addEntity(new Slime(this.game, this.fromColumn(75), this.fromRow(35)));
		this.addEntity(new Slime(this.game, this.fromColumn(80), this.fromRow(30)));
		this.addEntity(new Slime(this.game, this.fromColumn(80), this.fromRow(35)));
		this.addEntity(new Slime(this.game, this.fromColumn(85), this.fromRow(30)));
		this.addEntity(new Slime(this.game, this.fromColumn(85), this.fromRow(35)));
		this.addEntity(new SlimeBehemoth(this.game, this.fromColumn(30), this.fromRow(62)));
		this.addEntity(new SlimeBehemoth(this.game, this.fromColumn(35), this.fromRow(62)));
		this.addEntity(new SlimeBehemoth(this.game, this.fromColumn(75), this.fromRow(55)));
		this.addEntity(new SlimeBehemoth(this.game, this.fromColumn(75), this.fromRow(58)));
		this.addEntity(new SlimeBehemoth(this.game, this.fromColumn(80), this.fromRow(54)));
		this.addEntity(new SlimeBehemoth(this.game, this.fromColumn(80), this.fromRow(59)));

		
		// items
		this.addEntity(new SoulJar(this.game, this.fromColumn(30), this.fromRow(83)))
		this.addEntity(new SoulJar(this.game, this.fromColumn(32), this.fromRow(57)))
		this.addEntity(new SoulJar(this.game, this.fromColumn(33), this.fromRow(57)))
		this.addEntity(new SoulJar(this.game, this.fromColumn(81), this.fromRow(57)))
		this.addEntity(new SoulJar(this.game, this.fromColumn(75), this.fromRow(26)))
		this.addEntity(new SoulJar(this.game, this.fromColumn(77), this.fromRow(26)))
		this.addEntity(new HealingPotion(this.game, this.fromColumn(35), this.fromRow(78)))
		this.addEntity(new HealingPotion(this.game, this.fromColumn(56), this.fromRow(56)))
		this.addEntity(new HealingPotion(this.game, this.fromColumn(56), this.fromRow(57)))
		this.addEntity(new HealingPotion(this.game, this.fromColumn(57), this.fromRow(56)))
		this.addEntity(new HealingPotion(this.game, this.fromColumn(57), this.fromRow(57)))
		this.addEntity(new HealingPotion(this.game, this.fromColumn(80), this.fromRow(56)))
		this.addEntity(new GoldKey(this.game, this.fromColumn(35), this.fromRow(83)))
		this.addEntity(new SilverKey(this.game, this.fromColumn(30), this.fromRow(78)))
    }
}

export default Level1A;