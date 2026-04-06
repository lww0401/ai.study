export class TodoItem {
    constructor(todo, onToggle, onDelete, onEdit) {
        this.todo = todo;
        this.onToggle = onToggle;
        this.onDelete = onDelete;
        this.onEdit = onEdit;
    }

    render() {
        const li = document.createElement('li');
        const priority = this.todo.priority || 'medium';
        li.className = `todo-item priority-${priority} ${this.todo.completed ? 'completed' : ''}`;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'todo-checkbox';
        checkbox.checked = this.todo.completed;
        checkbox.addEventListener('change', () => this.onToggle(this.todo.id));

        const text = document.createElement('span');
        text.className = 'todo-text';
        text.textContent = this.todo.text;

        const actions = document.createElement('div');
        actions.className = 'todo-actions';

        const editBtn = document.createElement('button');
        editBtn.className = 'edit-btn';
        editBtn.textContent = '编辑';
        editBtn.addEventListener('click', () => this.onEdit(this.todo.id));

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = '删除';
        deleteBtn.addEventListener('click', () => this.onDelete(this.todo.id));

        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);

        li.appendChild(checkbox);
        li.appendChild(text);
        li.appendChild(actions);

        return li;
    }
}
