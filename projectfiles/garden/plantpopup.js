import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import localeDe from 'air-datepicker/locale/de';

export class PlantPopup {

    createPopup() {
        this.createWindowStyle();
        this.createCloseButtonStyle();
        this.createTitle();
        this.popupText();
    }

    createWindowStyle() {
        this.popupWindow = document.createElement('div');
        this.popupWindow.setAttribute('id', 'PlantPopupWindow');
        this.popupWindow.style.display = 'none';
        this.popupWindow.style.position = 'absolute';
        this.popupWindow.style.padding = '1rem';
        this.popupWindow.style.paddingTop = '0.1rem';
        this.popupWindow.style.backgroundColor = '#f7f7f7';
        document.body.appendChild(this.popupWindow);
        // Test ob die Webseite auf dem Smartphone angeschaut wird oder nicht
        if (typeof screen.orientation === 'undefined') {
            this.popupWindow.style.left = '0%';
            this.popupWindow.style.top = '0%';
            this.popupWindow.style.height = '100%';
            this.popupWindow.style.width = '100%';

        } else {
            this.popupWindow.style.setProperty("-webkit-filter", "drop-shadow(2px 2px 2px #b3847a)");
            this.popupWindow.style.borderRadius = '2%';
            this.popupWindow.style.left = '32.5%';
            this.popupWindow.style.top = '20%';
            this.popupWindow.style.height = '20%';
            this.popupWindow.style.width = '35%';
        }
    }

    createTitle() {
        let h1 = document.createElement("h1");
        h1.setAttribute('id', 'PlantPopupTitle');
        h1.style.color = '#707070';
        h1.style.fontFamily = 'Arial';
        h1.style.fontSize = '1.2rem';
        h1.style.fontWeight = 'normal';

        let textNode = document.createTextNode('');
        h1.appendChild(textNode);
        this.popupWindow.appendChild(h1);
    }

    createCloseButtonStyle() {
        this.closeButton = document.createElement('button');
        this.closeButton.setAttribute('id', 'PlantPopupWindowclose');
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
            document.getElementById('PlantPopupWindow').style.display = 'none';
        };

        this.popupWindow.appendChild(this.closeButton);
    }

    popupText() {
        this.textdiv = document.createElement("div");
        this.ausges = document.createElement("div");
        this.ernte = document.createElement("div");

        let h21 = document.createElement("h2");
        h21.style.color = '#707070';
        h21.style.fontFamily = 'Arial';
        h21.style.fontSize = '1rem';
        h21.style.fontWeight = 'normal';

        let h22 = document.createElement("h2");
        h22.style.color = '#707070';
        h22.style.fontFamily = 'Arial';
        h22.style.fontSize = '1rem';
        h22.style.fontWeight = 'normal';
        
        let ausges = document.createTextNode('Ausgesäht am:');
        this.search = document.createElement('input');
        this.search.setAttribute('id', 'ausgesinput');
        this.search.style.borderRadius = '0.4rem';
        this.search.style.borderColor = '#b4dbff';
        this.search.style.borderStyle = 'solid';
        this.search.style.borderWidth = '0.15rem';
        this.search.style.marginBottom = '0.5rem';
        this.search.style.outline = 'none';
        this.search.style.width = '70%';
        this.search.style.height = '2rem';
        
        let ernte = document.createTextNode('Voraussichtliche Ernte: ');


        h21.appendChild(ausges);
        this.ausges.appendChild(h21);
        this.ausges.appendChild(this.search);
        new AirDatepicker(this.search, {
            locale: localeDe
        })


        h22.appendChild(ernte);
        this.ernte.appendChild(h22);
        
        this.textdiv.appendChild(this.ausges);
        
        this.textdiv.appendChild(this.ernte);

        this.popupWindow.appendChild(this.textdiv);
        
    }

}