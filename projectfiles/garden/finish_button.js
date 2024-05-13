import { createmodel, createmesh, getPlantObjects } from '../../main.js';
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
            let model = new Model();
            model.setModelName('../../models/empty.glb');
            model.getModel().load(model.getModelName(), (gltf) => {
                let mesh = gltf.scene;
                createmesh(mesh);
            });
            createmodel('./models/empty.glb');

            document.getElementById('finishButton').remove();

            
            getPlantObjects();

        };
    }
}