import * as THREE from 'three';

export class Scene {
    constructor() {
        this.scene = new THREE.Scene();
    }

    getScene() {
        return this.scene
    }
}

