export default class BaseEntity {
  constructor(name) {
    this.name = name;
    this.id = Math.round(Math.random() * 100) + 1;
  }

  update() {}

  dispose() {}
}
