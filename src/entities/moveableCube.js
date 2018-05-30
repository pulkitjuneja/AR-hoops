import * as THREE from 'three';

const colors = [
  new THREE.Color(0xffffff),
  new THREE.Color(0xffff00),
  new THREE.Color(0xff00ff),
  new THREE.Color(0xff0000),
  new THREE.Color(0x00ffff),
  new THREE.Color(0x00ff00),
  new THREE.Color(0x0000ff),
  new THREE.Color(0x000000)
];

const BOX_SIZE = 0.2;

export default class MoveableCube {
  constructor(scene) {
    this.name = 'cube';
    this.wasMoved = false;
    this.mesh = this.getCubeMesh(scene);
    this.mesh.userData.parent = this;
  }
  getCubeMesh(scene) {
    const geometry = new THREE.BoxGeometry(BOX_SIZE, BOX_SIZE, BOX_SIZE);
    const faceIndices = ['a', 'b', 'c'];
    for (let i = 0; i < geometry.faces.length; i += 1) {
      const f = geometry.faces[i];
      for (let j = 0; j < 3; j += 1) {
        const vertexIndex = f[faceIndices[j]];
        f.vertexColors[j] = colors[vertexIndex];
      }
    }
    geometry.translate(0, BOX_SIZE / 2, 0);
    const material = new THREE.MeshBasicMaterial({ vertexColors: THREE.VertexColors });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(0, 0, -1.5);
    scene.add(cube);
    return cube;
  }

  update() {
    console.log('here');
  }
}
