import * as THREE from "three";

export class TerrainFace {
    // the mesh
    private _mesh: THREE.Mesh;

    // how many squared along one side
    private _resolution: number;

    // normal vector
    private _localUp: THREE.Vector3;

    // one axis
    private _axisA: THREE.Vector3;

    // the other axis
    private _axisB: THREE.Vector3;

    constructor(mesh: THREE.Mesh, resolution: number, localUp: THREE.Vector3) {
        this._mesh = mesh;
        this._resolution = resolution;
        this._localUp = localUp;

        this._axisA = new THREE.Vector3(localUp.y, localUp.z, localUp.x);
        this._axisB = localUp.cross(this._axisA);
    }

    public ConstructMesh() {
        let vertices: THREE.Vector3[] = [];
        let triangleIndices: number[] = [];
        let triangleIndex = 0;

        for (let y = 0; y < this._resolution; y++) {
            for (let x = 0; x < this._resolution; x++) {
                let i = x + y * this._resolution;

                // can track where in the mesh we are / how close to complete loops
                let percent = new THREE.Vector2(x, y).divideScalar(
                    this._resolution - 1
                );

                let pointOnUnitCube = this._localUp
                    // percent.x between 0 and 1. this converts to between -1 and 1 (to cover an entire face). same for y
                    .add(this._axisA.multiplyScalar((percent.x - 0.5) * 2))
                    .add(this._axisB.multiplyScalar((percent.y - 0.5) * 2));

                vertices.push(pointOnUnitCube);

                // current vertex not in bottom or right edges
                if (x != this._resolution - 1 && y != this._resolution - 1) {
                    // first triangle
                    triangleIndices.push(i);
                    triangleIndices.push(i + this._resolution + 1);
                    triangleIndices.push(i + this._resolution);

                    // second triangle
                    triangleIndices.push(i);
                    triangleIndices.push(i + 1);
                    triangleIndices.push(i + this._resolution);
                }
            }
        }

        // clearning all data from mesh so that we can downc
        this._mesh.geometry.dispose();
        this._mesh.geometry = new THREE.BufferGeometry();

        // assign vertices to mesh..
        this._mesh.geometry.setAttribute(
            "position",
            new THREE.BufferAttribute(vertices as any, 3)
        );

        // setting the triangles according to our index
        this._mesh.geometry.setIndex(triangleIndices);

        // recalculating the normals
        this._mesh.geometry.computeVertexNormals();
    }
}
