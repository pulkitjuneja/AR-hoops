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


export default class MoveableSphere {
  constructor(scene) {
    this.name = 'sphere';
    this.wasMoved = false;
    this.mesh = this.getSphereMesh(scene);
    this.mesh.userData.parent = this;
  }
  getSphereMesh(scene) {
    const geometry = new THREE.SphereGeometry(0.2);
    const material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(0, 0.4, -1.5);
    scene.add(sphere);
    return sphere;
  }

  update() {
    console.log('here');
  }
}
