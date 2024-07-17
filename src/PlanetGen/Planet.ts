// will create six terrain faces and tell them which direciton they're facing
import * as THREE from "three";
import TerrainFace from "./TerrainFace";

export default class Planet {
    public resolution = 10;

    private _meshes: THREE.Mesh[];
    private _terrainFace: TerrainFace[];
    private _scene: THREE.Scene;

    constructor(scene: THREE.Scene) {
        this._meshes = [];
        this._terrainFace = [];
        this._scene = scene;

        // all six cardinal directions
        let directions = [
            new THREE.Vector3(-1, 0, 0), //left
            new THREE.Vector3(1, 0, 0), //right
            new THREE.Vector3(0, -1, 0), //down
            new THREE.Vector3(0, 1, 0), //up
            new THREE.Vector3(0, 0, 1), //forward
            new THREE.Vector3(0, 0, -1), //back
        ];

        // for each face on the cube
        for (let i = 0; i < 6; i++) {
            let mesh = new THREE.Mesh(
                new THREE.BufferGeometry(),
                new THREE.MeshStandardMaterial({ wireframe: false })
            );

            this._meshes.push(mesh);

            this._terrainFace.push(
                new TerrainFace(mesh, this.resolution, directions[i])
            );
        }

        this._GenerateMesh();
    }

    _GenerateMesh(): void {
        this._terrainFace.forEach((element, index) => {
            element.ConstructMesh();
            this._scene.add(this._meshes[index]);
        });
    }
}
