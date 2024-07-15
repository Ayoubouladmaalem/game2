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
    // this.load.image('happyKid', 'assets/happy.png');
    this.load.image('sad', 'assets/sad.png');
    this.load.image('panda', 'assets/panda.png');
}

function create() {
    const image1 = this.add.image(400, 300, 'image1');
    const image2 = this.add.image(1200, 300, 'image2');

    const areas = [
        { x: 594, y: 343, width: 594, height: 343 },  
        { x: 388, y: 184, width: 388, height: 184 },  // coords="388,184,260,299"
        { x: 608, y: 153, width: 608, height: 153 },  // coords="608,153,700,301"
        { x: 705, y: 316, width: 705, height: 316 },  // coords="705,316,790,404"
        { x: 179, y: 309, width: 179, height: 309 },  // coords="179,309,308,411"
        { x: 594, y: 343, width: 594, height: 427 }   // coords="594,343,679,427"
    ];

    const pandas = [];
    for (let i = 0; i < pandasRemaining; i++) {
        pandas.push(this.add.image(100 + i * 100, 100, 'panda').setScale(0.5));
    }

    // Listen for pointer down events on the whole scene
    this.input.on('pointerdown', (pointer) => {
        let clickedOnArea = false;

        // Check if the pointer is inside any of the defined areas
        areas.forEach((area) => {
            if (pointer.x >= area.x && pointer.x <= area.x + area.width &&
                pointer.y >= area.y && pointer.y <= area.y + area.height) {
                clickedOnArea = true;
                displayHappyKid(this, area.x, area.y);
                clickedAreas++;

                return;
            }
        });

        // If not clicked on any defined area, handle accordingly

        // Check if all areas are clicked
        if (!clickedOnArea) {
            const pandaToRemove = pandas.pop();
            pandaToRemove.destroy();
            this.add.image(pandaToRemove.x, pandaToRemove.y, 'sad').setScale(1);

        }

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
                // Reset pandas
                pandasRemaining = 3;
                pandas.length = 0;
                for (let i = 0; i < pandasRemaining; i++) {
                    pandas.push(this.add.image(100 + i * 100, 100, 'panda').setScale(0.5));
                }
            });
        }

        if(clickedAreas === areas.length){
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
            console.log('Clicked outside defined areas');
        }
    });
}

function displayHappyKid(scene, x, y) {
    const happyKid = scene.add.image(x, y, 'happyKid').setScale(0.5);
    setTimeout(() => { happyKid.destroy();}, 1000);
}

