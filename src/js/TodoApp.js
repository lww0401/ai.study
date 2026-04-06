import { StorageService } from './StorageService.js';
import { TodoItem } from './TodoItem.js';

export class TodoApp {
    constructor() {
        this.storage = new StorageService();
        this.todos = this.storage.getTodos();
        this.editingId = null;

        this.todoInput = document.getElementById('todoInput');
        this.prioritySelect = document.getElementById('prioritySelect');
        this.addBtn = document.getElementById('addBtn');
        this.todoList = document.getElementById('todoList');
        this.pendingCount = document.getElementById('pendingCount');
        this.completedCount = document.getElementById('completedCount');
        this.emptyState = document.getElementById('emptyState');
        this.clearCompletedSection = document.getElementById('clearCompletedSection');
        this.clearCompletedBtn = document.getElementById('clearCompletedBtn');
        this.clearAllBtn = document.getElementById('clearAllBtn');
        this.editModal = document.getElementById('editModal');
        this.editInput = document.getElementById('editInput');
        this.editPrioritySelect = document.getElementById('editPrioritySelect');
        this.cancelEditBtn = document.getElementById('cancelEditBtn');
        this.saveEditBtn = document.getElementById('saveEditBtn');
        this.confirmDialog = document.getElementById('confirmDialog');
        this.cancelConfirmBtn = document.getElementById('cancelConfirmBtn');
        this.confirmClearBtn = document.getElementById('confirmClearBtn');

        this.init();
    }

    init() {
        this.addBtn.addEventListener('click', () => this.addTodo());
        this.todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTodo();
            }
        });
        this.clearCompletedBtn.addEventListener('click', () => this.clearCompleted());
        this.clearAllBtn.addEventListener('click', () => this.showConfirmDialog());
        this.cancelEditBtn.addEventListener('click', () => this.closeEditModal());
        this.saveEditBtn.addEventListener('click', () => this.saveEdit());
        this.editInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.saveEdit();
            }
        });
        this.cancelConfirmBtn.addEventListener('click', () => this.closeConfirmDialog());
        this.confirmClearBtn.addEventListener('click', () => this.clearAll());
        this.editModal.addEventListener('click', (e) => {
            if (e.target === this.editModal) {
                this.closeEditModal();
            }
        });
        this.confirmDialog.addEventListener('click', (e) => {
            if (e.target === this.confirmDialog) {
                this.closeConfirmDialog();
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
            priority: this.prioritySelect.value,
            completed: false
        };

        this.todos.push(todo);
        this.storage.saveTodos(this.todos);
        this.todoInput.value = '';
        this.prioritySelect.value = 'medium';
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

    editTodo(id) {
        this.editingId = id;
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            this.editInput.value = todo.text;
            this.editPrioritySelect.value = todo.priority || 'medium';
            this.editModal.style.display = 'flex';
            this.editInput.focus();
        }
    }

    closeEditModal() {
        this.editModal.style.display = 'none';
        this.editingId = null;
    }

    saveEdit() {
        if (!this.editingId) return;

        const text = this.editInput.value.trim();
        if (!text) return;

        const todo = this.todos.find(t => t.id === this.editingId);
        if (todo) {
            todo.text = text;
            todo.priority = this.editPrioritySelect.value;
            this.storage.saveTodos(this.todos);
            this.closeEditModal();
            this.render();
        }
    }

    clearCompleted() {
        this.todos = this.todos.filter(t => !t.completed);
        this.storage.saveTodos(this.todos);
        this.render();
    }

    showConfirmDialog() {
        this.confirmDialog.style.display = 'flex';
    }

    closeConfirmDialog() {
        this.confirmDialog.style.display = 'none';
    }

    clearAll() {
        this.todos = [];
        this.storage.saveTodos(this.todos);
        this.closeConfirmDialog();
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
            this.clearCompletedSection.style.display = 'none';
        } else {
            this.emptyState.classList.remove('show');

            this.todos.forEach(todo => {
                const todoItem = new TodoItem(
                    todo,
                    (id) => this.toggleTodo(id),
                    (id) => this.deleteTodo(id),
                    (id) => this.editTodo(id)
                );
                this.todoList.appendChild(todoItem.render());
            });

            const hasCompleted = this.todos.some(t => t.completed);
            this.clearCompletedSection.style.display = this.todos.length > 0 ? 'flex' : 'none';
        }

        this.updateStats();
    }
}
