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

export default class ThrowableSphere extends baseEntity {
  constructor(name, scene) {
    super(name);
    this.wasMoved = false;
    this.scene = scene;
    this.mesh = this.getSphereMesh();
    this.mesh.userData.parent = this;
    this.velocity = new THREE.Vector3();
    this.setupTouchEnd();
  }
  getSphereMesh() {
    const geometry = new THREE.SphereGeometry(0.4);
    geometry.translate(0, BOX_SIZE / 2, 0);
    const material = new THREE.MeshPhongMaterial({ color: 0xffff67 });
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
