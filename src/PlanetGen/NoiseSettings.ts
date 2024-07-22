import * as THREE from "three";

export default class NoiseSettings {
    public strength = 1;
    public baseRoughness = 1;
    public roughness = 2;
    public numLayers = 6;
    public center: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
    public persistance = 0.5; // amplitude of noise

    constructor() {}
}
