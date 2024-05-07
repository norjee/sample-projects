const todoList = [{
  name: 'make dinner',
  dueDate:'24-12-22'
}, {
  name: 'wash dishes',
  dueDate:'24-12-22'
}];

renderTodoList(); //to display the do list at the start on the page

function renderTodoList() {

  let todoListHTML = '';

  todoList.forEach((todoObject, index) => {
    //const name = todoObject.name;
    //const dueDate = todoObject.dueDate;
    const { name, dueDate } = todoObject; //shortcut for above
    const html = `
      <div>${name}</div>
      <div>${dueDate}</div>
      <button class="delete-todo-button js-delete-todo-button">Delete</button> 
      `;  //generating the html using JavaScript
    todoListHTML += html
  });
  
  document.querySelector('.js-todo-list').innerHTML = todoListHTML;

  document.querySelectorAll('.js-delete-todo-button')
    .forEach((deleteButton, index) => {
      deleteButton.addEventListener('click', () => {
        todoList.splice(index, 1);
        renderTodoList();
      });
    });
}

document.querySelector('.js-add-todo-button')
  .addEventListener('click', () => {
    addTodo();
  });

function addTodo() {
  const inputELment = document.querySelector('.js-name-input');
  const name = inputELment.value;

  const dateInputElement = document.querySelector('.js-due-date-input');
  const dueDate = dateInputElement.value;

  todoList.push({
    //name: name,
    //dueDate: dueDate
    name,
    dueDate
  });

  //to reset the text in the textbox after clicking Add
  inputELment.value = '';  
  dateInputElement.value = '';

  renderTodoList();
}

