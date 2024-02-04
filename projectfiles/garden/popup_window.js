export class PopupWindow {

    createPopup() {
        let popupWindow = document.createElement('div');
        popupWindow.setAttribute('id', 'popupWindow');
        popupWindow.style.display = 'none';
        popupWindow.style.position = 'absolute';
        popupWindow.style.padding = '1rem';
        popupWindow.style.paddingTop = '0.1rem';
        popupWindow.style.backgroundColor = '#f7f7f7';

        // Test ob die Webseite auf dem Smartphone angeschaut wird oder nicht
        if (typeof screen.orientation === 'undefined') {
            popupWindow.style.left = '0%';
            popupWindow.style.top = '0%';
            popupWindow.style.height = '100%';
            popupWindow.style.width = '100%';

        } else {
            popupWindow.style.setProperty("-webkit-filter", "drop-shadow(2px 2px 2px #b3847a)");
            popupWindow.style.borderRadius = '2%';
            popupWindow.style.left = '32.5%';
            popupWindow.style.top = '20%';
            popupWindow.style.height = '50%';
            popupWindow.style.width = '35%';
        }

        let closeButton = document.createElement('button');
        closeButton.style.position = 'absolute';
        closeButton.style.right = '0.8rem';
        closeButton.style.top = '0.8rem';
        closeButton.style.height = '2.8rem';
        closeButton.style.width = '2.8rem';
        closeButton.style.borderRadius = '50%';
        closeButton.style.border = 'none';
        closeButton.style.background = '#b4dbff';
        closeButton.style.cursor = "pointer";
        closeButton.innerHTML = '<img src="./images/plus.png" style="width:1.6rem; margin-top:0.2rem; transform:rotate(45deg);" />';
        closeButton.onmouseover = function () {
            this.style.background = '#b3847a';
            this.style.transition = '1s';
        };
        closeButton.onmouseout = function () {
            this.style.background = '#b4dbff';
        };
        closeButton.onclick = function () {
            document.getElementById('popupButton').style.display = 'block';
            document.getElementById('popupWindow').style.display = 'none';
        };

        popupWindow.appendChild(closeButton);


        // h1 Titel
        let h1 = document.createElement("h1");
        h1.style.color = '#707070';
        h1.style.fontFamily = 'Arial';
        h1.style.fontSize = '1.2rem';
        h1.style.fontWeight = 'normal';

        let textNode = document.createTextNode("Pflanze hinzufügen");
        h1.appendChild(textNode);
        popupWindow.appendChild(h1);
        document.body.appendChild(popupWindow);
    }

}