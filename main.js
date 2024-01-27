import * as THREE from 'three';

import { Camera } from './projectfiles/init/camera';
import { Scene } from './projectfiles/init/scene';
import { Renderer } from './projectfiles/init/renderer';
import { Controls } from './projectfiles/init/controls';
import { Lights } from './projectfiles/garden/lights';
import { Geometry } from './projectfiles/garden/geometry';
import { Model } from './projectfiles/garden/model';


//----------------------- Variablen -----------------------//

let skycolor = 0xb4dbff;
let groundcolor = 0xedae87;
let selectorcolor = 0xf2f0f0;
let ground_width = 150;
let ground_length = 150;
let selector_width = 5;
let selector_length = 5;
let camera, scene, renderer, ground, controls, lights, model, mesh, raycaster, pointer, hoverselector;
let objects = [];


//----------------------- Funktionsaufrufe -----------------------//

init();
createGarden();

//----------------------- Funktionen -----------------------//

// Erstellt: Kamera, Szene, Renderer, Bewegungskontroller
function init() {
    camera = new Camera();
    scene = new Scene(skycolor);
    renderer = new Renderer();
    controls = new Controls(camera.getCamera(), renderer.getRenderer().domElement);
}

// Erstellt: Licht, Boden, Modelle
function createGarden() {
    lights = new Lights();
    ground = new Geometry(groundcolor);
    ground.createPlane(ground_width, ground_length);
    hoverselector = new Geometry(selectorcolor);
    hoverselector.createSelector(selector_width, selector_length);
    raycaster = new THREE.Raycaster();
    pointer = new THREE.Vector2();

    model = new Model('./models/karotte.glb');
    model.getModel().load(model.getModelName(), (gltf) => {
        mesh = gltf.scene;
        scene.getScene().add(mesh);
    });

    scene.getScene().add(
        ground.getPlane(),
        lights.getHemiLight(),
        lights.geAmbientLight(),
        lights.getDirLight(),
        hoverselector.getSelector()
    );

    objects.push(ground.getPlane());

    // listeners
    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerdown', onPointerDown);

    animate();
}

function onPointerMove(event) {
    pointer.set((event.clientX / window.innerWidth) * 2 - 1, - (event.clientY / window.innerHeight) * 2 + 1);
    raycaster.setFromCamera(pointer, camera.getCamera());
    const intersects = raycaster.intersectObjects(objects, false);

    if (intersects.length > 0 && !event.shiftKey) {
        const intersect = intersects[0];

        // Model auf dem Boden anzeigen
        hoverselector.getSelector().position.copy(intersect.point).add(intersect.face.normal);
        mesh.position.copy(intersect.point).add(intersect.face.normal);
    }
}

function onPointerDown(event) {
    pointer.set((event.clientX / window.innerWidth) * 2 - 1, - (event.clientY / window.innerHeight) * 2 + 1);
    raycaster.setFromCamera(pointer, camera.getCamera());
    const intersects = raycaster.intersectObjects(objects, false);

    // Objekte in den Boden setzen
    const floorvec = new THREE.Vector3(0, 4, 0);

    if (intersects.length > 0) {
        const intersect = intersects[0];

        if (event.button === 0) {

            // Model auf Boden platzieren
            let model_placed = new Model('./models/karotte.glb');
            model_placed.getModel().load(model_placed.getModelName(), (gltf) => {
                let mesh_placed = gltf.scene;
                mesh_placed.position.copy(intersect.point).add(intersect.face.normal);
                mesh_placed.position.sub(floorvec);
                scene.getScene().add(mesh_placed);
                objects.push(mesh_placed);
            });
        }
    }
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    renderer.rend(scene.getScene(), camera.getCamera());
}

