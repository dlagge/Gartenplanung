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
let deleteButtonClicked = false;
let objects = [];
let plantobjects = [];
let intersectSavedArr = [];


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

    let model = new Model();
    model.setModelName('../../models/empty.glb');
    model.getModel().load(model.getModelName(), (gltf) => {
        let mesh = gltf.scene;
        createMesh(mesh);
    });
    createModel('./models/empty.glb');

    scene.getScene().add(
        ground.getPlane(),
        lights.getAmbientLight(),
        lights.getDirLight1(),
        lights.getDirLight2()
    );

    objects.push(ground.getPlane());

    // listeners
    // document.addEventListener('pointermove', onPointerMove);
    // document.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('resize', onWindowResize, false);

    animate();
    getPositionedPlants();
}

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
                createMesh(mesh);
                // pushObject(mesh);
            });
            //  createModel('./models/' + plant_link + '.glb');
        });
    }
}

// Der Raycaster baut ein Mapping zwischen Mauszeiger und Position auf der Gartenfläche auf.
export function onPointerMove(event) {
    pointer.set((event.clientX / window.innerWidth) * 2 - 1, - (event.clientY / window.innerHeight) * 2 + 1);
    raycaster.setFromCamera(pointer, camera.getCamera());
    const intersects = raycaster.intersectObjects(objects, true);

    if (event.srcElement.id == "finishButton" || event.srcElement.id == "popupButton") {
        mesh.visible = false;
    } else {
        mesh.visible = true;
    }

    /*
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
        
        
    }
    */
    // Model auf dem Boden anzeigen
    if (intersects.length > 0) {
        const intersect = intersects[0];
        mesh.position.copy(intersect.point).add(intersect.face.normal);
    }


}

// Objekte werden auf die Gartenfläche gesetzt, wenn es einen Linksmausklick gibt
export function onPointerDown(event) {

    pointer.set((event.clientX / window.innerWidth) * 2 - 1, - (event.clientY / window.innerHeight) * 2 + 1);
    raycaster.setFromCamera(pointer, camera.getCamera());
    const intersects = raycaster.intersectObjects(objects, true);

    // Objekte in den Boden setzen
    const floorvec = new THREE.Vector3(0, 4, 0);

    /*
    if (deleteButtonClicked) {
        intersectSavedArr.forEach(intersectelement => {
            objects = objects.filter(obj => obj !== intersectelement);
            scene.getScene().remove(intersectelement);
        });
        deleteButtonClicked = false;
    }
    */

    /*
        if (intersects.length > 0 && event.button === 0) {
            const intersect = intersects[0];
    
            // Model auf Boden platzieren
            let model_placed = new Model();
            model_placed.setModelName(obj);
    
            if (intersects.length > 1) {
    
                objects.forEach(object => {
                    intersects.forEach(intersect => {
                        if (model_placed.getModelName() !== './models/empty.glb' && object.uuid == intersect.object.parent.uuid && object !== ground.getPlane()) {
                            objects = objects.filter(obj => obj !== object);
                            scene.getScene().remove(object);
                        }
    
                        if (model_placed.getModelName() === './models/empty.glb' && object.uuid == intersect.object.parent.uuid && object !== ground.getPlane()) {
                            let plantpopup = new PlantPopup();
                            plantpopup.createPopup();
                            document.getElementById('PlantPopupTitle').innerHTML = intersect.object.name;
                            intersectSavedArr.push(object);
                        }
                    });
                });
            } else {
                model_placed.getModel().load(model_placed.getModelName(), (gltf) => {
                    let mesh_placed = gltf.scene;
                    mesh_placed.position.copy(intersect.point).add(intersect.face.normal);
                    mesh_placed.position.sub(floorvec);
                    if (event.srcElement.id == "finishButton" || event.srcElement.id == "popupButton") {
                        mesh_placed = null;
                    }
                    scene.getScene().add(mesh_placed);
                    objects.push(mesh_placed);
                });
            }
        }
    
        */

    if (intersects.length > 0 && event.button === 0) {
        const intersect = intersects[0];

        // Model auf Boden platzieren
        let model_placed = new Model();
        model_placed.setModelName(obj);

        model_placed.getModel().load(model_placed.getModelName(), (gltf) => {
            let mesh_placed = gltf.scene;
            mesh_placed.position.copy(intersect.point).add(intersect.face.normal);
            mesh_placed.position.sub(floorvec);
            if (event.srcElement.id == "finishButton" || event.srcElement.id == "popupButton") {
                mesh_placed = null;
            }
            scene.getScene().add(mesh_placed);
            objects.push(mesh_placed);
        });

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