export default class s1StageClearScene extends Phaser.Scene{

    constructor(){
        super("s1StageClearScene")
    }

    create(){
        let text = this.add.text(240, 150, `STAGE CLEAR`, {
            fontFamily:'Montserrat',
            fontSize: '50px',
            fontStyle: '600',
            fill: '#ffffff'
          });
        
        text.setScrollFactor(0);

        let restartTxt = this.add.text(300, 248, `RETRY STAGE`, {
            fontFamily:'Montserrat',
            fontSize: '30px',
            fontStyle: '600',
            fill: '#ffffff'
          });
        
        restartTxt.setScrollFactor(0);
        restartTxt.setInteractive({useHandCursor: true});
        restartTxt.on('pointerdown', () => this.restart());

        let nextStageTxt = this.add.text(300, 300, `NEXT STAGE`, {
            fontFamily:'Montserrat',
            fontSize: '30px',
            fontStyle: '600',
            fill: '#ffffff'
          });
        
        nextStageTxt.setScrollFactor(0);
        nextStageTxt.setInteractive({useHandCursor: true});
        nextStageTxt.on('pointerdown', () => this.nextStage());

        let titleTxt = this.add.text(300, 350, `TITLE SCREEN`, {
            fontFamily:'Montserrat',
            fontSize: '30px',
            fontStyle: '600',
            fill: '#ffffff'
          });
        
        titleTxt.setScrollFactor(0);
        titleTxt.setInteractive({useHandCursor: true});
        titleTxt.on('pointerdown', () => this.home());

        this.cameras.main.setBackgroundColor('#FFD700')
    }

    restart(){
        this.scene.start("s1GameScene");
    }

    nextStage(){
        this.scene.start("s2GameScene")
    }

    home(){
        this.scene.start("TitleScene");
    }
}