import * as THREE from 'three';

import { Camera } from './projectfiles/init/camera';
import { Scene } from './projectfiles/init/scene';
import { Renderer } from './projectfiles/init/renderer';
import { Controls } from './projectfiles/init/controls';
import { Lights } from './projectfiles/garden/lights';
import { Geometry } from './projectfiles/garden/geometry';
import { Model } from './projectfiles/garden/model';
import { PopupButton } from './projectfiles/garden/popup_button';
import { PlantPopup } from "./projectfiles/garden/plant_popup";

//----------------------- Variablen -----------------------//

let selectorcolor = 0xb3847a;
let ground_width = 150;
let ground_length = 150;
let camera, scene, renderer, ground, lights, mesh, raycaster, pointer, obj, plantpopup;

let dbobjects = [];

// Three Js Objekte, welche visuell dargestellt werden, wenn man sie setzt
let objects = [];

// Array mit bestimmten Daten von dem objects array [Name, position x, position y, position z]
let plantobjects = [];

//----------------------- Funktionsaufrufe -----------------------//

createPopup();
init();
createGarden();

//----------------------- Funktionen -----------------------//

// Erstellt: Kamera, Szene, Renderer, Bewegungskontroller
function init() {
    camera = new Camera();
    scene = new Scene();
    renderer = new Renderer();
    new Controls(camera.getCamera(), renderer.getRenderer().domElement);
}

// Erstellt: Das Popup mit dem Popup Button, welches das Popup öffnet
function createPopup() {
    let popupButton = new PopupButton();
    popupButton.getButton();
}

export function createModel(objfunc) {
    obj = objfunc;
}

export function createMesh(meshfunc) {
    scene.getScene().add(meshfunc);
    mesh = meshfunc;
}

export function clickedDeleteButton(click) {
    deleteButtonClicked = click;
}

export function setObjects(val) {
    objects = val;
}

export function pushObject(val) {
    objects.push(val);
}

export function getPlantObjects() {
    objects.forEach(obj => {
        if (obj.children.length !== 0) {
            plantobjects.push([obj.children[0].name, obj.position.x, obj.position.y, obj.position.z]);
        }
    });
    return plantobjects;
}

// Erstellt: Licht, Boden, Modelle
function createGarden() {
    lights = new Lights();
    ground = new Geometry();
    ground.createPlane(ground_width, ground_length);
    raycaster = new THREE.Raycaster();
    pointer = new THREE.Vector2();

    scene.getScene().add(
        ground.getPlane(),
        lights.getAmbientLight(),
        lights.getDirLight1(),
        lights.getDirLight2()
    );

    objects.push(ground.getPlane());
    window.addEventListener('resize', onWindowResize, false);
    getPositionedPlants();
    animate();
}

// Alle gesetzten Pflanzen von der Datenbank auf die Oberfläche setzen
export function getPositionedPlants() {
    fetch('http://localhost:5000/getAllPositionedPlants')
        .then(response => response.json())
        .then(data => seedPlants(data['data']));

    function seedPlants(data) {
        data.forEach(function ({ plant_link, x_position, y_position, z_position }) {
            let model = new Model();
            model.setModelName('../../models/' + plant_link + '.glb');
            model.getModel().load(model.getModelName(), (gltf) => {
                let mesh = gltf.scene;
                mesh.position.set(x_position, y_position, z_position);
                dbobjects.push(mesh);
                createMesh(mesh);
            });
        });
    }
}

// Der Raycaster baut ein Mapping zwischen Mauszeiger und Position auf der Gartenfläche auf, während man den Mauszeiger bewegt.
export function onPointerMove(event) {

    // Mauszeiger wird auf die 3D Fläche projekziert
    pointer.set((event.clientX / window.innerWidth) * 2 - 1, - (event.clientY / window.innerHeight) * 2 + 1);
    raycaster.setFromCamera(pointer, camera.getCamera());
    const intersects = raycaster.intersectObjects(objects, true);

    /*
     Wenn man sich mit der Maus oberhalb des Speichern- oder Hinzufüge-Button befindet, darf das Objekt nicht angezeigt werden,
     damit es nicht gesetzt wird, wenn man auf den Button klickt.
    */
    if (event.srcElement.id == "garden") {
        mesh.visible = true;
    } else {
        mesh.visible = false;
    }

    if (intersects.length > 0 && !event.shiftKey) {
        const intersect = intersects[0];
        mesh.position.copy(intersect.point).add(intersect.face.normal);

        // Wenn man sich mit dem Mauszeiger oberhalb des Objekt befindet, wird er dunkel markiert.
        if (intersects.length > 1) {
            intersects.forEach(intersect => {
                intersect.object.traverse((child) => {
                    if (child.material && intersect.object.name !== '') {
                        child.material.color.setHex(selectorcolor);
                    }
                });
            });
        }

        /* 
        Wenn man sich mit dem Mauszeiger nicht oberhalb eines Objektes befindet, soll es nicht dunkel markiert werden,
        bzw. es soll weiss bleiben.
        */
        else {
            objects.forEach(obj => {
                obj.traverse((child) => {
                    if (child.material && obj.name !== '') {
                        child.material.color.setHex(0xffffff);
                    }
                });
            });
        }
    }
}

// Objekte werden auf die Gartenfläche gesetzt, wenn es einen Linksmausklick gibt.
export function onPointerDown(event) {
    console.log(event);
    // Mauszeiger wird auf die 3D Fläche projekziert
    pointer.set((event.clientX / window.innerWidth) * 2 - 1, - (event.clientY / window.innerHeight) * 2 + 1);
    raycaster.setFromCamera(pointer, camera.getCamera());
    const intersects = raycaster.intersectObjects(objects, true);

    // Objekte in den Boden setzen
    const floorvec = new THREE.Vector3(0, 4, 0);

    if (intersects.length > 0 && event.button === 0) {
        const intersect = intersects[0];

        // Model auf Boden platzieren
        let model_placed = new Model();
        model_placed.setModelName(obj);

        if (intersects.length > 1) {

            objects.forEach(object => {
                intersects.forEach(intersect => {
                    if (object.uuid == intersect.object.parent.uuid && object !== ground.getPlane()) {
                        objects = objects.filter(obj => obj !== object);
                        scene.getScene().remove(object);
                    }
                });
            });

        } else {
            
            model_placed.getModel().load(model_placed.getModelName(), (gltf) => {
                let mesh_placed = gltf.scene;
                mesh_placed.position.copy(intersect.point).add(intersect.face.normal);
                mesh_placed.position.sub(floorvec);

                //Wenn man auf den Speichern- oder Hinzufüge-Button klickt, darf das Objekt nicht gesetzt werden.
                if (event.srcElement.id == "garden") {
                    scene.getScene().add(mesh_placed);
                    objects.push(mesh_placed);
                }
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