export class StorageService {
    constructor() {
        this.storageKey = 'todos';
    }

    getTodos() {
        try {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error loading todos:', error);
            return [];
        }
    }

    saveTodos(todos) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(todos));
        } catch (error) {
            console.error('Error saving todos:', error);
        }
    }
}
