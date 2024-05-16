import { createModel, createMesh, getPlantObjects, setObjects, pushObject, getPositionedPlants, onPointerMove, onPointerDown } from '../../main.js';
import { Model } from './model.js';

export class FinishButton {
    createButton() {
        this.finishButton = document.createElement('button');
        this.finishButton.setAttribute("id", "finishButton");
        this.finishButton.style.position = 'absolute';
        this.finishButton.style.left = '50%';
        this.finishButton.style.top = '5rem';
        this.finishButton.style.height = '5.5rem';
        this.finishButton.style.borderRadius = '1rem';
        this.finishButton.style.borderWidth = '0.35rem';
        this.finishButton.style.borderColor = 'white';
        this.finishButton.style.borderStyle = 'solid';
        this.finishButton.style.background = '#b3847a';
        this.finishButton.style.cursor = "pointer";
        this.finishButton.style.color = '#ffffff';
        this.finishButton.style.fontSize = '1.8rem';
        this.finishButton.style.padding = '1rem';
        this.finishButton.innerHTML = 'Speichern';
        document.body.appendChild(this.finishButton);
        this.finishButton.onmouseover = function () {
            this.style.background = '#b4dbff';
            this.style.transition = '1s';
        };
        this.finishButton.onmouseout = function () {
            this.style.background = '#b3847a';
        };
        this.finishButton.onclick = function () {
            document.removeEventListener('pointermove', onPointerMove);
            document.removeEventListener('pointerdown', onPointerDown);
            /*
            let model = new Model();
            model.setModelName('../../models/empty.glb');
            model.getModel().load(model.getModelName(), (gltf) => {
                let mesh = gltf.scene;
                createMesh(mesh);
            });
            createModel('./models/empty.glb');
            */

            document.getElementById('finishButton').remove();

            let plantobjects = getPlantObjects();

            plantobjects.forEach(plantobj => {
                fetch('http://localhost:5000/addPlantArray', {
                    headers: {
                        'Content-type': 'application/json'
                    },
                    method: 'POST',

                    body: JSON.stringify({
                        plant_link: plantobj[0],
                        x_position: plantobj[1],
                        y_position: plantobj[2],
                        z_position: plantobj[3]
                    })
                })
            });

          //  setObjects([]);
            getPositionedPlants();
            /*
            fetch('http://localhost:5000/getAllPositionedPlants')
                .then(response => response.json())
                .then(data => seedPlants(data['data']));

            function seedPlants(data) {*
                data.forEach(function ({ plant_link, x_position, y_position, z_position }) {
                    let model = new Model();
                    model.setModelName('../../models/' + plant_link + '.glb');
                    model.getModel().load(model.getModelName(), (gltf) => {
                        let mesh = gltf.scene;
                        mesh.position.set(x_position, y_position, z_position);
                        createMesh(mesh);
                       // pushObject(mesh);
                    });
                  //  createModel('./models/' + plant_link + '.glb');
                });
            }
            */
        };
    }
}