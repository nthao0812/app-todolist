//variables

let todoItems = [];
const todoInput = document.querySelector(".todo-input");
const completedTodosDiv = document.querySelector(".completed-todos");
const uncompletedTodosDiv = document.querySelector(".uncompleted-todos");
const audio = new Audio("sound.wav");

//Get to do list
window.onload = () => {
  let storageTodoItems = localStorage.getItem("todoItems");
  if (storageTodoItems !== null) {
    todoItems = JSON.parse(storageTodoItems);
  }
  render();
};

//Get the content type into the input

todoInput.onkeyup = (e) => {
  let value = e.target.value.replace(/^\s+/, "");
  if (value && e.keyCode === 13) {
    //Enter
    addTodo(value);
    todoInput.value = "";
    todoInput.focus();
  }
};

//Add to do
function addTodo(text) {
  todoItems.push({
    id: Date.now(),
    text,
    completed: false,
  });

  saveAndrender();
}

//Remove to do
function RemoveTodo(id) {
  todoItems = todoItems.filter((todo) => todo.id !== Number(id));
  saveAndrender();
}

//Mark as compele
function markAsCompleted(id) {
  todoItem = todoItems.filter((todo) => {
    if (todo.id === Number(id)) {
      todo.completed = true;
    }
    return todo;
  });

  audio.play();

  saveAndrender();
}
//Mark As uncompelted
function markAsUncompleted(id) {
  todoItem = todoItems.filter((todo) => {
    if (todo.id === Number(id)) {
      todo.completed = false;
    }
    return todo;
  });
  saveAndrender();
}

//Save in local
function save() {
  localStorage.setItem("todoItems", JSON.stringify(todoItems));
}

//render
function render() {
  let unCompletedTodos = todoItems.filter((item) => !item.completed);
  let completedTodos = todoItems.filter((item) => item.completed);

  completedTodosDiv.innerHTML = "";
  uncompletedTodosDiv.innerHTML = "";

  if (unCompletedTodos.length > 0) {
    unCompletedTodos.forEach((todo) => {
      uncompletedTodosDiv.append(createTodoElement(todo));
    });
  } else {
    uncompletedTodosDiv.innerHTML = `<div class='empty'> No uncompleted mission</div>`;
  }
  ///completed (1/3)
  if (completedTodos.length > 0) {
    completedTodosDiv.innerHTML = `<div class='completed-title> Compelted (${completedTodos.length} / ${todoItems.length}) </div)`;

    completedTodos.forEach((todo) => {
      completedTodosDiv.append(createTodoElement(todo));
    });
  }
}

//Save and render
function saveAndrender() {
  save();
  render();
}

//Create todo list item
function createTodoElement(todo) {
  //crate to do list container
  const todoDiv = document.createElement("div");
  todoDiv.setAttribute("data-id", todo.id);
  todoDiv.className = "todo-item ";

  //Create to do item txt

  const todoTextSpan = document.createElement("span");
  todoTextSpan.innerHTML = todo.text;

  //Checkbox for list
  const todoInputCheckbox = document.createElement("input");
  todoInputCheckbox.type = "Checkbox";
  todoInputCheckbox.checked = todo.completed;
  todoInputCheckbox.onclick = (e) => {
    let id = e.target.closest(".todo-item").dataset.id;
    e.target.checked ? markAsCompleted(id) : markAsUncompleted(id);
  };

  //Detele buttn for list

  const todoRemoveBtn = document.createElement("a");
  todoRemoveBtn.href = "#";
  todoRemoveBtn.innerHTML = ` <svg
xmlns="http://www.w3.org/2000/svg"
class="icon icon-tabler icon-tabler-lemon"
width="24"
height="24"
viewBox="0 0 24 24"
stroke-width="2"
stroke="currentColor"
fill="none"
stroke-linecap="round"
stroke-linejoin="round"
>
<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
<path
  d="M17.536 3.393c3.905 3.906 3.905 10.237 0 14.143c-3.906 3.905 -10.237 3.905 -14.143 0l14.143 -14.143m-11.668 11.667a6.5 6.5 0 0 0 9.193 -9.192m-4.597 4.596l4.597 4.597m-4.597 -4.597v6.364m0 -6.364h6.364"
></path></svg
>
`;
  todoRemoveBtn.onclick = (e) => {
    let id = e.target.closest(".todo-item").dataset.id;
    RemoveTodo(id);
  };

  todoTextSpan.prepend(todoInputCheckbox);
  todoDiv.appendChild(todoTextSpan);
  todoDiv.appendChild(todoRemoveBtn);

  return todoDiv;
}
