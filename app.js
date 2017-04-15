import Todos from './js/todos';
import View from './js/view';
import Events from './js/events';

class App {
  constructor() {
    this.todos = new Todos();
    this.view = new View(this.todos);
    this.events = new Events(this.todos, this.view);
  }
}

new App();
