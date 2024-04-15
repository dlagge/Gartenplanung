import { PopupTiles } from "./popup_tiles";

export class PopupWindow {

    createPopup() {
        this.createWindowStyle();
        this.createCloseButtonStyle();
        this.createTitle();
        this.createSearch();
    }

    createWindowStyle() {
        this.popupWindow = document.createElement('div');
        this.popupWindow.setAttribute('id', 'popupWindow');
        this.popupWindow.style.display = 'none';
        this.popupWindow.style.position = 'absolute';
        this.popupWindow.style.padding = '1rem';
        this.popupWindow.style.paddingTop = '0.1rem';
        this.popupWindow.style.backgroundColor = '#f7f7f7';

        // Test ob die Webseite auf dem Smartphone angeschaut wird oder nicht
        if (typeof screen.orientation === 'undefined') {
            this.popupWindow.style.left = '0%';
            this.popupWindow.style.top = '0%';
            this.popupWindow.style.height = '100%';
            this.popupWindow.style.width = '100%';

        } else {
            this.popupWindow.style.setProperty("-webkit-filter", "drop-shadow(2px 2px 2px #b3847a)");
            this.popupWindow.style.borderRadius = '1rem';
            this.popupWindow.style.left = '32.5%';
            this.popupWindow.style.top = '20%';
            this.popupWindow.style.height = '50%';
            this.popupWindow.style.width = '35%';
        }
    }

    createTileWindow() {
        this.tileWindow = document.createElement('div');
        this.tileWindow.setAttribute('id', 'popupTiles');
        this.tileWindow.style.height = '82%';
        this.tileWindow.style.overflow = 'auto';
        this.popupWindow.appendChild(this.tileWindow);
    }

    createCloseButtonStyle() {
        this.closeButton = document.createElement('button');
        this.closeButton.setAttribute('id', 'popupWindowclose');
        this.closeButton.style.position = 'absolute';
        this.closeButton.style.right = '0.8rem';
        this.closeButton.style.top = '0.8rem';
        this.closeButton.style.height = '2.8rem';
        this.closeButton.style.width = '2.8rem';
        this.closeButton.style.borderRadius = '50%';
        this.closeButton.style.border = 'none';
        this.closeButton.style.background = '#b3847a';
        this.closeButton.style.cursor = "pointer";
        this.closeButton.innerHTML = '<img src="./images/plus.png" style="width:1.6rem; margin-top:0.2rem; transform:rotate(45deg);" />';
        this.closeButton.onmouseover = function () {
            this.style.background = '#b4dbff';
            this.style.transition = '1s';
        };
        this.closeButton.onmouseout = function () {
            this.style.background = '#b3847a';
        };
        this.closeButton.onclick = function () {
            document.getElementById('popupButton').style.display = 'block';
            document.getElementById('popupWindow').style.display = 'none';
        };

        this.popupWindow.appendChild(this.closeButton);
    }

    createTitle() {
        let h1 = document.createElement("h1");
        h1.style.color = '#707070';
        h1.style.fontFamily = 'Arial';
        h1.style.fontSize = '1.2rem';
        h1.style.fontWeight = 'normal';

        let textNode = document.createTextNode("Pflanze hinzufügen");
        h1.appendChild(textNode);
        this.popupWindow.appendChild(h1);
        document.body.appendChild(this.popupWindow);
    }

    createSearch() {
        let search = document.createElement('input');
        search.setAttribute('id', 'inputsearch');
        search.style.borderRadius = '0.4rem';
        search.style.borderColor = '#b4dbff';
        search.style.borderStyle = 'solid';
        search.style.borderWidth = '0.15rem';
        search.style.marginBottom = '0.5rem';
        search.style.outline = 'none';
        search.style.width = '70%';
        search.style.height = '2rem';
        search.style.backgroundImage = 'url("./images/lupe.png")';
        search.style.backgroundPosition = '3% 50%';
        search.style.backgroundSize = '1.4rem';
        search.style.backgroundRepeat = 'no-repeat';
        search.style.color = '#707070';
        search.style.fontFamily = 'Arial';
        search.style.fontSize = '1rem';
        search.style.fontWeight = 'normal';
        search.style.paddingLeft = '0.5rem';
        search.onfocus = function () {
            this.style.borderColor = '#e6e6e6';
            this.style.backgroundSize = '0';
        };
        search.onblur = function () {
            this.style.borderColor = '#b4dbff';
            this.style.backgroundSize = '1.4rem';
            this.value = '';
        };

        this.popupWindow.appendChild(search);
        this.createTileWindow();

        let tiles = new PopupTiles();

        search.addEventListener('input', function () {
            //tiles.showFilteredTiles(this.value);

            fetch('http://localhost:5000/getSearchResult/' + document.getElementById('inputsearch').value)
            .then(response => response.json())
            .then(data => this.createTiles(data['data']));

            if (document.getElementById('popupTiles').childElementCount == 0) {
                this.plantbuttonContainer = document.createElement('div');
               this.plantbuttonContainer.style.width = '100%';
               this.plantbuttonContainer.style.height = '100%';
                this.plantButton = document.createElement('button');
                this.plantButton.style.height = '5.5rem';
                this.plantButton.style.width = '5.5rem';
                this.plantButton.style.position = 'absolute';
                this.plantButton.style.top = '50%';
                this.plantButton.style.left = '50%';
                this.plantButton.style.borderRadius = '50%';
                this.plantButton.style.transform = 'translate(-50%, -50%)';
                this.plantButton.style.borderWidth = '0.35rem';
                this.plantButton.style.borderColor = 'white';
                this.plantButton.style.borderStyle = 'solid';
                this.plantButton.style.background = 'none';
                this.plantButton.style.cursor = "pointer";
                this.plantButton.innerHTML = '<img src="./images/plus.png" style="width:3rem; margin-top:0.3rem" />';
                this.plantbuttonContainer.appendChild(this.plantButton);
                document.getElementById('popupTiles').appendChild(this.plantbuttonContainer);
                document.getElementById('popupTiles').style.position = 'relative'
            } else if (this.plantButton != null && document.getElementById('popupTiles').childElementCount > 0) {
                this.plantButtondiv.remove();
            }
        });
    }
}


