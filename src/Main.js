// import * as THREE from 'three';
// import { ARPerspectiveCamera, ARDebug, ARAnchorManager } from 'three.ar.js';
// import VRControls from './utils/VRControls';
// // import MoveableCube from './entities/moveableCube';
// // import MoveableTorus from './entities/MoveableTorus';
// import renderer from './Managers/Renderer';
// import entityManager from './Managers/entityManager';

// let vrControls;
// let camera;
// let scene;
// let arAnchorManager;
// const raycaster = new THREE.Raycaster();

// function onWindowResize() {
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();
//   renderer.renderer.setSize(window.innerWidth, window.innerHeight);
// }

// function onTouchStart(e) {
//   if (!e.touches[0]) {
//     return;
//   }
//   if (e.touches.length > 1) {
//     const throwableCube = new MoveableCube(scene);
//     renderer.canvas.addEventListener('touchend', throwableCube.onTouchEnd(camera), false);
//     camera.add(throwableCube.mesh);
//     gameEntities.push(throwableCube);
//   } else {
//     const x = ((e.touches[0].pageX / window.innerWidth) * 2) - 1;
//     const y = (-(e.touches[0].pageY / window.innerHeight) * 2) + 1;

//     const mouse = new THREE.Vector2(x, y);
//     raycaster.setFromCamera(mouse, camera);
//     const intersects = raycaster.intersectObjects(scene.children);

//     intersects.forEach((intersection) => {
//       const mesh = intersection.object;
//       mesh.userData.parent.wasMoved = true;
//       THREE.SceneUtils.attach(mesh, scene, camera);
//     });
//   }
// }

// function onTouchEnd() {
//   gameEntities.forEach((entity) => {
//     if (entity.wasMoved) {
//       THREE.SceneUtils.detach(entity.mesh, camera, scene);
//       entity.wasMoved = false;
//     }
//   });
// }

// function update() {
//   entityManager.update();
//   camera.updateProjectionMatrix();
//   vrControls.update();
//   renderer.update(scene, camera, update);
// }

// const setupScene = () => {
//   scene = new THREE.Scene();

//   camera = new ARPerspectiveCamera(
//     renderer.vrDisplay,
//     60,
//     window.innerWidth / window.innerHeight,
//     renderer.vrDisplay.depthNear,
//     renderer.vrDisplay.depthFar
//   );
//   vrControls = new VRControls(camera);
//   scene.add(camera);
// };

// const addCanvasEventHandlers = () => {
//   window.addEventListener('resize', onWindowResize, false);
//   renderer.canvas.addEventListener('touchstart', onTouchStart, false);
//   renderer.canvas.addEventListener('touchend', onTouchEnd, false);
// };

// const init = () => {
//   renderer.initRenderer().then((success) => {
//     if (success) {
//       // arAnchorManager = new ARAnchorManager(renderer.vrDisplay);

//       // arAnchorManager.addEventListener('anchorsupdated', (e) => {
//       //   e.anchors.forEach(obj => console.log('updated', obj));
//       // });
//       // const arDebug = new ARDebug(renderer.vrDisplay);
//       // document.body.appendChild(arDebug.getElement());
//       setupScene();
//       addCanvasEventHandlers();
//       update();
//     }
//   });
// };


// init();

import * as THREE from 'three';
import { ARPerspectiveCamera } from 'three.ar.js';
import entityManager from './Managers/entityManager';
import MoveableTorus from './entities/MoveableTorus';
import renderer from './Managers/Renderer';
import VRControls from './utils/VRControls';
import Raycaster from './entities/RayCaster';
import CubeSpawner from './entities/CubeSpawner';

let scene;
let vrControls;

function buildCamera() {
  const camera = new ARPerspectiveCamera(
    renderer.vrDisplay,
    60,
    window.innerWidth / window.innerHeight,
    renderer.vrDisplay.depthNear,
    renderer.vrDisplay.depthFar
  );
  entityManager.mainCamera = camera;
  vrControls = new VRControls(camera);
}

function setupScene() {
  scene = new THREE.Scene();
  entityManager.addEntity(new MoveableTorus('torus1', scene, new THREE.Vector3(-1, 0.8, -2.5)));
  entityManager.addEntity(new MoveableTorus('torus2', scene, new THREE.Vector3(0, 0.2, -2.5)));
  entityManager.addEntity(new MoveableTorus('torus3', scene, new THREE.Vector3(1, 0.2, -2.5)));
  entityManager.addEntity(new Raycaster(scene));
  entityManager.addEntity(new CubeSpawner(scene));
  scene.add(entityManager.mainCamera);
}

function onWindowResize() {
  entityManager.mainCamera.aspect = window.innerWidth / window.innerHeight;
  entityManager.mainCamera.updateProjectionMatrix();
  renderer.renderer.setSize(window.innerWidth, window.innerHeight);
}

function addCanvasEventHandlers() {
  window.addEventListener('resize', onWindowResize, false);
}

function update() {
  entityManager.update();
  entityManager.mainCamera.updateProjectionMatrix();
  vrControls.update();
  renderer.update(scene, entityManager.mainCamera, update);
}

function start() {
  renderer.initRenderer().then((success) => {
    if (success) {
      buildCamera();
      setupScene();
      addCanvasEventHandlers();
      update();
    }
  });
}

start();
