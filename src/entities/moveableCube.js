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
    this.parentScene = scene;
    this.velocity = new THREE.Vector3();
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
    cube.position.set(0, 0, -4.5);
    scene.add(cube);
    return cube;
  }

  disposeCubeMesh() {
    this.mesh.geometry.dispose();
    this.mesh.material.dispose();
  }

  onTouchEnd(camera) {
    const currentInstance = this;
    return () => {
      THREE.SceneUtils.detach(this.mesh, camera, this.parentScene);
      const direction = new THREE.Vector3(0, 0, -1);
      direction.applyQuaternion(camera.quaternion);
      currentInstance.throw(direction);
      window.setTimeout(() => {
        currentInstance.disposeCubeMesh(currentInstance.parentScene);
      }, 10);
    };
  }

  throw(direction) {
    this.velocity.copy(direction.multiplyScalar(0.2));
  }

  update() {
    console.log(this.velocity.lengthSq());
    if (this.velocity && this.velocity.lengthSq() > 0) {
      console.log(this.velocity.lengthsq);
      this.mesh.translateX(this.velocity.x);
      this.mesh.translateY(this.velocity.y);
      this.mesh.translateZ(this.velocity.z);
    }
  }
}
