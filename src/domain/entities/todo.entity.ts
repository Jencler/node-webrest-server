export class TodoEntity {
    constructor(
        public readonly id: string,
        public text: string,
        public completed: boolean,
        public readonly createdAt: Date
    ) { }

    get isCompleted() {
        return !!this.completed
    }

    static fromObject(object: { [key: string]: any }): TodoEntity {
        const { id, text, completed, createdAt } = object;
        if (!text) throw Error('Text is required');
        //Validar las opciones del obj
        return new TodoEntity(id, text, completed, createdAt)
    }
};