import * as THREE from 'three';

import { Camera } from './projectfiles/init/camera';
import { Scene } from './projectfiles/init/scene';
import { Renderer } from './projectfiles/init/renderer';
import { Controls } from './projectfiles/init/controls';
import { Lights } from './projectfiles/garden/lights';
import { Geometry } from './projectfiles/garden/geometry';
import { Model } from './projectfiles/garden/model';
import { PopupButton } from './projectfiles/garden/popup_button';
import { PopupWindow } from "./projectfiles/garden/popup_window";


//----------------------- Variablen -----------------------//

let skycolor = 0xb4dbff;
let groundcolor = 0xedae87;
let selectorcolor = 0xf2f0f0;
let ground_width = 150;
let ground_length = 150;
let floorvecSelector = new THREE.Vector3(0, 0.5, 0);
let camera, scene, renderer, ground, controls, lights, mesh, raycaster, pointer, hoverselector, obj;

let objects = [];


//----------------------- Funktionsaufrufe -----------------------//

createPopup();
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

// Erstellt: Das Popup mit dem Popup Button, welches das Popup öffnet
function createPopup() {
    let popupButton = new PopupButton();
    popupButton.getButton();
    let popup = new PopupWindow();
    popup.createPopup();
}

export function createmodel(objfunc) {
    obj = objfunc;
}

export function createmesh(meshfunc) {
    scene.getScene().add(meshfunc);
    mesh = meshfunc;
}

// Erstellt: Licht, Boden, Modelle
function createGarden() {
    lights = new Lights();
    ground = new Geometry(groundcolor);
    ground.createPlane(ground_width, ground_length);
    hoverselector = new Geometry(selectorcolor);
    hoverselector.createSelector();
    raycaster = new THREE.Raycaster();
    pointer = new THREE.Vector2();

    let model = new Model();
    model.setModelName('../../models/empty.glb');
    model.getModel().load(model.getModelName(), (gltf) => {
        let mesh = gltf.scene;
        createmesh(mesh);
    });
    createmodel('./models/empty.glb');

    scene.getScene().add(
        ground.getPlane(),
        lights.getAmbientLight(),
        lights.getDirLight(),
        hoverselector.getSelector()
    );

    objects.push(ground.getPlane());

    // listeners
    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('resize', onWindowResize, false);

    animate();
}

// Der Raycaster baut ein Mapping zwischen Mauszeiger und Position auf der Gartenfläche auf.
// Während dem Hovering wird das Objekt mit runder Schattenfläche angezeigt
function onPointerMove(event) {
    pointer.set((event.clientX / window.innerWidth) * 2 - 1, - (event.clientY / window.innerHeight) * 2 + 1);
    raycaster.setFromCamera(pointer, camera.getCamera());
    const intersects = raycaster.intersectObjects(objects, false);

    if (intersects.length > 0 && !event.shiftKey) {
        const intersect = intersects[0];

        // Model auf dem Boden anzeigen
        hoverselector.getSelector().position.copy(intersect.point).add(intersect.face.normal).add(floorvecSelector);
        mesh.position.copy(intersect.point).add(intersect.face.normal);
    }
}

// Objekte werden auf die Gartenfläche gesetzt, wenn es einen Linksmausklick gibt
function onPointerDown(event) {
    if (event.srcElement.attributes[0].nodeValue !== "./images/plus.png") {
        pointer.set((event.clientX / window.innerWidth) * 2 - 1, - (event.clientY / window.innerHeight) * 2 + 1);
        raycaster.setFromCamera(pointer, camera.getCamera());
        const intersects = raycaster.intersectObjects(objects, false);

        // Objekte in den Boden setzen
        const floorvec = new THREE.Vector3(0, 4, 0);
        if (event.srcElement.attributes[0].nodeValue == "three.js r160" && intersects.length > 0 && event.button === 0) {
            const intersect = intersects[0];

            // Model auf Boden platzieren
            let model_placed = new Model();
            model_placed.setModelName(obj);
            model_placed.getModel().load(model_placed.getModelName(), (gltf) => {

                let mesh_placed = gltf.scene;
                mesh_placed.position.copy(intersect.point).add(intersect.face.normal);
                mesh_placed.position.sub(floorvec);
                scene.getScene().add(mesh_placed);
                objects.push(mesh_placed);
                console.log(objects);
            });

        }
    }
}

function onWindowResize() {
    camera.getCamera().aspect = window.innerWidth / window.innerHeight;
    camera.getCamera().updateProjectionMatrix();
    renderer.getRenderer().setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    renderer.getRenderer().render(scene.getScene(), camera.getCamera());
}