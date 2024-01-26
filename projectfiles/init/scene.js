import * as THREE from 'three';

export class Scene {
    constructor(backgroundcolor) {
        this.backgroundcolor = backgroundcolor;
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(this.backgroundcolor);
    }

    getScene() {
        return this.scene
    }
}

