import * as THREE from 'three';
import baseEntity from './baseEntity';
import renderer from '../Managers/Renderer';
import entityManager from '../Managers/entityManager';

export default class Raycaster extends baseEntity {
  constructor(scene) {
    super('raycCaster');
    this.scene = scene;
    this.rayCaster = new THREE.Raycaster();
    this.setupTouchStart();
    this.setupOnTouchEnd();
  }

  setupTouchStart() {
    const currentInstance = this;
    this.onTouchStart = (e) => {
      if (!e.touches[0]) {
        return;
      }
      if (e.touches.length === 1) {
        const x = ((e.touches[0].pageX / window.innerWidth) * 2) - 1;
        const y = (-(e.touches[0].pageY / window.innerHeight) * 2) + 1;
        const mouse = new THREE.Vector2(x, y);
        currentInstance.rayCaster.setFromCamera(mouse, entityManager.mainCamera);
        const intersects = currentInstance.rayCaster.intersectObjects(currentInstance.scene.children);
        intersects.forEach((intersection) => {
          const mesh = intersection.object;
          mesh.userData.parent.wasMoved = true;
          THREE.SceneUtils.attach(mesh, currentInstance.scene, entityManager.mainCamera);
        });
      }
    };
    renderer.canvas.addEventListener('touchstart', this.onTouchStart, false);
  }

  setupOnTouchEnd() {
    const currentInstance = this;
    this.onTouchEnd = () => {
      entityManager.getAllEntities().forEach((entity) => {
        if (entity.wasMoved) {
          THREE.SceneUtils.detach(
            entity.mesh,
            entityManager.mainCamera,
            currentInstance.scene
          );
          entity.wasMoved = false;
        }
      });
    };
    renderer.canvas.addEventListener('touchend', this.onTouchEnd, false);
  }

  dispose() {
    renderer.canvas.removeEventListener('touchstart', this.onTouchStart);
    renderer.canvas.removeEventListener('touchend', this.onTouchEnd);
  }
}
