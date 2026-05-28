import { TodoEntity } from "../entities/todo.entity";
import { TodoRepositorie } from "../repositories/todo.repositorie";

interface DeleteTodoUseCase {
    execute(id: string): Promise<TodoEntity>
}

export class DeleteTodo implements DeleteTodoUseCase {

    constructor(
        private readonly repository: TodoRepositorie
    ) { }
    execute(id: string): Promise<TodoEntity> {
        return this.repository.delete(id)
    }
}