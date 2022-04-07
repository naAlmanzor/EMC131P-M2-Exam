export default class s1LoadScene extends Phaser.Scene{

    constructor(){
        super("s1LoadScene")
    }

    create(){
        this.add.text(340, 246, `STAGE - 1`, {
            fontFamily:'Montserrat',
            fontSize: '30px',
            fontStyle: '600',
            fill: '#ffffff'
          });

          this.time.delayedCall(1500, this.stageLoad, [], this);
        
        this.cameras.main.setBackgroundColor('#000000')
    }

    stageLoad(){
        this.scene.start('s1GameScene');
    }
}