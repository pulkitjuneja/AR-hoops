import * as THREE from 'three';
import { ARUtils, ARView } from 'three.ar.js';

class Renderer {
  constructor() {
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
  }

  initRenderer() {
    return ARUtils.getARDisplay().then((display) => {
      if (display) {
        this.vrDisplay = display;
        this.setupRenderer();
        return true;
      }
      ARUtils.displayUnsupportedMessage();
      return false;
    });
  }

  setupRenderer() {
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.autoClear = false;
    this.canvas = this.renderer.domElement;
    document.body.appendChild(this.canvas);
    this.arView = new ARView(this.vrDisplay, this.renderer);
  }

  update(scene, camera, updateCallback) {
    this.renderer.clearColor();
    this.arView.render();
    this.renderer.clearDepth();
    this.renderer.render(scene, camera);
    this.vrDisplay.requestAnimationFrame(updateCallback);
  }
}

export default new Renderer();

