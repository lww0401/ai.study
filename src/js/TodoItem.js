export class TodoItem {
    constructor(todo, onToggle, onDelete) {
        this.todo = todo;
        this.onToggle = onToggle;
        this.onDelete = onDelete;
    }

    render() {
        const li = document.createElement('li');
        li.className = `todo-item ${this.todo.completed ? 'completed' : ''}`;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'todo-checkbox';
        checkbox.checked = this.todo.completed;
        checkbox.addEventListener('change', () => this.onToggle(this.todo.id));

        const text = document.createElement('span');
        text.className = 'todo-text';
        text.textContent = this.todo.text;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = '删除';
        deleteBtn.addEventListener('click', () => this.onDelete(this.todo.id));

        li.appendChild(checkbox);
        li.appendChild(text);
        li.appendChild(deleteBtn);

        return li;
    }
}
