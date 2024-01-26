import { Camera } from './projectfiles/init/camera';
import { Scene } from './projectfiles/init/scene';
import { Renderer } from './projectfiles/init/renderer';
import { Controls } from './projectfiles/init/controls';
import { Plane } from './projectfiles/garden/plane';


//----------------------- Variablen -----------------------//

let skycolor = 0xb4dbff;
let camera, scene, renderer, ground, controls;
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
    ground = new Plane(0xedae87);
    scene.getScene().add(ground.getPlane());
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

