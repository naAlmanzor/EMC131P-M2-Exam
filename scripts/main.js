import TitleScene from './scenes/TitleScene.js';
import InstructionScene from './scenes/InstructionScene.js';
import SelectScene from './scenes/SelectScene.js';

import s1GameScene from './scenes/s1-Scenes/s1GameScene.js'
import s1GameOverScene from './scenes/s1-Scenes/s1GameOverScene.js'
import s1StageClearScene from './scenes/s1-Scenes/s1StageClearScene.js'

import s2GameScene from './scenes/s2-Scenes/s2GameScenes.js'
import s2GameOverScene from './scenes/s2-scenes/s2GameOverScene.js'
import s2StageClearScene from './scenes/s2-Scenes/s2StageClearScene.js'

let titleScene = new TitleScene();
let instructionScene = new InstructionScene();
let selectScene = new SelectScene();

let s1gameScene = new s1GameScene();
let s1gameOverScene = new s1GameOverScene();
let s1stageClearScene = new s1StageClearScene();

let s2gameScene = new s2GameScene();
let s2gameOverScene = new s2GameOverScene();
let s2stageClearScene = new s2StageClearScene();

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 492,
    backgroundColor: "#D8F2FF",
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1000 },
            debug: false
        }
    },  
};

let game = new Phaser.Game(config);

game.scene.add('TitleScene', titleScene);
game.scene.add('InstructionScene', instructionScene);
game.scene.add('SelectScene', selectScene);

game.scene.add('s1GameScene', s1gameScene);
game.scene.add('s1GameOverScene', s1gameOverScene);
game.scene.add('s1StageClearScene', s1stageClearScene);

game.scene.add('s2GameScene', s2gameScene);
game.scene.add('s2GameOverScene', s2gameOverScene);
game.scene.add('s2StageClearScene', s2stageClearScene);

// Starting Scene
game.scene.start('TitleScene');
// game.scene.start('s2GameScene');