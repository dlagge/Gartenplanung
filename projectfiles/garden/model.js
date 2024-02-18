import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export class Model {
    constructor() {
        this.model = new GLTFLoader();
    }

    setModelName(modelname) {
        this.modelname = modelname;
    }

    getModel() {
        return this.model;
    }

    getModelName() {
        return this.modelname;
    }
}