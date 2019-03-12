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
		// enemies
		this.addEntity(new Slime(this.game, this.fromColumn(27), this.fromRow(56)));
		this.addEntity(new Slime(this.game, this.fromColumn(38), this.fromRow(56)));
		this.addEntity(new Slime(this.game, this.fromColumn(32), this.fromRow(51)));
		this.addEntity(new Slime(this.game, this.fromColumn(45), this.fromRow(47)));
		this.addEntity(new Slime(this.game, this.fromColumn(49), this.fromRow(47)));
		this.addEntity(new Slime(this.game, this.fromColumn(45), this.fromRow(34)));
		this.addEntity(new Slime(this.game, this.fromColumn(49), this.fromRow(34)));
		this.addEntity(new Slime(this.game, this.fromColumn(56), this.fromRow(19)));
		this.addEntity(new Slime(this.game, this.fromColumn(59), this.fromRow(19)));
		this.addEntity(new Slime(this.game, this.fromColumn(64), this.fromRow(19)));
		this.addEntity(new SlimeBehemoth(this.game, this.fromColumn(30), this.fromRow(62)));
		this.addEntity(new SlimeBehemoth(this.game, this.fromColumn(40), this.fromRow(40)));
		this.addEntity(new SlimeBehemoth(this.game, this.fromColumn(41), this.fromRow(40)));
		this.addEntity(new SlimeBehemoth(this.game, this.fromColumn(55), this.fromRow(20)));
		this.addEntity(new SlimeBehemoth(this.game, this.fromColumn(55), this.fromRow(24)));
		this.addEntity(new SlimeBehemoth(this.game, this.fromColumn(55), this.fromRow(25)));
		this.addEntity(new SlimeBehemoth(this.game, this.fromColumn(55), this.fromRow(30)));
		this.addEntity(new Skeleton(this.game, this.fromColumn(30), this.fromRow(75)));
		this.addEntity(new Skeleton(this.game, this.fromColumn(35), this.fromRow(77)));
		this.addEntity(new Skeleton(this.game, this.fromColumn(31), this.fromRow(75)));
		this.addEntity(new Skeleton(this.game, this.fromColumn(34), this.fromRow(77)));
		this.addEntity(new Skeleton(this.game, this.fromColumn(50), this.fromRow(55)));
		this.addEntity(new Skeleton(this.game, this.fromColumn(50), this.fromRow(58)));
		this.addEntity(new Skeleton(this.game, this.fromColumn(54), this.fromRow(56)));
		this.addEntity(new Skeleton(this.game, this.fromColumn(54), this.fromRow(57)));
		this.addEntity(new Wraith(this.game, this.fromColumn(15), this.fromRow(55)));
		this.addEntity(new Wraith(this.game, this.fromColumn(15), this.fromRow(60)));
		this.addEntity(new Wraith(this.game, this.fromColumn(5), this.fromRow(53)));
		this.addEntity(new Wraith(this.game, this.fromColumn(12), this.fromRow(53)));
		
        // items
		this.addEntity(new SoulJar(this.game, this.fromColumn(33), this.fromRow(81)));
		this.addEntity(new SoulJar(this.game, this.fromColumn(8), this.fromRow(57)));
		this.addEntity(new SoulJar(this.game, this.fromColumn(9), this.fromRow(57)));
		this.addEntity(new SoulJar(this.game, this.fromColumn(56), this.fromRow(18)));
		this.addEntity(new SoulJar(this.game, this.fromColumn(58), this.fromRow(18)));
		this.addEntity(new SoulJar(this.game, this.fromColumn(56), this.fromRow(56)));
		this.addEntity(new SoulJar(this.game, this.fromColumn(56), this.fromRow(57)));
		this.addEntity(new SoulJar(this.game, this.fromColumn(57), this.fromRow(56)));
		this.addEntity(new SoulJar(this.game, this.fromColumn(57), this.fromRow(57)));
		this.addEntity(new HealingPotion(this.game, this.fromColumn(32), this.fromRow(81)));
		this.addEntity(new HealingPotion(this.game, this.fromColumn(47), this.fromRow(39)));
		this.addEntity(new HealingPotion(this.game, this.fromColumn(47), this.fromRow(40)));
		this.addEntity(new HealingPotion(this.game, this.fromColumn(47), this.fromRow(41)));
		this.addEntity(new HealingPotion(this.game, this.fromColumn(47), this.fromRow(42)));
		this.addEntity(new GoldKey(this.game, this.fromColumn(32), this.fromRow(57)));
		this.addEntity(new GoldKey(this.game, this.fromColumn(33), this.fromRow(56)));
		this.addEntity(new SilverKey(this.game, this.fromColumn(32), this.fromRow(56)));
		this.addEntity(new SilverKey(this.game, this.fromColumn(33), this.fromRow(57)));
    }
}

export default Level1B;