import { createmodel, createmesh } from '../../main.js';
import { Model } from './model.js';

export class PopupButton {
    constructor() {
        this.createButton();
    }

    createButton() {
        this.popupButton = document.createElement('button');
        this.popupButton.setAttribute("id", "popupButton");
        this.popupButton.style.position = 'absolute';
        this.popupButton.style.left = '5rem';
        this.popupButton.style.top = '5rem';
        this.popupButton.style.height = '5.5rem';
        this.popupButton.style.width = '5.5rem';
        this.popupButton.style.borderRadius = '50%';
        this.popupButton.style.borderWidth = '0.35rem';
        this.popupButton.style.borderColor = 'white';
        this.popupButton.style.borderStyle = 'solid';
        this.popupButton.style.background = 'none';
        this.popupButton.style.cursor = "pointer";
        this.popupButton.innerHTML = '<img src="./images/plus.png" style="width:3rem; margin-top:0.3rem" />';
        document.body.appendChild(this.popupButton);
        this.popupButton.onmouseover = function () {
            this.style.transform = 'rotate(45deg)';
            this.style.transition = '1s';
        };
        this.popupButton.onmouseout = function () {
            this.style.transform = 'rotate(0deg)';
        };
        this.popupButton.onclick = function () {
            let model = new Model();
            model.setModelName('../../models/empty.glb');
            model.getModel().load(model.getModelName(), (gltf) => {
                let mesh = gltf.scene;
                createmesh(mesh);
            });
            createmodel('./models/empty.glb');

            this.style.display = 'none';
            document.getElementById('popupWindow').style.display = 'block';
        };
    }

    getButton() {
        return this.popupButton;
    }
}