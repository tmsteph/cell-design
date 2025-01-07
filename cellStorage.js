export default class CellStorage {
    constructor(storageKey = "cells") {
      this.storageKey = storageKey;
    }
  
    save(cell) {
      const cells = this.loadAll();
      cells[cell.id] = cell.serialize();
      localStorage.setItem(this.storageKey, JSON.stringify(cells));
    }
  
    delete(cellId) {
      const cells = this.loadAll();
      delete cells[cellId];
      localStorage.setItem(this.storageKey, JSON.stringify(cells));
    }
  
    load(cellId) {
      const cells = this.loadAll();
      return cells[cellId] ? Cell.deserialize(cells[cellId]) : null;
    }
  
    loadAll() {
      return JSON.parse(localStorage.getItem(this.storageKey)) || {};
    }
  }
  