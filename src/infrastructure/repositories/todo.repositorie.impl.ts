import { TodoCreateDto, TodoDatasource, TodoUpdateDto } from "../../domain";
import { TodoEntity } from "../../domain/entities/todo.entity";
import { TodoRepositorie } from "../../domain/repositories/todo.repositorie";

export class TodoRepositoryImpl implements TodoRepositorie {

    constructor(
        private readonly datasource: TodoDatasource
    ) { }

    getAll(): Promise<TodoEntity[]> {
        return this.datasource.getAll()
    }
    getById(id: string): Promise<TodoEntity> {
        return this.datasource.getById(id)
    }
    create(dto: TodoCreateDto): Promise<TodoEntity> {
        return this.datasource.create(dto)
    }
    update(dto: TodoUpdateDto): Promise<TodoEntity> {
        return this.datasource.update(dto)
    }
    delete(id: string): Promise<TodoEntity> {
        return this.datasource.delete(id)
    }
}