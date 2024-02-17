export class PopupTiles {

    constructor() {
        this.searcharr = [
            ['Rüebli', 'sonnig', 'A', 'Mittelzehrer', 'April - Juni', 'Antikrebs', 'Augengesundheit'],
            ['Apfel', 'sonnig', 'C'],
            ['Lauch', 'Poree', 'C', 'K', 'Kalium'],
            ['Erdbeere', 'Rosengewächse', 'C']
        ];
        this.createTiles();
    }

    createTile(title, id) {
        this.tile = document.createElement('div');
        this.tile.setAttribute('id', 'tile' + id);
        this.tile.style.borderRadius = '0.4rem';
        this.tile.style.borderColor = '#e6e6e6';
        this.tile.style.borderStyle = 'solid';
        this.tile.style.borderWidth = '0.15rem';
        this.tile.style.background = '#fff';
        this.tile.style.height = '4rem';
        this.tile.style.marginTop = '0.5rem';
        document.getElementById('popupWindow').appendChild(this.tile);

        this.title = document.createTextNode(title);
        this.tile.appendChild(this.title);

    }

    showFilteredTiles(inputValue) {
        let filter = inputValue.toUpperCase();
        for (let i = 0; i < this.searcharr.length; i++) {
            let includeCounter = 0;
            for (let j = 0; j < this.searcharr[i].length; j++) {
                if (this.searcharr[i][j].toUpperCase().includes(filter)) {
                    includeCounter++;
                }
                if (j === this.searcharr[i].length - 1 && includeCounter === 0) {
                    document.getElementById('tile' + i).remove();
                }
                // ToDo: Wenn Der Textinput wieder gekürzt wird, müssen Elemente wieder hinzugefügt werden
            }
        }
    }

    createTiles() {
        for (let i = 0; i < this.searcharr.length; i++) {
            this.createTile(this.searcharr[i][0], i);
        }
    }
}