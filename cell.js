export default class Cell {
    constructor(id, content, type = "note") {
      this.id = id || crypto.randomUUID();
      this.content = content || "";
      this.type = type; // "note" or "task"
      this.completed = false; // Only for tasks
    }
  
    toggleCompleted() {
      if (this.type === "task") this.completed = !this.completed;
    }
  
    serialize() {
      return JSON.stringify(this);
    }
  
    static deserialize(json) {
      const obj = JSON.parse(json);
      return new Cell(obj.id, obj.content, obj.type);
    }
  }
  