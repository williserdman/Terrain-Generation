import { createNoise3D } from "simplex-noise";
import * as THREE from "three";

export class NoiseFilter {
    private noise = createNoise3D();

    constructor() {}

    public Evaluate(point: THREE.Vector3) {
        const noiseValue = (this.noise(point.x, point.y, point.z) + 1) * 0.5;

        return noiseValue;
    }
}
