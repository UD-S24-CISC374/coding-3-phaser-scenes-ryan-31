import Phaser from "phaser";

export default class StartScreen extends Phaser.Scene {
    // Turn into shared state
    private score = 0;
    private scoreText: Phaser.GameObjects.Text;

    private titleText: Phaser.GameObjects.Text;
    private platforms?: Phaser.Physics.Arcade.StaticGroup;

    private subText: Phaser.GameObjects.Text; 
    private startButton: Phaser.GameObjects.Text;

    constructor() {
        super({key: "StartScene"});
    }

    create() {
        this.add.image(400, 300, "startB");
        this.platforms = this.physics.add.staticGroup();
        const ground = this.platforms.create(400, 600, "ground") as Phaser.Physics.Arcade.Sprite;
        ground.setScale(2).refreshBody();

        this.titleText = this.add.text(115, 200, 'Space Explorer', {
            fontSize: "72px",
            color: "#fff"
        })

        this.scoreText = this.add.text(65, 30, 'score: 0', {
            fontSize: "32px",
            color: "#FF0000"
        })

        this.scoreText = this.add.text(200, 275, 'Click start to begin!', {
            fontSize: "32px",
            color: "#fff"
        })

        
        this.startButton = this.add.text(310, 350, 'Start', {
            fontSize: "60px",
            color: "#FF0000"
        }).setInteractive();

        this.startButton.on('pointerdown', () => {
            this.scene.start("SceneA");
        });

    }

    update() {

    }
}
