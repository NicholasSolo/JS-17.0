"use strict";

const todoControl = document.querySelector(".todo-control");
const headerInput = document.querySelector(".header-input");
const todoList = document.querySelector(".todo-list");
const todoCompleted = document.querySelector(".todo-completed");

const todoData = [];

function renderList() {
  todoList.textContent = "";
  todoCompleted.textContent = "";

  todoData.forEach((item, index) => {
    const li = document.createElement("li");
    li.classList.add("todo-item");

    li.innerHTML =
      '<span class="text-todo">' +
      item.value +
      "</span>" +
      '<div class="todo-buttons">' +
      '<button class="todo-remove"></button>' +
      '<button class="todo-complete"></button>' +
      "</div>";

    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }

    localStorage.setItem("todoListItems", JSON.stringify(todoData));

    headerInput.value = "";

    const btnTodoCompleted = li.querySelector(".todo-complete");
    btnTodoCompleted.addEventListener("click", () => {
      item.completed = !item.completed;
      renderList();
    });
    const deleteTodo = li.querySelector(".todo-remove");
    deleteTodo.addEventListener("click", () => {
      todoData.splice(index, 1);
      localStorage.removeItem("todoListItems");
      renderList();
    });
  });
}

todoControl.addEventListener("submit", (event) => {
  event.preventDefault();

  if (headerInput.value !== "") {
    todoData.push({
      value: headerInput.value,
      completed: false,
    });
  }
  renderList();
});

document.addEventListener("DOMContentLoaded", () => {
  let reverse = JSON.parse(localStorage.getItem("todoListItems"));
  if (reverse !== null) {
    reverse.forEach((item) => {
      todoData.push(item);
    });
  }

  renderList();
});

