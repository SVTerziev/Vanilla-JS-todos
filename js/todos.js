export default class Todos {
  constructor(...todos) {
    this.storageKey = 'todos';
    this.selected = new Set();
    if (!this.storageGet(this.storageKey)) {
      this.storageSet(this.storageKey, []);
    }
    this.add(...todos);
  }

  add(newTodos) {
    let todos = this.getAll();

    if (newTodos) {
      if (Array.isArray(newTodos)) {
        for (let todo of newTodos) {
          todos.push(todo);
        }
      } else {
        todos.push(newTodos);
      }

      this.storageSet(this.storageKey, todos);
    }
  }

  getAll() {
    return this.storageGet(this.storageKey);
  }

  storageGet(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  storageSet(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  deleteSelected() {
    let todos = this.getAll();
    let index;
    for (let key of this.selected) {
      this.selected.delete(key);
      index = todos.map(el => el.name).indexOf(key);
      if (index != -1) {
        todos.splice(index, 1);
      }
    }
    this.storageSet(this.storageKey, todos);
  }
}
