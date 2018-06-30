class EntityManager {
  constructor() {
    this.entities = [];
  }

  addEntity(ent) {
    this.entities.push(ent);
  }

  removeEntity(entity) {
    this.entities.filter((current) => {
      return current.id !== entity.id;
    });
  }

  findByName(name) {
    return this.entities.find((ent) => {
      return ent.name === name;
    });
  }

  getAllEntities() {
    return this.entities;
  }

  update() {
    this.entities.forEach(entity => entity.update());
  }
}

export default new EntityManager();
