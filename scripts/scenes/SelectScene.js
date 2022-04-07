export default class SelectScene extends Phaser.Scene{
    
    constructor(){
        super("SelectScene")
    }

    preload(){
        this.load.image("stage1", './assets/images/stage1.png')
        this.load.image("stage2", './assets/images/stage2.png')
    }

    create(){
        let text = this.add.text(220, 50, `SELECT STAGE`, {
            fontFamily:'Montserrat',
            fontSize: '50px',
            fontStyle: '600',
            fill: '#000000'
        });
        
        text.setScrollFactor(0);

        let stage1Img = this.add.image(200, 278, "stage1");
        stage1Img.setScrollFactor(0);
        stage1Img.setInteractive({useHandCursor: true});
        stage1Img.on('pointerdown', () => this.stage1());

        this.add.text(140, 440, `STAGE 1`, {
            fontFamily:'Montserrat',
            fontSize: '30px',
            fontStyle: '600',
            fill: '#000000'
        });
        
        let stage2Img = this.add.image(600, 278, "stage2");
        stage2Img.setScrollFactor(0);
        stage2Img.setInteractive({useHandCursor: true});
        stage2Img.on('pointerdown', () => this.stage2());

        this.add.text(540, 440, `STAGE 2`, {
            fontFamily:'Montserrat',
            fontSize: '30px',
            fontStyle: '600',
            fill: '#000000'
        });

        this.closeScene = this.add.text(20, 10, `CLOSE`, {
            fontFamily:'Montserrat',
            fontSize: '20px',
            fontStyle: '600',
            fill: '#000000'
        });
        this.closeScene.setScrollFactor(0);
        this.closeScene.setInteractive({useHandCursor: true});
        this.closeScene.on('pointerdown', () => this.close());

        this.cameras.main.setBackgroundColor("#ffffff")
    }

    stage1(){
        this.scene.start('s1GameScene')
    }

    stage2(){
        this.scene.start('s2GameScene')
    }

    close(){
        this.scene.start('TitleScene')
    }
}