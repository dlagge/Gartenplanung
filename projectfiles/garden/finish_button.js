import { getPlantObjects, getPositionedPlants, onPointerMove, onPointerDown, onPointerMoveDBObjects, onPointerDownDBObjects, loadingSpinner } from '../../main.js';

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

            // event listeners
            document.removeEventListener('pointermove', onPointerMove);
            document.removeEventListener('pointerdown', onPointerDown);
            document.addEventListener('pointermove', onPointerMoveDBObjects);
            document.addEventListener('pointerdown', onPointerDownDBObjects);


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

            getPositionedPlants();
            location.reload(true);
        };
    }

    
}