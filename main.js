import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import { Camera } from './projectfiles/camera';
import { Scene } from './projectfiles/scene';
import { Renderer } from './projectfiles/renderer';

//----------------------- Variablen -----------------------//

let skycolor = 0xb4dbff;


//----------------------- Funktionsaufrufe -----------------------//

init();


//----------------------- Funktionen -----------------------//
// init()
// Erstellt eine initiale Kamera, Szene und Renderer
function init() {
    const camera = new Camera();
    const scene = new Scene(skycolor);
    const renderer = new Renderer();
    renderer.rend(scene.getScene(), camera.getCamera());
}

