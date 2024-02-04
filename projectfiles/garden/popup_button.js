export class PopupButton {
    createButton() {
        let popupButton = document.createElement('button');
        popupButton.setAttribute("id", "popupButton");
        popupButton.style.position = 'absolute';
        popupButton.style.left = '5rem';
        popupButton.style.top = '5rem';
        popupButton.style.height = '5.5rem';
        popupButton.style.width = '5.5rem';
        popupButton.style.borderRadius = '50%';
        popupButton.style.borderWidth = '0.35rem';
        popupButton.style.borderColor = 'white';
        popupButton.style.borderStyle = 'solid';
        popupButton.style.background = 'none';
        popupButton.style.cursor = "pointer";
        popupButton.innerHTML = '<img src="./images/plus.png" style="width:3rem; margin-top:0.3rem" />';
        document.body.appendChild(popupButton);
        popupButton.onmouseover = function() {
            this.style.transform = 'rotate(45deg)';
            this.style.transition = '1s';
        };
        popupButton.onmouseout = function() {
            this.style.transform = 'rotate(0deg)';
        };
        popupButton.onclick = function() {
            this.style.display = 'none';
            document.getElementById('popupWindow').style.display = 'block';
        };
    }
}