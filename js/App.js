import GameEngine from './GameEngine.js';
import Entity from './Entity.js'
import Sound from './Sound.js';
import Level1A from './levels/dungeon/1A.js';
import Level1B from './levels/dungeon/1B.js';

let GAME = new GameEngine(document.getElementById('viewport'));

GAME.registerSound('dungeon1.music', new Sound('./assets/audio/lost_mine.mp3', true));
GAME.registerSound('player.attack', new Sound('./assets/audio/player_attack.wav'));
GAME.registerSound('player.whirlwind', new Sound('./assets/audio/player_whirlwind_attack.wav'));

function startGame() {
    document.getElementById('start-game').hidden = true;

    // Player Spritesheets
    GAME.assetManager.queueDownload('player.idle.up', './assets/sprites/player/PlayerIdleUp.png');
    GAME.assetManager.queueDownload('player.idle.down', './assets/sprites/player/PlayerIdleDown.png');
    GAME.assetManager.queueDownload('player.idle.left', './assets/sprites/player/PlayerIdleLeft.png');
    GAME.assetManager.queueDownload('player.idle.right', './assets/sprites/player/PlayerIdleRight.png');
    GAME.assetManager.queueDownload('player.run.up', './assets/sprites/player/PlayerRunUp.png');
    GAME.assetManager.queueDownload('player.run.down', './assets/sprites/player/PlayerRunDown.png');
    GAME.assetManager.queueDownload('player.run.right', './assets/sprites/player/PlayerRunRight.png');
    GAME.assetManager.queueDownload('player.run.left', './assets/sprites/player/PlayerRunLeft.png');
    GAME.assetManager.queueDownload('player.attack.up', './assets/sprites/player/PlayerAttackUp.png');
    GAME.assetManager.queueDownload('player.attack.down', './assets/sprites/player/PlayerAttackDown.png');
    GAME.assetManager.queueDownload('player.attack.left', './assets/sprites/player/PlayerAttackLeft.png');
    GAME.assetManager.queueDownload('player.attack.right', './assets/sprites/player/PlayerAttackRight.png');
    GAME.assetManager.queueDownload('player.attack.whirlwind', './assets/sprites/player/PlayerWhirlwind.png');
    GAME.assetManager.queueDownload('player.attack.ranged', './assets/sprites/player/PlayerRanged.png');

    // UI Spritesheets
    GAME.assetManager.queueDownload('ui.avatar', './assets/sprites/ui/PlayerAvatar.png');
    GAME.assetManager.queueDownload('ui.hp', './assets/sprites/ui/HealthPotion.png');
    GAME.assetManager.queueDownload('ui.attack', './assets/sprites/ui/Attack.png');
    GAME.assetManager.queueDownload('ui.whirlwind', './assets/sprites/ui/Whirlwind.png');

    // Environment Spritesheets
    GAME.assetManager.queueDownload('map.dungeon', './assets/sprites/map/Dungeon1.png');
    GAME.assetManager.queueDownload('map.torch', './assets/sprites/map/Torch.png');

    // Enemy Spritesheets
    GAME.assetManager.queueDownload('sorcerer.attack', './assets/sprites/enemies/sorcerer/SorcererAttack.png');
    GAME.assetManager.queueDownload('behemoth.idle.left', './assets/sprites/enemies/slime-behemoth/SlimeBehemothIdleLeft.png');
    GAME.assetManager.queueDownload('behemoth.idle.right', './assets/sprites/enemies/slime-behemoth/SlimeBehemothIdleRight.png');
    GAME.assetManager.queueDownload('behemoth.walk.left', './assets/sprites/enemies/slime-behemoth/SlimeBehemothWalkLeft.png');
    GAME.assetManager.queueDownload('behemoth.walk.right', './assets/sprites/enemies/slime-behemoth/SlimeBehemothWalkRight.png');
    GAME.assetManager.queueDownload('behemoth.attack.left', './assets/sprites/enemies/slime-behemoth/SlimeBehemothAttackLeft.png');
    GAME.assetManager.queueDownload('behemoth.attack.right', './assets/sprites/enemies/slime-behemoth/SlimeBehemothAttackRight.png');
    GAME.assetManager.queueDownload('slime.idle', './assets/sprites/enemies/slime/SlimeIdle.png');
    GAME.assetManager.queueDownload('slime.walk.left', './assets/sprites/enemies/slime/SlimeWalkLeft.png');
    GAME.assetManager.queueDownload('slime.walk.right', './assets/sprites/enemies/slime/SlimeWalkRight.png');
    GAME.assetManager.queueDownload('slime.attack.left', './assets/sprites/enemies/slime/SlimeAttackLeft.png');
    GAME.assetManager.queueDownload('slime.attack.right', './assets/sprites/enemies/slime/SlimeAttackRight.png');
    GAME.assetManager.queueDownload('slime.death', './assets/sprites/enemies/slime/SlimeDeath.png');
    GAME.assetManager.queueDownload('wraith.idle', './assets/sprites/enemies/wraith/WraithIdle.png');
    GAME.assetManager.queueDownload('wraith.walk.left', './assets/sprites/enemies/wraith/WraithWalkLeft.png');
    GAME.assetManager.queueDownload('wraith.walk.right', './assets/sprites/enemies/wraith/WraithWalkRight.png');
    GAME.assetManager.queueDownload('wraith.attack.left', './assets/sprites/enemies/wraith/WraithAttackLeft.png');
    GAME.assetManager.queueDownload('wraith.attack.right', './assets/sprites/enemies/wraith/WraithAttackRight.png');
    GAME.assetManager.queueDownload('wraith.cast.up', './assets/sprites/enemies/wraith/WraithCastUp.png');
    GAME.assetManager.queueDownload('wraith.cast.down', './assets/sprites/enemies/wraith/WraithCastDown.png');
    GAME.assetManager.queueDownload('wraith.cast.left', './assets/sprites/enemies/wraith/WraithCastLeft.png');
    GAME.assetManager.queueDownload('wraith.cast.right', './assets/sprites/enemies/wraith/WraithCastRight.png');
    GAME.assetManager.queueDownload('wraith.death', './assets/sprites/enemies/wraith/WraithDeath.png');
    GAME.assetManager.queueDownload('skeleton.idle.left', './assets/sprites/enemies/skeleton/SkeletonIdleLeft.png');
    GAME.assetManager.queueDownload('skeleton.idle.right', './assets/sprites/enemies/skeleton/SkeletonIdleRight.png');
    GAME.assetManager.queueDownload('skeleton.walk.left', './assets/sprites/enemies/skeleton/SkeletonWalkLeft.png');
    GAME.assetManager.queueDownload('skeleton.walk.right', './assets/sprites/enemies/skeleton/SkeletonWalkRight.png');
    GAME.assetManager.queueDownload('skeleton.attack.left', './assets/sprites/enemies/skeleton/SkeletonAttackLeft.png');
    GAME.assetManager.queueDownload('skeleton.attack.right', './assets/sprites/enemies/skeleton/SkeletonAttackRight.png');
    GAME.assetManager.queueDownload('skeleton.death', './assets/sprites/enemies/skeleton/SkeletonDeath.png');

    // Item Spritesheets
    GAME.assetManager.queueDownload('item.silver.key', './assets/sprites/items/SilverKey.png');
    GAME.assetManager.queueDownload('item.gold.key', './assets/sprites/items/GoldKey.png');
    GAME.assetManager.queueDownload('item.hp', './assets/sprites/items/HealthPotion.png');
    GAME.assetManager.queueDownload('item.soul.jar', './assets/sprites/items/SoulJar.png');
    GAME.assetManager.downloadAll(function () {
        GAME.levelManager.load(new Level1A(GAME))

        GAME.init();
        GAME.start();
    });
}

export default startGame;