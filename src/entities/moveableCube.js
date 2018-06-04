import * as THREE from 'three';
import baseEntity from './baseEntity';
import renderer from '../Managers/Renderer';
import entityManager from '../Managers/entityManager';

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

export default class MoveableCube extends baseEntity {
  constructor(name, scene) {
    super(name);
    this.wasMoved = false;
    this.scene = scene;
    this.mesh = this.getCubeMesh();
    this.mesh.userData.parent = this;
    this.velocity = new THREE.Vector3();
    this.setupTouchEnd();
  }
  getCubeMesh() {
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
    this.scene.add(cube);
    return cube;
  }

  dispose() {
    this.mesh.geometry.dispose();
    this.mesh.material.dispose();
    this.mesh.dispose();
    renderer.canvas.removeEventListener('touchend', this.onTouchEnd);
  }

  setupTouchEnd() {
    const currentInstance = this;
    this.onTouchEnd = () => {
      THREE.SceneUtils.detach(this.mesh, entityManager.mainCamera, this.scene);
      const direction = new THREE.Vector3();
      entityManager.mainCamera.getWorldDirection(direction);
      currentInstance.throw(direction);
    };
    renderer.canvas.addEventListener('touchend', this.onTouchEnd, false);
  }

  throw(direction) {
    direction.normalize();
    this.velocity.copy(direction.multiplyScalar(0.2));
  }

  update() {
    if (this.velocity && this.velocity.lengthSq() > 0) {
      this.mesh.translateX(this.velocity.x);
      this.mesh.translateY(this.velocity.y);
      this.mesh.translateZ(this.velocity.z);
    }
  }
}
