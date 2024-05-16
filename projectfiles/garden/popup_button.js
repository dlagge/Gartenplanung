import { createModel, createMesh } from '../../main.js';
import { Model } from './model.js';
import { PopupWindow } from './popup_window.js';

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
        this.popupButton.innerHTML = '<img id="popupButton" src="./images/plus.png" style="width:3rem; margin-top:0.3rem" />';
        document.body.appendChild(this.popupButton);
        this.popupButton.onmouseover = function () {
            this.style.transform = 'rotate(45deg)';
            this.style.transition = '1s';
        };
        this.popupButton.onmouseout = function () {
            this.style.transform = 'rotate(0deg)';
        };
        this.popupButton.onclick = function () {
            /*
            let model = new Model();
            model.setModelName('../../models/empty.glb');
            model.getModel().load(model.getModelName(), (gltf) => {
                let mesh = gltf.scene;
                createMesh(mesh);
            });
            createModel('./models/empty.glb');
            */

            let popup = new PopupWindow();
            popup.createPopup();
            document.getElementById('popupButton').remove();
            let finishButton = document.getElementById('finishButton');
            if(finishButton) {
                finishButton.remove();
            }
        };
    }

    getButton() {
        return this.popupButton;
    }
}