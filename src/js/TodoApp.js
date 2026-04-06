import { StorageService } from './StorageService.js';
import { TodoItem } from './TodoItem.js';

export class TodoApp {
    constructor() {
        this.storage = new StorageService();
        this.todos = this.storage.getTodos();

        this.todoInput = document.getElementById('todoInput');
        this.addBtn = document.getElementById('addBtn');
        this.todoList = document.getElementById('todoList');
        this.pendingCount = document.getElementById('pendingCount');
        this.completedCount = document.getElementById('completedCount');
        this.emptyState = document.getElementById('emptyState');

        this.init();
    }

    init() {
        this.addBtn.addEventListener('click', () => this.addTodo());
        this.todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTodo();
            }
        });

        this.render();
    }

    addTodo() {
        const text = this.todoInput.value.trim();
        if (!text) return;

        const todo = {
            id: Date.now(),
            text: text,
            completed: false
        };

        this.todos.push(todo);
        this.storage.saveTodos(this.todos);
        this.todoInput.value = '';
        this.render();
    }

    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.storage.saveTodos(this.todos);
            this.render();
        }
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(t => t.id !== id);
        this.storage.saveTodos(this.todos);
        this.render();
    }

    updateStats() {
        const pending = this.todos.filter(t => !t.completed).length;
        const completed = this.todos.filter(t => t.completed).length;

        this.pendingCount.textContent = pending;
        this.completedCount.textContent = completed;
    }

    render() {
        this.todoList.innerHTML = '';

        if (this.todos.length === 0) {
            this.emptyState.classList.add('show');
        } else {
            this.emptyState.classList.remove('show');

            this.todos.forEach(todo => {
                const todoItem = new TodoItem(
                    todo,
                    (id) => this.toggleTodo(id),
                    (id) => this.deleteTodo(id)
                );
                this.todoList.appendChild(todoItem.render());
            });
        }

        this.updateStats();
    }
}
