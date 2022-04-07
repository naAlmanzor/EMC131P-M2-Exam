export default class TitleScene extends Phaser.Scene{

    constructor(){
        super("TitleScene")
    }

    create(){

        let playText = this.add.text(220, 160, `PLAY GAME`, {
            fontFamily:'Montserrat',
            fontSize: '40px',
            fontStyle: '600',
            fill: '#000000'
        });
        
        playText.setScrollFactor(0);
        playText.setInteractive({useHandCursor: true});
        playText.on('pointerdown', () => this.play());

        let selectText = this.add.text(220, 230, `SELECT STAGE`, {
            fontFamily:'Montserrat',
            fontSize: '40px',
            fontStyle: '600',
            fill: '#000000'
        });
        
        selectText.setScrollFactor(0);
        selectText.setInteractive({useHandCursor: true});
        selectText.on('pointerdown', () => this.select());

        let instructText = this.add.text(220, 300, `INSTRUCTIONS`, {
            fontFamily:'Montserrat',
            fontSize: '40px',
            fontStyle: '600',
            fill: '#000000'
        });
        
        instructText.setScrollFactor(0);
        instructText.setInteractive({useHandCursor: true});
        instructText.on('pointerdown', () => this.instructions());
    }

    play(){ 
        this.scene.start("s1GameScene");
    }

    select(){
        this.scene.start("SelectScene");
    }

    instructions(){
        this.scene.start("InstructionScene");
    }
}