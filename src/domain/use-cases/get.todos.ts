import { TodoEntity } from "../entities/todo.entity";
import { TodoRepositorie } from "../repositories/todo.repositorie";

interface GetTodosUseCase {
    execute(): Promise<TodoEntity[]>
}

export class GetTodos implements GetTodosUseCase {

    constructor(
        private readonly repository: TodoRepositorie
    ) { }

    execute(): Promise<TodoEntity[]> {
        return this.repository.getAll()
    }
}