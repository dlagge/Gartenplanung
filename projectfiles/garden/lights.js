import * as THREE from 'three';

export class Lights {
    constructor() {
        this.hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 2);
        this.hemiLight.color.setHSL(0.6, 1, 0.6);
        this.hemiLight.groundColor.setHSL(0.095, 1, 0.75);
        this.hemiLight.position.set(0, 100, 0);
        this.hemiLight.lookAt(0, 0, 0);
 
        this.ambientLight = new THREE.AmbientLight(0xfff2cc, 2.5);

        this.dirLight = new THREE.DirectionalLight(0xffffff, 3);
        this.dirLight.color.setHSL(0.1, 1, 0.95);
        this.dirLight.position.set(1, 1.75, -1);
        this.dirLight.position.multiplyScalar(30);
        this.dirLight.castShadow = true;
    }

    getHemiLight() {
        return this.hemiLightHelper;
    }

    geAmbientLight() {
        return this.ambientLight;
    }

    getDirLight() {
        return this.dirLight;
    }
}