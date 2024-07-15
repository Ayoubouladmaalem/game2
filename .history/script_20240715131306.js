const config = {
    type: Phaser.AUTO,
    width: 1600,
    height: 1200,
    parent: 'game-container',
    scene: {
        preload: preload,
        create: create
    }
};

const game = new Phaser.Game(config);

let clickedAreas = 0;
let pandasRemaining = 3; // Number of pandas


function preload() {
    this.load.image('image1', 'assets/image1.png');
    this.load.image('image2', 'assets/image2.png');
    this.load.image('happyKid', 'assets/happy.png');
    this.load.image('panda', 'assets/panda.png');
}

function create() {
    const image1 = this.add.image(400, 300, 'image1');
    const image2 = this.add.image(1200, 300, 'image2');


    const areas = [
        { x: 641, y: 374, width: 59, height: 47 },
        { x: 752, y: 360, width: 70, height: 32 },
        { x: 650, y: 238, width: 56, height: 76 },
        { x: 328, y: 238, width: 78, height: 69 }
    ];
    const pandas=[];
    for (let i=0; i < pandasRemaining; i++){
        pandas.push(this.add.image(100 + i*100, 100, 'panda').setScale(0.5))
    }
    
    areas.forEach((area, index) => {
        const rect = this.add.rectangle(area.x, area.y, area.width, area.height, 0xff0000, 0)
            .setInteractive()
            .on('pointerdown', () => {
                displayHappyKid(this, area.x, area.y);
                clickedAreas++;

                // Hide a panda if there are pandas left
                if (pandas.length > 0) {
                    // const pandaToRemove = pandas.pop();
                    pandaToRemove.destroy();
                }

                if (clickedAreas === areas.length) {
                    setTimeout(() => {
                        Swal.fire({
                            title: 'Congratulations!',
                            text: 'You finished the game!',
                            icon: 'success',
                            confirmButtonText: 'Restart'
                        }).then(() => {
                            game.scene.restart();
                            clickedAreas = 0;
                        });
                    }, 500);
                }
            });
    });
}

function displayHappyKid(scene, x, y) {
    const happyKid = scene.add.image(x, y, 'happyKid').setScale(0.5);
    setTimeout(() => { happyKid.destroy();}, 1000);
}
