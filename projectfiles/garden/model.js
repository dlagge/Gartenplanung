import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export class Model {
    constructor(modelname) {
        this.modelname = modelname;
        this.model = new GLTFLoader();
    }

    getModel() {
        return this.model;
    }

    getModelName() {
        return this.modelname;
    }
}