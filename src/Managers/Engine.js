// import * as THREE from 'three';
// import { ARPerspectiveCamera } from 'three.ar.js';
// import entityManager from './entityManager';
// import MoveableTorus from '../entities/MoveableTorus';
// import renderer from './Renderer';
// import VRControls from '../utils/VRControls';
// import Raycaster from '../entities/RayCaster';

// export default class Engine {
//   start() {
//     renderer.initRenderer().then((success) => {
//       if (success) {
//         this.buildCamera();
//         this.setupScene();
//         this.update();
//       }
//     });
//   }

//   buildCamera() {
//     const camera = new ARPerspectiveCamera(
//       renderer.vrDisplay,
//       60,
//       window.innerWidth / window.innerHeight,
//       renderer.vrDisplay.depthNear,
//       renderer.vrDisplay.depthFar
//     );
//     entityManager.mainCamera = camera;
//     this.vrControls = new VRControls(camera);
//     console.log(this.vrControls);
//   }

//   setupScene() {
//     this.scene = new THREE.Scene();
//     entityManager.addEntity(new MoveableTorus('torus1', this.scene, new THREE.Vector3(-1, 0.8, -1.5)));
//     entityManager.addEntity(new MoveableTorus('torus2', this.scene, new THREE.Vector3(0, 0.2, -1.5)));
//     entityManager.addEntity(new MoveableTorus('torus3', this.scene, new THREE.Vector3(1, 0.2, -1.5)));
//     entityManager.addEntity(new Raycaster(this));
//     this.scene.add(entityManager.mainCamera);
//   }

//   addCanvasEventHandlers() {
//     window.addEventListener('resize', this.onWindowResize, false);
//   }

//   onWindowResize() {
//     entityManager.mainCamera.aspect = window.innerWidth / window.innerHeight;
//     entityManager.mainCamera.updateProjectionMatrix();
//     renderer.renderer.setSize(window.innerWidth, window.innerHeight);
//   }

//   update() {
//     entityManager.update();
//     entityManager.mainCamera.updateProjectionMatrix();
//     console.log(this.vrControls);
//     this.vrControls.update();
//     renderer.update(this.scene, entityManager.mainCamera, this.update);
//   }
// }

