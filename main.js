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
import { PlantPopup } from "./projectfiles/garden/plantpopup";


//----------------------- Variablen -----------------------//

let skycolor = 0xb4dbff;
let groundcolor = 0xedae87;
let selectorcolor = 0xb3847a;
let ground_width = 150;
let ground_length = 150;
let camera, scene, renderer, ground, lights, mesh, raycaster, pointer, obj, plantpopup;

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
    new Controls(camera.getCamera(), renderer.getRenderer().domElement);
}

// Erstellt: Das Popup mit dem Popup Button, welches das Popup öffnet
function createPopup() {
    let popupButton = new PopupButton();
    popupButton.getButton();
    let popup = new PopupWindow();
    popup.createPopup();
    plantpopup = new PlantPopup();
    plantpopup.createPopup();
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
    ground.createPlane(ground_width, ground_length, groundcolor);
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
        lights.getDirLight()
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
    const intersects = raycaster.intersectObjects(objects, true);

    if (intersects.length > 0 && !event.shiftKey) {
        const intersect = intersects[0];
        if (intersects.length > 1) {
            intersects.forEach(intersect => {
                intersect.object.traverse((child) => {
                    if (child.material && intersect.object.name !== '') {
                        child.material.color.setHex(selectorcolor);
                    }
                });
            });
        } else {
            objects.forEach(obj => {
                obj.traverse((child) => {
                    if (child.material && obj.name !== '') {
                        child.material.color.setHex(0xffffff);
                    }
                });
            });
        }

        // Model auf dem Boden anzeigen
        mesh.position.copy(intersect.point).add(intersect.face.normal);
    }
}

// Objekte werden auf die Gartenfläche gesetzt, wenn es einen Linksmausklick gibt
function onPointerDown(event) {

    pointer.set((event.clientX / window.innerWidth) * 2 - 1, - (event.clientY / window.innerHeight) * 2 + 1);
    raycaster.setFromCamera(pointer, camera.getCamera());
    const intersects = raycaster.intersectObjects(objects, true);

    // Objekte in den Boden setzen
    const floorvec = new THREE.Vector3(0, 4, 0);
    
    if(document.getElementById('PlantPopupWindow').style.display === 'block') {
        document.getElementById('PlantPopupWindow').style.display = 'none';
        document.getElementById('PlantPopupTitle').remove();
    }

    if (intersects.length > 0 && event.button === 0) {
        const intersect = intersects[0];

        // Model auf Boden platzieren
        let model_placed = new Model();
        model_placed.setModelName(obj);

        if (intersects.length > 1) {
            console.log(objects);
            let objcount = 1;
            objects.forEach(object => {
                intersects.forEach(intersect => {
                    if (object.uuid == intersect.object.parent.uuid && object !== ground.getPlane() && model_placed.getModelName() !== './models/empty.glb') {
                        objects = objects.filter(obj => obj !== object);
                        scene.getScene().remove(object);
                    }
                    if (object.uuid == intersect.object.parent.uuid && object !== ground.getPlane() && model_placed.getModelName() === './models/empty.glb' && objcount === 1) {
                        plantpopup.createTitle(intersect.object.name);
                        objcount++;
                        document.getElementById('PlantPopupWindow').style.display = 'block'; 
                    }
                });
            });
        } else {
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