import * as THREE from 'three';
import { vertex, fragment } from '../shaders/normalShader';
import gameClock from '../utils/gameClock';
import baseEntity from './baseEntity';

export default class MoveableTorus extends baseEntity {
  constructor(name, scene, initialPosition) {
    super(name);
    this.wasMoved = false;
    this.shaderUniforms = this.getInitialUniforms();
    this.mesh = this.getTorusMesh(scene, initialPosition);
    this.mesh.userData.parent = this;
  }
  getTorusMesh(scene, initialPosition) {
    const geometry = new THREE.TorusGeometry(0.4, 0.1, 20, 30);
    const material = new THREE.ShaderMaterial({
      uniforms: this.shaderUniforms,
      vertexShader: vertex,
      fragmentShader: fragment
    });
    const torus = new THREE.Mesh(geometry, material);
    torus.position.copy(initialPosition);
    scene.add(torus);
    return torus;
  }

  getInitialUniforms() {
    return {
      time: { type: 'f', value: 0 }
    };
  }

  dispose() {
    this.mesh.geometry.dispose();
    this.mesh.material.dispose();
    this.mesh.dispose();
  }

  update() {
    this.shaderUniforms.time.value = gameClock.getElapsedTime() % 1;
  }
}
