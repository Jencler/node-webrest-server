import { TodoCreateDto } from "../dtos/todo/todo-create.dto";
import { TodoUpdateDto } from "../dtos/todo/todo-update.dto";
import { TodoEntity } from "../entities/todo.entity";

export abstract class TodoDatasource {
    abstract getAll(): Promise<TodoEntity[]>
    abstract getById(id: string): Promise<TodoEntity>
    abstract create(dto: TodoCreateDto): Promise<TodoEntity>
    abstract update(dto: TodoUpdateDto): Promise<TodoEntity>
    abstract delete(id: string): Promise<TodoEntity>
}