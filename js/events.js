import Todo from './todo';

export default class Events {
  constructor(todos, view) {
    //Enter
    this.ADD_KEY = 13;
    this.todos = todos;
    this.view = view;
    this.events();
  }

  events() {
    document.addEventListener('keydown', e => {
      if (e.keyCode === this.ADD_KEY && e.target.type !== 'textarea') {
        let docFragment = document.createDocumentFragment();
        let name = document.getElementById('name');

        if (name.value) {
          let description = document.getElementById('description');
          let todo = new Todo(name.value, description.value);

          this.todos.add(todo);
          this.view.create(todo, docFragment);
          this.view.update(docFragment);

          name.value = '';
          description.value = '';
        }
      }
    });

    document.addEventListener('click', e => {
      if (e.target.type === 'checkbox') {
        let todoName = e.target.nextSibling.nextSibling.textContent;
        e.target.parentNode.classList.toggle('selected');

        if (!this.todos.selected.has(todoName)) {
          this.todos.selected.add(todoName);
        } else {
          this.todos.selected.delete(todoName);
        }
      }

      if (e.target.nodeName.toLowerCase() === 'li') {
        e.target.childNodes[3].classList.toggle('hidden');
      }
    });

    document.getElementById('delete').addEventListener('click', () => {
      this.todos.deleteSelected();
    });
  }
}
