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

class Level1D extends DungeonLevel {
    constructor(game) {
        super(game, 33, 87);
    }

    prePopulate() {
		this.queueTemplate(25, 73, Templates.roomTemplateSquare7);
		this.queueTemplate(25, 49, Templates.roomTemplateSquare1);
		this.queueTemplate(25, 25, Templates.roomTemplateSquare5);
		this.queueTemplate(49, 73, Templates.roomTemplateSquare5);
		this.queueTemplate(49, 49, Templates.roomTemplateSquare2);
		this.queueTemplate(48, 25, Templates.roomTemplateSquare20);
		this.queueTemplate(73, 73, Templates.roomTemplateSquare12);
		this.queueTemplate(73, 49, Templates.roomTemplateSquare4);
        this.queueTemplate(73, 25, Templates.roomTemplateSquare6);
		this.queueTemplate(47, 97, Templates.roomTemplateBoss4);
		this.queueTemplate(27, 63, Templates.hallwayTemplate2);
		this.queueTemplate(27, 39, Templates.hallwayTemplate2);
		this.queueTemplate(75, 63, Templates.hallwayTemplate2);
		this.queueTemplate(39, 51, Templates.hallwayTemplate1);
		this.queueTemplate(63, 51, Templates.hallwayTemplate1);
		this.queueTemplate(63, 75, Templates.hallwayTemplate1);
		this.queueTemplate(39, 27, Templates.hallwayTemplate1);
		this.queueTemplate(75, 39, Templates.hallwayTemplate2);
		this.queueTemplate(51, 87, Templates.hallwayTemplate2);
		
    }

