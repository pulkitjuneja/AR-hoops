import * as THREE from 'three';
import { ARUtils, ARPerspectiveCamera, ARView, ARDebug, ARAnchorManager } from 'three.ar.js';
import VRControls from './utils/VRControls';
import MoveableCube from './entities/moveableCube';
import MoveableTorus from './entities/MoveableTorus';

let vrDisplay;
let vrControls;
let arView;

let canvas;
let camera;
let scene;
let renderer;
let arAnchorManager;
const gameEntities = [];
const raycaster = new THREE.Raycaster();

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onTouchStart(e) {
  if (!e.touches[0]) {
    return;
  }
  console.log('touch start');

  const x = ((e.touches[0].pageX / window.innerWidth) * 2) - 1;
  const y = (-(e.touches[0].pageY / window.innerHeight) * 2) + 1;

  const mouse = new THREE.Vector2(x, y);
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children);

  intersects.forEach((intersection) => {
    const mesh = intersection.object;
    mesh.userData.parent.wasMoved = true;
    THREE.SceneUtils.attach(mesh, scene, camera);
  });
}

function onTouchEnd() {
  console.log('touch end');
  gameEntities.forEach((entity) => {
    if (entity.wasMoved) {
      THREE.SceneUtils.detach(entity.mesh, camera, scene);
      // camera.remove(entity.mesh);
      // const meshWorldPosition = camera.localToWorld(entity.mesh.position);
      // scene.add(entity.mesh);
      // entity.mesh.position.copy(meshWorldPosition);
      entity.wasMoved = false;
    }
  });
}

function update() {
  gameEntities.forEach((entity) => {
    entity.update();
  });

  renderer.clearColor();
  arView.render();

  camera.updateProjectionMatrix();
  vrControls.update();
  renderer.clearDepth();
  renderer.render(scene, camera);
  vrDisplay.requestAnimationFrame(update);
}

function init() {
  // Turn on the debugging panel
  arAnchorManager = new ARAnchorManager(vrDisplay);

  arAnchorManager.addEventListener('anchorsupdated', (e) => {
    e.anchors.forEach(obj => console.log('updated', obj));
  });

  const arDebug = new ARDebug(vrDisplay);
  document.body.appendChild(arDebug.getElement());

  // Setup the three.js rendering environment
  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.autoClear = false;
  canvas = renderer.domElement;
  document.body.appendChild(canvas);
  scene = new THREE.Scene();

  arView = new ARView(vrDisplay, renderer);
  camera = new ARPerspectiveCamera(
    vrDisplay,
    60,
    window.innerWidth / window.innerHeight,
    vrDisplay.depthNear,
    vrDisplay.depthFar
  );

  gameEntities.push(new MoveableCube(scene));
  gameEntities.push(new MoveableTorus(scene, new THREE.Vector3(0, 0.2, -1.5)));
  gameEntities.push(new MoveableTorus(scene, new THREE.Vector3(-1, 0.8, -1.5)));
  gameEntities.push(new MoveableTorus(scene, new THREE.Vector3(1, 0.2, -1.5)));
  vrControls = new VRControls(camera);
  scene.add(camera);

  window.addEventListener('resize', onWindowResize, false);
  canvas.addEventListener('touchstart', onTouchStart, false);
  canvas.addEventListener('touchend', onTouchEnd, false);

  update();
}

ARUtils.getARDisplay().then((display) => {
  if (display) {
    vrDisplay = display;
    init();
  } else {
    ARUtils.displayUnsupportedMessage();
  }
});
