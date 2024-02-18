import { createmodel, createmesh } from '../../main.js';
import { Model } from './model.js';

export class PopupTiles {

    constructor() {
        this.searcharr = [
            ['karotte', 'Rüebli', 'sonnig', 'A', 'Mittelzehrer', 'April - Juni', 'Antikrebs', 'Augengesundheit'],
            ['karotte', 'Apfel', 'sonnig', 'C'],
            ['lauch', 'Lauch', 'Poree', 'C', 'K', 'Kalium'],
            ['karotte', 'Erdbeere', 'Rosengewächse', 'C'],
            ['karotte', 'Fenchel', 'Kalium', 'A']
        ];
        this.createTiles();
    }

    getSearchArr() {
        return this.searcharr;
    }

    createTile(title, id) {
        this.tile = document.createElement('div');
        this.tile.setAttribute('id', 'tile' + id);
        this.tile.style.borderRadius = '0.4rem';
        this.tile.style.borderColor = '#e6e6e6';
        this.tile.style.borderStyle = 'solid';
        this.tile.style.borderWidth = '0.15rem';
        this.tile.style.background = '#fff';
        this.tile.style.height = '5rem';
        this.tile.style.marginTop = '0.5rem';
        document.getElementById('popupTiles').appendChild(this.tile);
        this.img = document.createElement('div');
        this.img.style.float = 'left';
        this.img.style.marginRight = '1rem';
        this.plantimg = document.createElement('img');
        this.plantimg.src = './images/' + this.searcharr[id][0] + '.png';
        this.plantimg.style.height = '5rem';
        this.plantimg.style.marginLeft = '0.4rem';
        this.img.appendChild(this.plantimg);
        this.tile.appendChild(this.img);

        this.title = document.createElement('div');
        let h2 = document.createElement("h2");
        h2.style.color = '#707070';
        h2.style.fontFamily = 'Arial';
        h2.style.fontSize = '1rem';
        h2.style.fontWeight = 'normal';
        h2.style.marginTop = '0.5rem';
        let titletext = document.createTextNode(title);
        h2.appendChild(titletext);
        this.title.appendChild(h2);
        this.tile.appendChild(this.title);

        this.tile.onclick = function () {
            let popuptiles = new PopupTiles();
            document.getElementById('popupWindowclose').click();
            setTimeout(() => {
                let model = new Model();
                model.setModelName('../../models/' + popuptiles.getSearchArr()[id][0] + '.glb');
                model.getModel().load(model.getModelName(), (gltf) => {
                    let mesh = gltf.scene;
                    createmesh(mesh);
                });
                createmodel('./models/' + popuptiles.getSearchArr()[id][0] + '.glb');
            }, 1);
        }
    }

    showFilteredTiles(inputValue) {
        let filter = inputValue.toUpperCase();
        for (let i = 0; i < this.searcharr.length; i++) {
            let includeCounter = 0;
            for (let j = 1; j < this.searcharr[i].length; j++) {
                if (this.searcharr[i][j].toUpperCase().includes(filter)) {
                    includeCounter++;
                }

                if (j === this.searcharr[i].length - 1 && includeCounter === 0 && document.getElementById('tile' + i) !== null) {
                    document.getElementById('tile' + i).remove();
                    includeCounter = 0;
                }

                if (j === this.searcharr[i].length - 1 && includeCounter > 0 && document.getElementById('tile' + i) === null) {
                    this.createTile(this.searcharr[i][1], i);
                    includeCounter = 0;
                }
            }
        }
    }

    createTiles() {
        for (let i = 0; i < this.searcharr.length; i++) {
            this.createTile(this.searcharr[i][1], i);
        }
    }
}