import NoiseSettings from "../PlanetGen/NoiseSettings";

export default class ShapeSettings {
    public planetRadius = 20;
    public noiseLayers: NoiseLayer[];

    constructor() {
        this.noiseLayers = [new NoiseLayer()];
    }
}

export class NoiseLayer {
    public noiseSettings = new NoiseSettings();
    public enabled = true;

    constructor() {}
}
