import * as THREE from 'three';
import { ARPerspectiveCamera } from 'three.ar.js';
import entityManager from './entityManager';
import MoveableTorus from '../entities/MoveableTorus';
import renderer from './Renderer';
import VRControls from '../utils/VRControls';
import TouchMover from '../entities/TouchMover';
import CubeSpawner from '../entities/CubeSpawner';

export default class Engine {
  start() {
    renderer.initRenderer().then((success) => {
      if (success) {
        this.buildCamera();
        this.setupScene();
        this.startUpdate();
      }
    });
  }

  buildCamera() {
    const camera = new ARPerspectiveCamera(
      renderer.vrDisplay,
      60,
      window.innerWidth / window.innerHeight,
      renderer.vrDisplay.depthNear,
      renderer.vrDisplay.depthFar
    );
    entityManager.mainCamera = camera;
    this.vrControls = new VRControls(camera);
  }

  setupScene() {
    this.scene = new THREE.Scene();
    entityManager.addEntity(new MoveableTorus('torus1', this.scene, new THREE.Vector3(-4, 0.8, -3.5)));
    entityManager.addEntity(new MoveableTorus('torus2', this.scene, new THREE.Vector3(0, 0.2, -3.5)));
    entityManager.addEntity(new MoveableTorus('torus3', this.scene, new THREE.Vector3(4, 0.2, -3.5)));
    entityManager.addEntity(new TouchMover(this.scene));
    entityManager.addEntity(new CubeSpawner(this.scene));
    const light = new THREE.PointLight(0xff0000, 1, 100);
    light.position.set(5, 5, 5);
    this.scene.add(light);
    this.scene.add(entityManager.mainCamera);
  }

  addCanvasEventHandlers() {
    window.addEventListener('resize', this.onWindowResize, false);
  }

  onWindowResize() {
    entityManager.mainCamera.aspect = window.innerWidth / window.innerHeight;
    entityManager.mainCamera.updateProjectionMatrix();
    renderer.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  startUpdate() {
    const currentInstance = this;
    this.update = () => {
      entityManager.update();
      entityManager.mainCamera.updateProjectionMatrix();
      currentInstance.vrControls.update();
      renderer.update(currentInstance.scene, entityManager.mainCamera, currentInstance.update);
    };
    this.update();
  }
}

