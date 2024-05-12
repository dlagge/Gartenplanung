import * as THREE from 'three';

export class Geometry {
    createPlane(width, length, planecolor) {
        /*
        let geometry = new THREE.BoxGeometry(width, length, 10);
        geometry.rotateX(- Math.PI / 2);
        this.plane = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ visible: true, color: planecolor, opacity:0.2 }));
        */
        let geometry = new THREE.BoxGeometry(width, length, 10).toNonIndexed();
        geometry.rotateX(- Math.PI / 2);
        const material = new THREE.MeshBasicMaterial({ vertexColors: true });
        const colors = [];
        const color = new THREE.Color();
        const dunkelbraun = new THREE.Color(0xEFA477);
        const braun = new THREE.Color(0xedae87);

        for(let i=0; i<8;i++) {
            color.set(dunkelbraun);
            this.createColors(colors, color);
        }
        for(let i=0; i<2;i++) {
            color.set(braun);
            this.createColors(colors, color);
        }
        for(let i=0; i<2;i++) {
            color.set(dunkelbraun);
            this.createColors(colors, color);
        }
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

        this.plane = new THREE.Mesh(geometry, material);
    }

    createColors(colors, color) {
        colors.push(color.r, color.g, color.b);
        colors.push(color.r, color.g, color.b);
        colors.push(color.r, color.g, color.b);
    }

    getPlane() {
        return this.plane;
    }
}