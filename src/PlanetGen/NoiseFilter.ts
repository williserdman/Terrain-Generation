import { createNoise3D } from "simplex-noise";
import * as THREE from "three";
import NoiseSettings from "./NoiseSettings";

export class NoiseFilter {
    private _noise = createNoise3D();
    private _noiseSettings: NoiseSettings;

    constructor(noiseSettings: NoiseSettings) {
        this._noiseSettings = noiseSettings;
    }

    public Evaluate(point: THREE.Vector3) {
        /*         const convertedPoint = point.clone();
        convertedPoint
            .multiplyScalar(this._noiseSettings.roughness)
            .add(this._noiseSettings.center);

        const noiseValue =
            (this._noise(convertedPoint.x, convertedPoint.y, convertedPoint.z) +
                1) *
            0.5; */

        let noiseValue = 0;
        let frequency = this._noiseSettings.baseRoughness;
        let amplitude = 1;

        for (let i = 0; i < this._noiseSettings.numLayers; i++) {
            const convertedPoint = point.clone();
            convertedPoint
                .multiplyScalar(frequency)
                .add(this._noiseSettings.center);
            const v = this._noise(
                convertedPoint.x,
                convertedPoint.y,
                convertedPoint.z
            );

            noiseValue += (v + 1) * 0.5 * amplitude;

            // when roughness > 1 freq will increase (detail)
            frequency *= this._noiseSettings.roughness;
            // when persistance < 1 amp will decrease (strength)
            amplitude *= this._noiseSettings.persistance;
        }

        return noiseValue * this._noiseSettings.strength;
    }
}
