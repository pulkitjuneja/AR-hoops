// import * as THREE from 'three';
// import { ARPerspectiveCamera } from 'three.ar.js';
// import entityManager from './Managers/entityManager';
// import MoveableTorus from './entities/MoveableTorus';
// import renderer from './Managers/Renderer';
// import VRControls from './utils/VRControls';
// import Raycaster from './entities/RayCaster';
// import CubeSpawner from './entities/CubeSpawner';

// let scene;
// let vrControls;

// function buildCamera() {
//   const camera = new ARPerspectiveCamera(
//     renderer.vrDisplay,
//     60,
//     window.innerWidth / window.innerHeight,
//     renderer.vrDisplay.depthNear,
//     renderer.vrDisplay.depthFar
//   );
//   entityManager.mainCamera = camera;
//   vrControls = new VRControls(camera);
// }

// function setupScene() {
//   scene = new THREE.Scene();
//   entityManager.addEntity(new MoveableTorus('torus1', scene, new THREE.Vector3(-1, 0.8, -2.5)));
//   entityManager.addEntity(new MoveableTorus('torus2', scene, new THREE.Vector3(0, 0.2, -2.5)));
//   entityManager.addEntity(new MoveableTorus('torus3', scene, new THREE.Vector3(1, 0.2, -2.5)));
//   entityManager.addEntity(new Raycaster(scene));
//   entityManager.addEntity(new CubeSpawner(scene));
//   scene.add(entityManager.mainCamera);
// }

// function onWindowResize() {
//   entityManager.mainCamera.aspect = window.innerWidth / window.innerHeight;
//   entityManager.mainCamera.updateProjectionMatrix();
//   renderer.renderer.setSize(window.innerWidth, window.innerHeight);
// }

// function addCanvasEventHandlers() {
//   window.addEventListener('resize', onWindowResize, false);
// }

// function update() {
//   entityManager.update();
//   entityManager.mainCamera.updateProjectionMatrix();
//   vrControls.update();
//   renderer.update(scene, entityManager.mainCamera, update);
// }

// function start() {
//   renderer.initRenderer().then((success) => {
//     if (success) {
//       buildCamera();
//       setupScene();
//       addCanvasEventHandlers();
//       update();
//     }
//   });
// }

// start();

import Engine from './Managers/Engine';

const engine = new Engine();
engine.start();