    postPopulate() {
		// items
		this.addEntity(new SoulJar(this.game, this.fromColumn(32), this.fromRow(57)));
		this.addEntity(new SoulJar(this.game, this.fromColumn(33), this.fromRow(57)));
		this.addEntity(new SoulJar(this.game, this.fromColumn(55), this.fromRow(31)));
		this.addEntity(new SoulJar(this.game, this.fromColumn(55), this.fromRow(32)));
		this.addEntity(new SoulJar(this.game, this.fromColumn(55), this.fromRow(33)));
		this.addEntity(new SoulJar(this.game, this.fromColumn(55), this.fromRow(34)));
		this.addEntity(new SoulJar(this.game, this.fromColumn(80), this.fromRow(56)));
		this.addEntity(new SoulJar(this.game, this.fromColumn(80), this.fromRow(57)));
		this.addEntity(new SoulJar(this.game, this.fromColumn(81), this.fromRow(56)));
		this.addEntity(new SoulJar(this.game, this.fromColumn(81), this.fromRow(57)));
		this.addEntity(new SoulJar(this.game, this.fromColumn(81), this.fromRow(81)));
		this.addEntity(new HealingPotion(this.game, this.fromColumn(32), this.fromRow(32)));
		this.addEntity(new HealingPotion(this.game, this.fromColumn(32), this.fromRow(33)));
		this.addEntity(new HealingPotion(this.game, this.fromColumn(33), this.fromRow(32)));
		this.addEntity(new HealingPotion(this.game, this.fromColumn(33), this.fromRow(33)));
		this.addEntity(new HealingPotion(this.game, this.fromColumn(56), this.fromRow(57)));
		this.addEntity(new HealingPotion(this.game, this.fromColumn(57), this.fromRow(57)));
		this.addEntity(new HealingPotion(this.game, this.fromColumn(80), this.fromRow(80)));
		this.addEntity(new HealingPotion(this.game, this.fromColumn(56), this.fromRow(80)));
		this.addEntity(new HealingPotion(this.game, this.fromColumn(56), this.fromRow(81)));
		this.addEntity(new HealingPotion(this.game, this.fromColumn(57), this.fromRow(80)));
		this.addEntity(new HealingPotion(this.game, this.fromColumn(57), this.fromRow(81)));
		this.addEntity(new GoldKey(this.game, this.fromColumn(80), this.fromRow(33)));
		this.addEntity(new GoldKey(this.game, this.fromColumn(81), this.fromRow(32)));
		this.addEntity(new SilverKey(this.game, this.fromColumn(80), this.fromRow(32)));
		this.addEntity(new SilverKey(this.game, this.fromColumn(81), this.fromRow(33)));
		
		// enemies
		this.addEntity(new Slime(this.game, this.fromColumn(30), this.fromRow(35)));
		this.addEntity(new Slime(this.game, this.fromColumn(30), this.fromRow(39)));
		this.addEntity(new Slime(this.game, this.fromColumn(35), this.fromRow(35)));
		this.addEntity(new Slime(this.game, this.fromColumn(35), this.fromRow(39)));
		this.addEntity(new Slime(this.game, this.fromColumn(55), this.fromRow(39)));
		this.addEntity(new Slime(this.game, this.fromColumn(75), this.fromRow(35)));
		this.addEntity(new Slime(this.game, this.fromColumn(85), this.fromRow(35)));
		this.addEntity(new SlimeBehemoth(this.game, this.fromColumn(40), this.fromRow(32)));
		this.addEntity(new SlimeBehemoth(this.game, this.fromColumn(40), this.fromRow(33)));
		this.addEntity(new SlimeBehemoth(this.game, this.fromColumn(74), this.fromRow(50)));
		this.addEntity(new SlimeBehemoth(this.game, this.fromColumn(75), this.fromRow(63)));
		this.addEntity(new SlimeBehemoth(this.game, this.fromColumn(76), this.fromRow(50)));
		this.addEntity(new SlimeBehemoth(this.game, this.fromColumn(77), this.fromRow(63)));
		this.addEntity(new SlimeBehemoth(this.game, this.fromColumn(78), this.fromRow(50)));
		this.addEntity(new SlimeBehemoth(this.game, this.fromColumn(83), this.fromRow(63)));
		this.addEntity(new SlimeBehemoth(this.game, this.fromColumn(84), this.fromRow(50)));
		this.addEntity(new SlimeBehemoth(this.game, this.fromColumn(85), this.fromRow(63)));
		this.addEntity(new SlimeBehemoth(this.game, this.fromColumn(86), this.fromRow(50)));
		this.addEntity(new SlimeBehemoth(this.game, this.fromColumn(87), this.fromRow(63)));
		this.addEntity(new Skeleton(this.game, this.fromColumn(30), this.fromRow(50)));
		this.addEntity(new Skeleton(this.game, this.fromColumn(35), this.fromRow(50)));
		this.addEntity(new Skeleton(this.game, this.fromColumn(39), this.fromRow(55)));
		this.addEntity(new Skeleton(this.game, this.fromColumn(39), this.fromRow(58)));
		this.addEntity(new Skeleton(this.game, this.fromColumn(53), this.fromRow(30)));
		this.addEntity(new Skeleton(this.game, this.fromColumn(53), this.fromRow(35)));
		this.addEntity(new Skeleton(this.game, this.fromColumn(79), this.fromRow(31)));
		this.addEntity(new Skeleton(this.game, this.fromColumn(79), this.fromRow(34)));
		this.addEntity(new Skeleton(this.game, this.fromColumn(82), this.fromRow(31)));
		this.addEntity(new Skeleton(this.game, this.fromColumn(82), this.fromRow(34)));
		this.addEntity(new Skeleton(this.game, this.fromColumn(80), this.fromRow(76)));
		this.addEntity(new Skeleton(this.game, this.fromColumn(81), this.fromRow(76)));
		this.addEntity(new Skeleton(this.game, this.fromColumn(80), this.fromRow(85)));
		this.addEntity(new Skeleton(this.game, this.fromColumn(81), this.fromRow(85)));
		this.addEntity(new Skeleton(this.game, this.fromColumn(76), this.fromRow(80)));
		this.addEntity(new Skeleton(this.game, this.fromColumn(76), this.fromRow(81)));
		this.addEntity(new Skeleton(this.game, this.fromColumn(86), this.fromRow(80)));
		this.addEntity(new Skeleton(this.game, this.fromColumn(86), this.fromRow(81)));
		this.addEntity(new Wraith(this.game, this.fromColumn(50), this.fromRow(32)));
		this.addEntity(new Wraith(this.game, this.fromColumn(50), this.fromRow(33)));
		this.addEntity(new Wraith(this.game, this.fromColumn(46), this.fromRow(32)));
		this.addEntity(new Wraith(this.game, this.fromColumn(46), this.fromRow(33)));
		this.addEntity(new Wraith(this.game, this.fromColumn(50), this.fromRow(60)));
		this.addEntity(new Wraith(this.game, this.fromColumn(55), this.fromRow(60)));
		this.addEntity(new Wraith(this.game, this.fromColumn(60), this.fromRow(60)));
		this.addEntity(new Wraith(this.game, this.fromColumn(50), this.fromRow(53)));
		this.addEntity(new Wraith(this.game, this.fromColumn(55), this.fromRow(53)));
		this.addEntity(new Wraith(this.game, this.fromColumn(60), this.fromRow(53)));
		this.addEntity(new Wraith(this.game, this.fromColumn(63), this.fromRow(56)));
		this.addEntity(new Wraith(this.game, this.fromColumn(63), this.fromRow(57)));
		this.addEntity(new Wraith(this.game, this.fromColumn(79), this.fromRow(38)));
		this.addEntity(new Wraith(this.game, this.fromColumn(82), this.fromRow(38)));
        this.addEntity(new Sorcerer(this.game, this.fromColumn(55), this.fromRow(110)));
        this.addEntity(new Sorcerer(this.game, this.fromColumn(58), this.fromRow(110)));
    }
}

export default Level1D;