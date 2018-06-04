import baseEntity from './baseEntity';
import MoveableCube from './moveableCube';
import renderer from '../Managers/Renderer';
import entityManager from '../Managers/entityManager';


export default class CubeSpawner extends baseEntity {
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
        const throwableCube = new MoveableCube(name, currentInstance.scene);
        entityManager.mainCamera.add(throwableCube.mesh);
        entityManager.addEntity(throwableCube);
        CubeSpawner.cubeCount += 1;
        console.log(entityManager);
      }
    };
    renderer.canvas.addEventListener('touchstart', this.onTouchStart, false);
  }

  dispose() {
    renderer.canvas.removeEventListener('touchstart', this.onTouchStart);
  }
}
