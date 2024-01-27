import { Camera } from './projectfiles/init/camera';
import { Scene } from './projectfiles/init/scene';
import { Renderer } from './projectfiles/init/renderer';
import { Controls } from './projectfiles/init/controls';
import { Lights } from './projectfiles/garden/lights';
import { Plane } from './projectfiles/garden/plane';
import { Model } from './projectfiles/garden/model';


//----------------------- Variablen -----------------------//

let skycolor = 0xb4dbff;
let groundcolor = 0xedae87;
let camera, scene, renderer, ground, controls, lights, model;
let objects = [];


//----------------------- Funktionsaufrufe -----------------------//

init();
createGarden();

//----------------------- Funktionen -----------------------//
// init()
// Erstellt eine initiale Kamera, Szene und Renderer
function init() {
    camera = new Camera();
    scene = new Scene(skycolor);
    renderer = new Renderer();
    controls = new Controls(camera.getCamera(), renderer.getRenderer().domElement);
}

function createGarden() {
    lights = new Lights();
    lights.setHemiLight();
    lights.setAmbientLight();
    lights.setDirectionalLight();
    ground = new Plane(groundcolor);
    model = new Model('./models/karotte.glb');
    model.getModel().load(model.getModelName(), (gltf) => {
        let mesh = gltf.scene;
        mesh.scale.set( 1.5, 1.5, 1.5 );
        scene.getScene().add(mesh);
    });
    scene.getScene().add(ground.getPlane(), lights.getHemiLight(), lights.getAmbientLight(), lights.getDirectionalLight());
    objects.push(ground.getPlane());

    animate();
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    renderer.rend(scene.getScene(), camera.getCamera());
}

