import * as THREE from "three";

export default class TerrainFace {
    // The mesh object that will be created and modified
    private _mesh: THREE.Mesh;

    // Number of vertices along one side of the terrain face (resolution)
    private _resolution: number;

    // The normal vector pointing up from the face
    private _localUp: THREE.Vector3;

    // Vector representing one axis on the terrain face
    private _axisA: THREE.Vector3;

    // Vector representing the other axis on the terrain face
    private _axisB: THREE.Vector3;

    constructor(mesh: THREE.Mesh, resolution: number, localUp: THREE.Vector3) {
        this._mesh = mesh;
        this._resolution = resolution;
        this._localUp = localUp;

        // Create _axisA by rotating _localUp 90 degrees
        this._axisA = new THREE.Vector3(localUp.y, localUp.z, localUp.x);

        // Create _axisB by taking the cross product of _localUp and _axisA
        this._axisB = new THREE.Vector3().crossVectors(
            this._localUp,
            this._axisA
        );
    }

    public ConstructMesh() {
        // Create a Float32Array to hold vertex positions, with 3 coordinates (x, y, z) per vertex
        const vertices = new Float32Array(this._resolution ** 2 * 3);

        // Array to hold the indices of the triangles
        let triangleIndices: number[] = [];

        let i = 0; // Index counter for vertices array
        for (let y = 0; y < this._resolution; y++) {
            for (let x = 0; x < this._resolution; x++) {
                // Calculate the percentage position within the grid
                let percent = new THREE.Vector2(x, y).divideScalar(
                    this._resolution - 1
                );

                // Calculate the position on the unit cube by adjusting with _axisA and _axisB
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

                // Assign the calculated position to the vertices array
                pointOnUnitCube = pointOnUnitCube.normalize();
                vertices[i * 3] = pointOnUnitCube.x;
                vertices[i * 3 + 1] = pointOnUnitCube.y;
                vertices[i * 3 + 2] = pointOnUnitCube.z;

                i++; // Move to the next vertex position
            }
        }

        // Loop to create triangle indices for the grid
        for (let y = 0; y < this._resolution - 1; y++) {
            for (let x = 0; x < this._resolution - 1; x++) {
                // Calculate the current index in the vertex array
                const currentIndex = y * this._resolution + x;

                // First triangle (bottom left to top right)
                triangleIndices.push(currentIndex);
                triangleIndices.push(currentIndex + this._resolution + 1);
                triangleIndices.push(currentIndex + this._resolution);

                // Second triangle (top right to bottom left)
                triangleIndices.push(currentIndex);
                triangleIndices.push(currentIndex + 1);
                triangleIndices.push(currentIndex + this._resolution + 1);
            }
        }

        // Clear the existing geometry data from the mesh
        this._mesh.geometry.dispose();
        this._mesh.geometry = new THREE.BufferGeometry();

        // Assign the vertex positions to the mesh
        this._mesh.geometry.setAttribute(
            "position",
            new THREE.BufferAttribute(vertices, 3)
        );

        // Convert the triangle indices to a typed array and set them on the mesh
        this._mesh.geometry.setIndex(triangleIndices);

        // Recalculate the vertex normals for lighting and shading
        this._mesh.geometry.computeVertexNormals();
    }
}
