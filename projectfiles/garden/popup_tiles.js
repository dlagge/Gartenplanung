import { createmodel, createmesh } from '../../main.js';
import { Model } from './model.js';

export class PopupTiles {

    constructor() {
        this.searcharr = [
            ['karotte', 'Rüebli', 'sonnig', 'A', 'Mittelzehrer', 'April-Juni', 'Antikrebs', 'Augengesundheit', 'Eisen 0,4mg', 'Magnesium 17mg', 'Kalzium 41mg', 'Fett 0.2g', 'Protein 1g'],
            ['karotte', 'Apfel', 'sonnig', 'C'],
            ['lauch', 'Lauch', 'Poree', 'C', 'K', 'Kalium'],
            ['karotte', 'Erdbeere', 'Rosengewächse', 'C'],
            ['karotte', 'Fenchel', 'Kalium', 'A']
        ];
       // this.createTiles();

        fetch('http://localhost:5000/getAll')
        .then(response => response.json())
        .then(data => this.createTiles(data['data']));;
    }

    getSearchArr() {
        return this.searcharr;
    }

    createTiles(data) {
        data.forEach(function({plant_link, plant_name, plant_tags}) {
          //  this.createTile(plant_link, plant_name);
        let tile = document.createElement('div');
       // this.tile.setAttribute('id', 'tile' + id);
        tile.style.borderRadius = '0.4rem';
        tile.style.borderColor = '#e6e6e6';
        tile.style.borderStyle = 'solid';
        tile.style.borderWidth = '0.15rem';
        tile.style.background = '#fff';
        tile.style.height = '7rem';
        tile.style.marginTop = '0.5rem';
        document.getElementById('popupTiles').appendChild(tile);

        let img = document.createElement('div');
        img.style.cursor = 'pointer';
        img.style.float = 'left';
        img.style.marginRight = '1rem';
        img.style.borderRight = '0.15rem dashed #e6e6e6';
        img.style.width = '4rem';
        let plantimg = document.createElement('img');
        plantimg.src = './images/' + plant_link + '.png';
        plantimg.style.height = '6.5rem';
        plantimg.style.marginLeft = '0.3rem';
        plantimg.style.marginTop = '0.1rem';
        img.appendChild(plantimg);
        tile.appendChild(img);

        let title = document.createElement('div');
        let h2 = document.createElement("h2");
        h2.style.color = '#707070';
        h2.style.fontFamily = 'Arial';
        h2.style.fontSize = '1rem';
        h2.style.fontWeight = 'normal';
        h2.style.marginTop = '0.5rem';
        let titletext = document.createTextNode(plant_name);
        h2.appendChild(titletext);
        title.appendChild(h2);
        tile.appendChild(title);
        });
        /*
        for (let i = 0; i < this.searcharr.length; i++) {
            this.createTile(this.searcharr[i][1], i);
        }
        */
    }

    createTile(plant_link, title) {
        this.tile = document.createElement('div');
       // this.tile.setAttribute('id', 'tile' + id);
        this.tile.style.borderRadius = '0.4rem';
        this.tile.style.borderColor = '#e6e6e6';
        this.tile.style.borderStyle = 'solid';
        this.tile.style.borderWidth = '0.15rem';
        this.tile.style.background = '#fff';
        this.tile.style.height = '7rem';
        this.tile.style.marginTop = '0.5rem';
        document.getElementById('popupTiles').appendChild(this.tile);

        this.img = document.createElement('div');
        this.img.style.cursor = 'pointer';
        this.img.style.float = 'left';
        this.img.style.marginRight = '1rem';
        this.img.style.borderRight = '0.15rem dashed #e6e6e6';
        this.img.style.width = '4rem';
        this.plantimg = document.createElement('img');
        this.plantimg.src = './images/' + plant_link + '.png';
        this.plantimg.style.height = '6.5rem';
        this.plantimg.style.marginLeft = '0.3rem';
        this.plantimg.style.marginTop = '0.1rem';
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

        this.labels = document.createElement('div');
        this.labels.style.marginTop = '-0.9rem';
        this.labels.style.marginRight = '0.5rem';
        this.labels.style.marginLeft = '3.5rem';
        this.labels.style.height = '5rem';
        this.labels.style.overflow = 'auto';
/*
        for (let i = 2; i < this.searcharr[id].length; i++) {
            this.label = document.createElement('button');
            this.label.style.cursor = 'pointer';
            this.label.style.border = 'none';
            this.label.style.float = 'left';
            this.label.style.color = 'white';
            this.label.style.fontSize = '1rem';
            this.label.style.padding = '0.4rem';
            this.label.style.backgroundColor = '#b3847a';
            this.label.style.marginTop = '0.5rem';
            this.label.style.marginRight = '0.7rem';
            this.label.style.borderRadius = '1rem';
            this.label.innerHTML = this.searcharr[id][i];
            this.labels.appendChild(this.label);

            this.label.onmouseover = function () {
                this.style.background = '#b4dbff';
                this.style.transition = '1s';
            };
            this.label.onmouseout = function () {
                this.style.background = '#b3847a';
            };
            this.label.onclick = function () {
                document.getElementById('inputsearch').value = this.innerHTML;
                document.getElementById('inputsearch').style.backgroundSize = '0';
            };
        }
        */

        this.tile.appendChild(this.labels);

        this.img.onclick = function () {
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
/*
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
    */

    
}