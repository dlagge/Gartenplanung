export class PlantPopup {

    createPopup() {
        this.createWindowStyle();
       // this.createTitle('');
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

    createTitle(title) {
        let h1 = document.createElement("h1");
        h1.setAttribute('id', 'PlantPopupTitle');
        h1.style.color = '#707070';
        h1.style.fontFamily = 'Arial';
        h1.style.fontSize = '1.2rem';
        h1.style.fontWeight = 'normal';

        let textNode = document.createTextNode(title);
        h1.appendChild(textNode);
        this.popupWindow.appendChild(h1);
    }

}