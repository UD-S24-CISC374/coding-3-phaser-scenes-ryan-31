import Phaser from "phaser";

export default class SceneB extends Phaser.Scene {
    private platforms?: Phaser.Physics.Arcade.StaticGroup;
    private player?: Phaser.Physics.Arcade.Sprite;
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    private stars?: Phaser.Physics.Arcade.Group;

    private score = 0;
    private scoreText: Phaser.GameObjects.Text;

    private subtext: Phaser.GameObjects.Text;

    constructor() {
        super({ key: "SceneB" });
    }

    init(data: { score: number }) {
        this.score = data.score;
    }
    
    create() {
        this.add.image(400, 300, "backgroundB");
        this.platforms = this.physics.add.staticGroup();
        const ground = this.platforms.create(400, 600, "ground") as Phaser.Physics.Arcade.Sprite;
        ground.setScale(2).refreshBody();

        this.player = this.physics.add.sprite(100, 450, "dude");
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("dude", {
                start: 0, end: 3
            }),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: "turn",
            frames: [{ key: "dude", frame: 4}],
            frameRate: 20
        })

        this.anims.create({
            key: "right", 
            frames: this.anims.generateFrameNumbers("dude", {
                start: 5, end: 8
            }),
            frameRate: 10,
            repeat: -1
        })

        this.physics.add.collider(this.player, this.platforms);
        this.cursors = this.input.keyboard?.createCursorKeys();

        this.stars = this.physics.add.group({
            key: "star",
            repeat: 4,
            setXY: { x: 350, y: 0, stepX: 70 }
        })

        this.stars.children.iterate(c => {
            const child = c as Phaser.Physics.Arcade.Image
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            return true;
        })

        this.physics.add.collider(this.stars, this.platforms)
        this.physics.add.overlap(this.player, this.stars, this.handleCollectStar, undefined, this)
    
    this.scoreText = this.add.text(16, 60, `Score: ${this.score}`, {
            fontSize: "32px",
            color: "#FF0000"
        })
        this.subtext = this.add.text(16, 16, 'Now collect 5 stars to move on!', {
            fontSize: "32px",
            color: "#FF0000"
        })

    }

    private handleCollectStar(player:
            | Phaser.Types.Physics.Arcade.GameObjectWithBody
            | Phaser.Tilemaps.Tile,
        s:
            | Phaser.Types.Physics.Arcade.GameObjectWithBody
            | Phaser.Tilemaps.Tile
    ) {
        const star = s as Phaser.Physics.Arcade.Image;
        star.disableBody(true, true);

        this.score += 10;
        this.scoreText.setText(`Score: ${this.score}`)

    }

    update() {
        if (!this.cursors) {
            return
        }
        if (this.cursors.left.isDown) {
            this.player?.setVelocityX(-160);
            this.player?.anims.play("left", true);
        }
        else if (this.cursors.right.isDown)
        {
            this.player?.setVelocityX(160);
            this.player?.anims.play("right", true);
        }
        else {
            this.player?.setVelocityX(0);
            this.player?.anims.play("turn");
        }

        if (this.cursors.up.isDown && this.player?.body?.touching.down) {
            this.player.setVelocity(-330);
        }

        if (this.stars && this.stars.countActive(true) === 0) {
            this.scene.start("SceneC",{score: this.score} );
        }

    }
}