import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export class Controls {
    constructor(camera, rendDom) {
        this.camera = camera;
        this.rendDom = rendDom;
        this.controls = new OrbitControls(this.camera, this.rendDom);
        this.controls.mouseButtons = { LEFT: '', MIDDLE: THREE.MOUSE.RIGHT, RIGHT: THREE.MOUSE.RIGHT };
        this.controls.minDistance = 50;
        this.controls.maxDistance = 300;
        this.controls.maxPolarAngle = Math.PI / 2.5;
        this.controls.zoomToCursor = true;
        this.controls.enableZoom = true;
        this.controls.zoomSpeed = 2;
        this.controls.rotateSpeed = 0.5;
    }

    getControls() {
        return this.controls;
    }
}