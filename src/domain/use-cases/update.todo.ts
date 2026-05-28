import { TodoUpdateDto } from "../dtos/todo/todo-update.dto";
import { TodoEntity } from "../entities/todo.entity";
import { TodoRepositorie } from "../repositories/todo.repositorie";

interface UpdateTodoUseCase {
    execute(dto: TodoUpdateDto): Promise<TodoEntity>
}

export class UpdateTodo implements UpdateTodoUseCase {

    constructor(
        private readonly repository: TodoRepositorie
    ) { }

    execute(dto: TodoUpdateDto): Promise<TodoEntity> {
        return this.repository.update(dto)
    }

}