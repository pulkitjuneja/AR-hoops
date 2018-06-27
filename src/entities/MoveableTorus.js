import * as THREE from 'three';
import BaseEntity from './BaseEntity';

export default class BasicTorus extends BaseEntity {
  constructor(name, scene, initialPosition) {
    super(name);
    this.mesh = this.getTorusMesh(scene, initialPosition);
    this.mesh.userData.parent = this;
  }
  getTorusMesh(scene, initialPosition) {
    const geometry = new THREE.TorusGeometry(0.4, 0.1, 20, 30);
    const material = new THREE.MeshPhongMaterial({ color: 0xff5643 });
    const torus = new THREE.Mesh(geometry, material);
    torus.position.copy(initialPosition);
    scene.add(torus);
    return torus;
  }

  update() {
    this.mesh.rotateY(0.1);
  }

  dispose() {
    this.mesh.geometry.dispose();
    this.mesh.material.dispose();
    this.mesh.dispose();
  }
}
