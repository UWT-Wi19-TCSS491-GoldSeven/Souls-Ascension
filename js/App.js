import GameEngine from './GameEngine.js';
import Entity from './Entity.js'
import Sound from './Sound.js';
import Level1A from './levels/dungeon/1A.js';

/*----------------------------------------------Collision Start---------------------------------------------------------------------------------------------- */

// function removeDoor(characterX, characterY, width) {
//     let targetX, targetY;
//     let j; // area to check collision
//     for (j = 0; j < leafs.length; j++) {
//         for (let i = 0; i < leafs[j].walls.length; i++) {
//             targetX = leafs[j].walls[i].x;
//             targetY = leafs[j].walls[i].y;
//             targetX = leafs[j].walls[i].x;
//             targetY = leafs[j].walls[i].y;
//             if (characterX < targetX + world1.currentScale &&// - width for more percise when work with character
//                 characterX + world1.currentScale - width > targetX &&
//                 characterY < targetY + world1.currentScale &&
//                 characterY > targetY) {
//                 leafs[j].walls.splice(i, 1);
//             }
//         }
//     }
// }

let GAME = new GameEngine(document.getElementById('viewport'));

GAME.sounds.set('dungeon1', new Sound('./assets/audio/lost_mine.mp3', true));
GAME.sounds.set('characterAttack01', new Sound('./assets/audio/player_attack.wav'));
GAME.sounds.set('characterAttack02', new Sound('./assets/audio/player_whirlwind_attack.wav'));

function startGame() {
    document.getElementById('start-game').hidden = true;

    GAME.assetManager.queueDownload('map.dungeon', './assets/sprites/DungeonBackgroundSpriteSheet.png');
    GAME.assetManager.queueDownload('player.idle.down', './assets/sprites/characterIdleAnimation.png');
    GAME.assetManager.queueDownload('player.idle.left', './assets/sprites/CharacterLeftIdle.png');
    GAME.assetManager.queueDownload('player.idle.right', './assets/sprites/CharacterRightIdle.png');
    GAME.assetManager.queueDownload('player.idle.up', './assets/sprites/CharacterUpIdle.png');
    GAME.assetManager.queueDownload('./assets/sprites/ChatacterAttackRanged.png');
    GAME.assetManager.queueDownload('./assets/sprites/CharacterForwardRun.png');
    GAME.assetManager.queueDownload('./assets/sprites/characterBackwardRun.png');
    GAME.assetManager.queueDownload('./assets/sprites/characterRightAnimation.png');
    GAME.assetManager.queueDownload('./assets/sprites/characterLeftAnimation.png');
    GAME.assetManager.queueDownload('./assets/sprites/characterRightAttack.png');
    GAME.assetManager.queueDownload('./assets/sprites/characterLeftAttack.png');
    GAME.assetManager.queueDownload('./assets/sprites/characterUpAttack.png');
    GAME.assetManager.queueDownload('./assets/sprites/characterDownAttack.png');
    GAME.assetManager.queueDownload('./assets/sprites/characterWhirlWindAttackAnimation.png');
    GAME.assetManager.queueDownload('./assets/sprites/sorcererVillain.png');
    GAME.assetManager.queueDownload('./assets/sprites/torchAnimation.png');
    GAME.assetManager.queueDownload('./assets/sprites/SilverKeyAnimation.png');
    GAME.assetManager.queueDownload('./assets/sprites/GoldKeyAnimation.png');
    GAME.assetManager.queueDownload('./assets/sprites/HealthPotionAnimation.png');
    GAME.assetManager.queueDownload('./assets/sprites/SoulJarAnimation.png');
    GAME.assetManager.queueDownload('./assets/sprites/SlimeBehemothWalkingLeft.png');
    GAME.assetManager.queueDownload('./assets/sprites/SlimeBehemothWalkingRight.png');
    GAME.assetManager.queueDownload('./assets/sprites/SlimeBehemothAttackLeft.png');
    GAME.assetManager.queueDownload('./assets/sprites/SlimeBehemothAttackRight.png');
    GAME.assetManager.queueDownload('./assets/sprites/SlimeWalkLeft.png');
    GAME.assetManager.queueDownload('./assets/sprites/SlimeWalkRight.png');
    GAME.assetManager.queueDownload('./assets/sprites/SlimeAttackLeft.png');
    GAME.assetManager.queueDownload('./assets/sprites/SlimeAttackRight.png');
    GAME.assetManager.queueDownload('./assets/sprites/SlimeIdle.png');
    GAME.assetManager.queueDownload('./assets/sprites/SlimeDeath.png');
    GAME.assetManager.queueDownload('./assets/sprites/wizardWalkLeft.png');
    GAME.assetManager.queueDownload('./assets/sprites/wizardWalkRight.png');
    GAME.assetManager.queueDownload('./assets/sprites/wizardAttackLeft.png');
    GAME.assetManager.queueDownload('./assets/sprites/wizardAttackRight.png');
    GAME.assetManager.queueDownload('./assets/sprites/wizardMagicSpellDown.png');
    GAME.assetManager.queueDownload('./assets/sprites/wizardMagicSpellUp.png');
    GAME.assetManager.queueDownload('./assets/sprites/wizardMagicSpellLeft.png');
    GAME.assetManager.queueDownload('./assets/sprites/wizardMagicSpellRight.png');
    GAME.assetManager.queueDownload('./assets/sprites/wizardIdle.png');
    GAME.assetManager.queueDownload('./assets/sprites/wizardDeath.png');
    GAME.assetManager.queueDownload('./assets/sprites/SkeletonWalkLeft.png');
    GAME.assetManager.queueDownload('./assets/sprites/SkeletonWalkRight.png');
    GAME.assetManager.queueDownload('./assets/sprites/characterInfo2.png');
    GAME.assetManager.queueDownload('./assets/sprites/HP.png');
    GAME.assetManager.queueDownload('./assets/sprites/whirl.png')
    GAME.assetManager.queueDownload('./assets/sprites/oneAttack.png')
    GAME.assetManager.downloadAll(function () {
        GAME.debug = false;

        GAME.levelManager.load(new Level1A(GAME))

        GAME.init();
        GAME.start();
    });
}

export default startGame();