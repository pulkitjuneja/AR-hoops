import BaseEntity from './BaseEntity';
import ThrowableSphere from './ThrowableSphere';
import renderer from '../Managers/Renderer';
import entityManager from '../Managers/EntityManager';


export default class CubeSpawner extends BaseEntity {
  constructor(scene) {
    super('cubeSpawner');
    this.scene = scene;
    this.setupTouchStart();
    CubeSpawner.cubeCount = 0;
  }

  setupTouchStart() {
    const currentInstance = this;
    this.onTouchStart = (e) => {
      if (!e.touches[0]) {
        return;
      }
      if (e.touches.length > 1) {
        const name = `cube${CubeSpawner.cubeCount}`;
        const throwableCube = new ThrowableSphere(name, currentInstance.scene);
        entityManager.mainCamera.add(throwableCube.mesh);
        entityManager.addEntity(throwableCube);
        CubeSpawner.cubeCount += 1;
      }
    };
    renderer.canvas.addEventListener('touchstart', this.onTouchStart, false);
  }

  dispose() {
    renderer.canvas.removeEventListener('touchstart', this.onTouchStart);
  }
}
