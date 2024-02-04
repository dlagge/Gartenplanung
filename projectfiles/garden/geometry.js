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

    createSelector() {
        let selectorGeo = new THREE.CylinderGeometry( 3, 3, 0.1, 50 ); 
        let material = new THREE.MeshBasicMaterial( {color: 0xb3847a} ); 
        this.selectorMesh = new THREE.Mesh( selectorGeo, material );
    }

    getSelector() {
        return this.selectorMesh;
    }
}