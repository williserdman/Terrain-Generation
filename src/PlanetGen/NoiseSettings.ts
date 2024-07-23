import * as THREE from "three";

export default class NoiseSettings {
    public strength = 0.2;
    public baseRoughness = 0.8;
    public roughness = 2;
    public numLayers = 6;
    public center: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
    public persistance = 0.5; // amplitude of noise

    public minValue = 1;

    constructor() {}
}
