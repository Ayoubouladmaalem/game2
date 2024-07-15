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

    this.load.audio('success','assets/success.mp3');
    this.load.audio('error','assets/error.mp3');
}

function create() {
    const image1 = this.add.image(400, 300, 'image1');
    const image2 = this.add.image(1200, 300, 'image2');

    const areas = [
        { x: 282, y: 199, width: 365 - 282, height: 272 - 199 },  
        { x: 624, y: 186, width: 680 - 624, height: 288 - 186 },  
        { x: 705, y: 316, width: 790 - 705, height: 404 - 316 },  
        { x: 196, y: 321, width: 311 - 196, height: 403 - 321 },  
        { x: 594, y: 343, width: 679 - 594, height: 427 - 343 }   
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
                var success = this.sound.add('success');
                success.play();
                clickedAreas++;
                break; // Stop checking other areas once a match is found
                
            }
        }

        // If not clicked on any defined area, handle accordingly
        if (!clickedOnArea) {
            const pandaToRemove = pandas.pop();
            pandaToRemove.destroy();
            this.add.image(pandaToRemove.x, pandaToRemove.y, 'sad').setScale(1);
            var error = this.sound.add('error');
                error.play();

            // Check if all pandas are gone
            if (pandas.length === 0) {
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
        }

        // Check if all areas are clicked
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
