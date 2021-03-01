/* eslint-disable max-len */
"use strict";

class ToDo {
    constructor(form, input, todoList, todoCompleted) {
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoList = document.querySelector(todoList);
        this.todoCompleted = document.querySelector(todoCompleted);

        this.todoData = new Map(JSON.parse(localStorage.getItem("todoList")));
    }
    addTodo(event) {
        event.preventDefault();

        if (this.input.value.trim()) {
            const newTodo = {
                value: this.input.value,
                completed: false,
                key: this.generateKey(),
            };
            this.todoData.set(newTodo.key, newTodo);
            this.input.value = "";
            this.renderList();
        }
    }
    renderList() {
        this.todoList.textContent = "";
        this.todoCompleted.textContent = "";

        this.todoData.forEach(item => {
            this.createItem(item); //по дефолту этот метод не имеет своего this и вернет undefined. Это можно исправить или стрелочной функцией, или передать this при вызове метода----> ...(this.createItem, this)
        });
        this.addToStorage();
    }

    createItem(todoDataItem) {
        const newLi = document.createElement("li");
        newLi.classList.add("todo-item");
        newLi.key = todoDataItem.key;
        newLi.insertAdjacentHTML(
            "afterbegin",
            `<span class="text-todo">${todoDataItem.value}</span>
        <div class="todo-buttons">
            <button class="todo-edit"></button>
            <button class="todo-remove"></button>
            <button class="todo-complete"></button>
        </div>`
        );

        if (todoDataItem.completed === false) {
            this.todoList.append(newLi);
        } else {
            this.todoCompleted.append(newLi);
        }
    }
    addToStorage() {
        localStorage.setItem("todoList", JSON.stringify(Array.from(this.todoData))); // Для отправки в localStorage коллекции Map, ее нужно предварительно преобразовать в массив!!!
    }

    toggleStatus(todoData, event) {
        const target = event.target.closest(".todo-item");
        todoData.forEach((item, index) => {
            if (item.key === target.key) {
                item.completed = !item.completed;
            }
        });
    }

    deleteItem(todoData, event) {
        const target = event.target.closest(".todo-item");
        todoData.forEach((item, index) => {
            if (item.key === target.key) {
                todoData.delete(item.key);
            }
        });
    }
    editItem(todoData, event) {
        const target = event.target.closest(".todo-item");
        todoData.forEach((item, index) => {
            if (item.key === target.key) {
                target.setAttribute("contenteditable", "true");
            }
        });
    }

    eventHandler() {
        document
            .querySelector(".todo-container")
            .addEventListener("click", event => {
                const target = event.target;
                if (target.matches(".todo-complete")) {
                    this.toggleStatus(this.todoData, event);
                    this.renderList();
                } else if (target.matches(".todo-remove")) {
                    this.deleteItem(this.todoData, event);
                    this.renderList();
                } else if (target.matches(".todo-edit")) {
                    this.editItem(this.todoData, event);
                    // this.renderList();
                } else {
                    return;
                }
            });
    }

    generateKey() {
        return (
            Math.random().toString(32).substring(2, 9) + (+new Date()).toString(32)
        );
    }
    init() {
        this.form.addEventListener("submit", this.addTodo.bind(this));
        this.renderList();
        this.eventHandler();
    }
}

const toDo = new ToDo(
    ".todo-control",
    ".header-input",
    ".todo-list",
    ".todo-completed"
);
toDo.init();
