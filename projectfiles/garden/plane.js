import * as THREE from 'three';

export class Plane {
    constructor(planeColor) {
        this.planeColor = planeColor;
        this.geometry = new THREE.PlaneGeometry(100, 100);
        this.geometry.rotateX(- Math.PI / 2);
        this.plane = new THREE.Mesh(this.geometry, new THREE.MeshBasicMaterial({ visible: true, color: this.planeColor }));
    }

    getPlane() {
        return this.plane;
    }
}