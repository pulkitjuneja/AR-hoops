import * as THREE from 'three';
import { vertex, fragment } from '../shaders/normalShader';
import gameClock from '../utils/gameClock';

export default class MoveableTorus {
  constructor(scene, initialPosition) {
    this.name = 'sphere';
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

  update() {
    this.shaderUniforms.time.value = gameClock.getElapsedTime() % 100;
  }
}
