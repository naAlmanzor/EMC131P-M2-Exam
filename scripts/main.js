import TitleScene from './scenes/TitleScene.js';
import InstructionScene from './scenes/InstructionScene.js';
import s1GameScene from './scenes/s1-Scenes/s1GameScene.js'
import s1GameOverScene from './scenes/s1-Scenes/s1GameOverScene.js'
import s1StageClearScene from './scenes/s1-Scenes/s1StageClearScene.js'

let titleScene = new TitleScene();
let instructionScene = new InstructionScene();
let s1gameScene = new s1GameScene();
let s1gameOverScene = new s1GameOverScene();
let s1stageClearScene = new s1StageClearScene();

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
game.scene.add('s1GameScene', s1gameScene);
game.scene.add('s1GameOverScene', s1gameOverScene);
game.scene.add('s1StageClearScene', s1stageClearScene);

// Starting Scene
game.scene.start('s1StageClearScene');
