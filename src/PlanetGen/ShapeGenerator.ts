import * as THREE from "three";
import ShapeSettings from "../Settings/ShapeSettings";
import { NoiseFilter } from "./NoiseFilter";

export default class ShapeGenerator {
    private _settings: ShapeSettings;
    private _noiseFilter: NoiseFilter;

    constructor(settings: ShapeSettings) {
        this._settings = settings;
        this._noiseFilter = new NoiseFilter();
    }

    public CalculatePointOnPlanet(
        pointOnUnitSphere: THREE.Vector3
    ): THREE.Vector3 {
        const elevation: number = this._noiseFilter.Evaluate(pointOnUnitSphere);
        return pointOnUnitSphere.multiplyScalar(
            this._settings.planetRadius * (1 + elevation)
        );
    }
}
