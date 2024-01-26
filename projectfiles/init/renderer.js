import * as THREE from 'three';

export class Renderer {

    constructor() {
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
    }

    getRenderer() {
        return this.renderer;
    }

    rend(scene, camera) {
        this.renderer.render(scene, camera);
    }
}