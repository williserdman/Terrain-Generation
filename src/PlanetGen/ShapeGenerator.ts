import * as THREE from "three";
import ShapeSettings from "../Settings/ShapeSettings";

export default class ShapeGenerator {
    private _settings: ShapeSettings;

    constructor(settings: ShapeSettings) {
        this._settings = settings;
    }

    public CalculatePointOnPlanet(
        pointOnUnitSphere: THREE.Vector3
    ): THREE.Vector3 {
        return pointOnUnitSphere.multiplyScalar(this._settings.planetRadius);
    }
}
