export default class View {
  constructor(todos) {
    this.count = 0;
    this.todos = todos;
    this.todoList = document.getElementById('todo-list');
    this.render();
  }

  create(todo, fragment) {
    let listItem = document.createElement('li');
    let todoName = document.createTextNode(todo.name);
    let checkbox = document.createElement('input');
    let label = document.createElement('label');
    let description = document.createElement('div');
    let descriptionNode = document.createTextNode(todo.description);

    description.classList.add('description');
    description.classList.add('hidden');
    checkbox.type = 'checkbox';
    checkbox.id = 'check' + this.count;
    label.htmlFor = 'check' + this.count;

    fragment.appendChild(listItem);
    description.appendChild(descriptionNode);
    let fragmentItems = fragment.querySelectorAll('li');
    fragmentItems[fragmentItems.length - 1].appendChild(checkbox);
    fragmentItems[fragmentItems.length - 1].appendChild(label);
    fragmentItems[fragmentItems.length - 1].appendChild(todoName);
    fragmentItems[fragmentItems.length - 1].appendChild(description);

    this.count++;
  }

  render() {
    let docFragment = document.createDocumentFragment();

    for (let todo of this.todos.getAll()) {
      this.create(todo, docFragment);
    }

    this.update(docFragment);
  }

  update(fragment) {
    this.todoList.appendChild(fragment);
  }
}
