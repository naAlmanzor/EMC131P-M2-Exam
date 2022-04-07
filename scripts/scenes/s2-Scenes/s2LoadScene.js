export default class s2LoadScene extends Phaser.Scene{

    constructor(){
        super("s2LoadScene")
    }

    create(){
        this.add.text(340, 246, `STAGE - 2`, {
            fontFamily:'Montserrat',
            fontSize: '30px',
            fontStyle: '600',
            fill: '#ffffff'
          });

          this.time.delayedCall(1500, this.stageLoad, [], this);
        
        this.cameras.main.setBackgroundColor('#000000')
    }

    stageLoad(){
        this.scene.start('s2GameScene');
    }
}