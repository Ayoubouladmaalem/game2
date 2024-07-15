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
    this.load.image('happy', 'assets/happypanda.png');
    this.load.image('sad', 'assets/sad.png');
    this.load.image('panda', 'assets/panda.png');
}

function create() {
    const image1 = this.add.image(400, 300, 'image1');
    const image2 = this.add.image(1200, 300, 'image2');

    const areas = [
        { x: 594, y: 343, width: 85, height: 84 },  // Adjusted width and height
        { x: 388, y: 184, width: 128, height: 115 },  
        { x: 608, y: 153, width: 92, height: 148 },  
        { x: 705, y: 316, width: 85, height: 88 },  
        { x: 179, y: 309, width: 129, height: 102 },  
        { x: 594, y: 343, width: 85, height: 84 }   
    ];

    const pandas = [];
    for (let i = 0; i < pandasRemaining; i++) {
        pandas.push(this.add.image(100 + i * 100, 100, 'panda').setScale(1));
    }

    // Listen for pointer down events on the whole scene
    this.input.on('pointerdown', (pointer) => {
        let clickedOnArea = false;

        // Check if the pointer is inside any of the defined areas
        for (let area of areas) {
            if (pointer.x >= area.x && pointer.x <= area.x + area.width &&
                pointer.y >= area.y && pointer.y <= area.y + area.height) {
                clickedOnArea = true;
                displayHappy(this, area.x, area.y);
                clickedAreas++;
                break; // Stop checking other areas once a match is found
            }
        }

        // If not clicked on any defined area, handle accordingly
        if (!clickedOnArea) {
            const pandaToRemove = pandas.pop();
            pandaToRemove.destroy();
            this.add.image(pandaToRemove.x, pandaToRemove.y, 'sad').setScale(1);
        }

        // Check if all areas are clicked
        if (pandas.length === 0) {
            // Game over scenario
            Swal.fire({
                title: 'Game Over!',
                text: 'You ran out of pandas!',
                icon: 'error',
                confirmButtonText: 'Restart'
            }).then(() => {
                window.location.reload();
                clickedAreas = 0;         
            });
        }

        if (clickedAreas === areas.length) {
            setTimeout(() => {
                Swal.fire({
                    title: 'Congratulations!',
                    text: 'You finished the game!',
                    icon: 'success',
                    confirmButtonText: 'Restart'
                }).then(() => {
                    window.location.reload();
                    clickedAreas = 0;
                });
            }, 500);
        }
    });
}

function displayHappy(scene, x, y) {
    const happy = scene.add.image(x, y, 'happy').setScale(1);
    setTimeout(() => { happy.destroy(); }, 1000);
}
