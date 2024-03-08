import Phaser from "phaser";

export default class FinalScene extends Phaser.Scene {
    // Turn into shared state
    private score = 0;
    private scoreText: Phaser.GameObjects.Text;

    private titleText: Phaser.GameObjects.Text;
    private platforms?: Phaser.Physics.Arcade.StaticGroup;

    private subText: Phaser.GameObjects.Text; 
    private startButton: Phaser.GameObjects.Text;

    constructor() {
        super({key: "FinalScene"});
    }

    init(data: { score: number }) {
        this.score = data.score;
    }
    
    create() {
        this.add.image(400, 300, "startB");
        this.platforms = this.physics.add.staticGroup();
        const ground = this.platforms.create(400, 600, "ground") as Phaser.Physics.Arcade.Sprite;
        ground.setScale(2).refreshBody();

        this.titleText = this.add.text(250, 250, 'You Won!', {
            fontSize: "72px",
            color: "#fff"
        })


        this.scoreText = this.add.text(190, 200, `Your final score was: ${this.score}`, {
            fontSize: "32px",
            color: "#FF0000"
        })
    }

    update() {

    }
}
