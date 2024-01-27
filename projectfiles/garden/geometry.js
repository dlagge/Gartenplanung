import * as THREE from 'three';

export class Geometry {
    constructor(geometryColor) {
        this.geometryColor = geometryColor;
    }

    createPlane(width, length) {
        let geometry = new THREE.PlaneGeometry(width, length);
        geometry.rotateX(- Math.PI / 2);
        this.plane = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ visible: true, color: this.geometryColor }));
    }

    getPlane() {
        return this.plane;
    }

    createSelector(width, length) {
        let selectorGeo = new THREE.BoxGeometry(width, 0, length);
        let edges = new THREE.EdgesGeometry(selectorGeo);
        this.selectorMesh = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: this.geometryColor }));
    }

    getSelector() {
        return this.selectorMesh;
    }
}