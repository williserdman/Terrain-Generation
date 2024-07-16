import * as THREE from "three";

export class TerrainFace {
    private _mesh: THREE.Mesh;
    private _resolution: number;
    private _localUp: THREE.Vector3;
    private _axisA: THREE.Vector3;
    private _axisB: THREE.Vector3;

    constructor(mesh: THREE.Mesh, resolution: number, localUp: THREE.Vector3) {
        this._mesh = mesh;
        this._resolution = resolution;
        this._localUp = localUp;

        this._axisA = new THREE.Vector3(localUp.y, localUp.z, localUp.x);
        this._axisB = new THREE.Vector3().crossVectors(
            this._localUp,
            this._axisA
        );
    }

    public ConstructMesh() {
        const vertexCount = this._resolution * this._resolution;
        const vertices = new Float32Array(vertexCount * 3);
        const indices: number[] = [];

        let i = 0;
        for (let y = 0; y < this._resolution; y++) {
            for (let x = 0; x < this._resolution; x++) {
                let percent = new THREE.Vector2(x, y).divideScalar(
                    this._resolution - 1
                );

                let pointOnUnitCube = new THREE.Vector3()
                    .copy(this._localUp)
                    .add(
                        this._axisA
                            .clone()
                            .multiplyScalar((percent.x - 0.5) * 2)
                    )
                    .add(
                        this._axisB
                            .clone()
                            .multiplyScalar((percent.y - 0.5) * 2)
                    );

                vertices[i * 3] = pointOnUnitCube.x;
                vertices[i * 3 + 1] = pointOnUnitCube.y;
                vertices[i * 3 + 2] = pointOnUnitCube.z;
                i++;
            }
        }

        for (let y = 0; y < this._resolution - 1; y++) {
            for (let x = 0; x < this._resolution - 1; x++) {
                const currentIndex = y * this._resolution + x;
                indices.push(currentIndex);
                indices.push(currentIndex + this._resolution + 1);
                indices.push(currentIndex + this._resolution);

                indices.push(currentIndex);
                indices.push(currentIndex + 1);
                indices.push(currentIndex + this._resolution + 1);
            }
        }

        console.log(`Vertex count: ${vertexCount}`);
        console.log(`Vertices length: ${vertices.length}`);
        console.log(`Indices length: ${indices.length}`);

        this._mesh.geometry.dispose();
        this._mesh.geometry = new THREE.BufferGeometry();

        this._mesh.geometry.setAttribute(
            "position",
            new THREE.BufferAttribute(vertices, 3)
        );

        const indexArray =
            indices.length > 65535
                ? new Uint32Array(indices)
                : new Uint16Array(indices);
        this._mesh.geometry.setIndex(new THREE.BufferAttribute(indexArray, 1));

        this._mesh.geometry.computeVertexNormals();
    }
}
