import * as THREE from 'three';

export class Lights {
    constructor() {
        this.createAmbientLight();
        this.createDirLight();
    }

    createAmbientLight() {
        this.ambientLight = new THREE.AmbientLight(0xfff2cc, 2.5);
    }

    createDirLight() {
        this.dirLight = new THREE.DirectionalLight(0xffffff, 3);
        this.dirLight.color.setHSL(0.1, 1, 0.95);
        this.dirLight.position.set(1, 1.75, -1);
        this.dirLight.position.multiplyScalar(30);
    }

    getAmbientLight() {
        return this.ambientLight;
    }

    getDirLight() {
        return this.dirLight;
    }
}