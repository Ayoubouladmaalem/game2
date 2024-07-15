var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
var game = new Phaser.Game(config);

function preload()
{
    this.load.image('bg-1','assets/image1.png');
    this.load.image('bg-2','assets/image2.png');

}

function create()
{
    this.add.image(400,300,'bg-1');
    this.add.image(400,300,'bg-2');

}

function update(){}