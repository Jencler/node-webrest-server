import { TodoCreateDto } from "../dtos/todo/todo-create.dto";
import { TodoEntity } from "../entities/todo.entity";
import { TodoRepositorie } from "../repositories/todo.repositorie";

interface CreateTodoUseCase {
    execute(dto: TodoCreateDto): Promise<TodoEntity>
}

export class CreateTodo implements CreateTodoUseCase {

    constructor(
        private readonly repository: TodoRepositorie
    ) { }

    execute(dto: TodoCreateDto): Promise<TodoEntity> {
        return this.repository.create(dto)
    }

}