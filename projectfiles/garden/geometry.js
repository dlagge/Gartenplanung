import * as THREE from 'three';

export class Geometry {
    createPlane(width, length, planecolor) {
        let geometry = new THREE.BoxGeometry(width, length, 10);
        geometry.rotateX(- Math.PI / 2);
        this.plane = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ visible: true, color: planecolor }));
    }

    getPlane() {
        return this.plane;
    }
}