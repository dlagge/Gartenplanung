import * as THREE from 'three';

export class Lights {
    constructor() {
        this.createAmbientLight();
        this.createDirLight1();
        this.createDirLight2();
    }

    createAmbientLight() {
        this.ambientLight = new THREE.AmbientLight(0xfff2cc, 2.5);
    }

    createDirLight1() {
        this.dirLight = new THREE.DirectionalLight(0xffffff, 2.2);
        this.dirLight.position.set(0, 100, -100);
    }
    createDirLight2() {
        this.dirLight2 = new THREE.DirectionalLight(0xffffff, 2.2);
        this.dirLight2.position.set(0, 100, 100);
    }

    getAmbientLight() {
        return this.ambientLight;
    }

    getDirLight1() {
        return this.dirLight;
    }

    getDirLight2() {
        return this.dirLight2;
    }
}