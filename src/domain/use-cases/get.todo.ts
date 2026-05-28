import { TodoEntity } from "../entities/todo.entity";
import { TodoRepositorie } from "../repositories/todo.repositorie";

interface GetTodoUseCase {
    execute(id: string): Promise<TodoEntity>
}

export class GetTodo implements GetTodoUseCase {

    constructor(
        private readonly repository: TodoRepositorie
    ) { }
    execute(id: string): Promise<TodoEntity> {
        return this.repository.getById(id)
    }
}