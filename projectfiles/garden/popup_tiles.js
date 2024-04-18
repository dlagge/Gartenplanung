import { createmodel, createmesh } from '../../main.js';
import { Model } from './model.js';

export class PopupTiles {

    constructor() {
        /*
        this.searcharr = [
            ['karotte', 'Rüebli', 'sonnig', 'A', 'Mittelzehrer', 'April-Juni', 'Antikrebs', 'Augengesundheit', 'Eisen 0,4mg', 'Magnesium 17mg', 'Kalzium 41mg', 'Fett 0.2g', 'Protein 1g'],
            ['karotte', 'Apfel', 'sonnig', 'C'],
            ['lauch', 'Lauch', 'Poree', 'C', 'K', 'Kalium'],
            ['karotte', 'Erdbeere', 'Rosengewächse', 'C'],
            ['karotte', 'Fenchel', 'Kalium', 'A']
        ];
        */
        fetch('http://localhost:5000/getAll')
            .then(response => response.json())
            .then(data => this.createTiles(data['data']));
    }

    createTiles(data) {
        data.forEach(function ({ plant_link, plant_name, plant_tags }) {
            let tile = document.createElement('div');
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
            let labels = document.createElement('div');
            labels.style.marginTop = '-0.9rem';
            labels.style.marginRight = '0.5rem';
            labels.style.marginLeft = '3.5rem';
            labels.style.height = '5rem';
            labels.style.overflow = 'auto';
            let plant_tags_arr = plant_tags.split(';');

            for (let i = 0; i < plant_tags_arr.length; i++) {
                let label = document.createElement('button');
                label.style.cursor = 'pointer';
                label.style.border = 'none';
                label.style.float = 'left';
                label.style.color = 'white';
                label.style.fontSize = '1rem';
                label.style.padding = '0.4rem';
                label.style.backgroundColor = '#b3847a';
                label.style.marginTop = '0.5rem';
                label.style.marginRight = '0.7rem';
                label.style.borderRadius = '1rem';
                label.innerHTML = plant_tags_arr[i];

                labels.appendChild(label);

                label.onmouseover = function () {
                    this.style.background = '#b4dbff';
                    this.style.transition = '1s';
                };
                label.onmouseout = function () {
                    this.style.background = '#b3847a';
                };
                label.onclick = function () {
                    document.getElementById('inputsearch').value = this.innerHTML;
                    document.getElementById('inputsearch').style.backgroundSize = '0';
                    document.getElementById('inputsearch').click();
                };

                img.onclick = function () {
                    document.getElementById('popupWindowclose').click();
                    document.getElementById('finishButton').style.display = 'block';
                    setTimeout(() => {
                        let model = new Model();
                        model.setModelName('../../models/' + plant_link + '.glb');
                        model.getModel().load(model.getModelName(), (gltf) => {
                            let mesh = gltf.scene;
                            createmesh(mesh);
                        });
                        createmodel('./models/' + plant_link + '.glb');
                    }, 1);
                }
            }

            tile.appendChild(labels);
        });
    }
}