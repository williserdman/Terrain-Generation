import * as THREE from "three";
import ShapeSettings from "../Settings/ShapeSettings";
import { NoiseFilter } from "./NoiseFilter";

export default class ShapeGenerator {
    private _settings: ShapeSettings;
    private _noiseFilters: NoiseFilter[];

    constructor(settings: ShapeSettings) {
        this._settings = settings;
        this._noiseFilters = [];
        for (let i = 0; i < this._settings.noiseLayers.length; i++) {
            this._noiseFilters.push(
                new NoiseFilter(this._settings.noiseLayers[i].noiseSettings)
            );
        }
    }

    public CalculatePointOnPlanet(
        pointOnUnitSphere: THREE.Vector3
    ): THREE.Vector3 {
        let elevation = 0;
        for (let i = 0; i < this._noiseFilters.length; i++) {
            if (this._settings.noiseLayers[i].enabled) {
                elevation += this._noiseFilters[i].Evaluate(pointOnUnitSphere);
            }
        }

        return pointOnUnitSphere.multiplyScalar(
            this._settings.planetRadius * (1 + elevation)
        );
    }
}
