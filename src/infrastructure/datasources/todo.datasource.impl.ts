import { prisma } from "../../data/postgres";
import { TodoCreateDto, TodoDatasource, TodoUpdateDto } from "../../domain";
import { TodoEntity } from "../../domain/entities/todo.entity";

export class TodoDatasourceImpl implements TodoDatasource {
    async getAll(): Promise<TodoEntity[]> {
        const allTodos = await prisma.todo.findMany()
        return allTodos.map(todo => TodoEntity.fromObject(todo))
    }
    async getById(id: string): Promise<TodoEntity> {
        const todo = await prisma.todo.findUnique({ where: { id: id } })
        if (!todo) throw `Todo with ID ${id} not found`
        return TodoEntity.fromObject(todo)

    }
    async create(dto: TodoCreateDto): Promise<TodoEntity> {
        const { text } = dto

        const todo = await prisma.todo.create({
            data: {
                text
            }
        })

        return TodoEntity.fromObject(todo)

    }
    async update(dto: TodoUpdateDto): Promise<TodoEntity> {
        const todo = await this.getById(dto.id)


        const updateTodo = await prisma.todo.update({
            where: {
                id: todo.id
            },
            data: {
                text: dto.text ?? todo.text,
                completed: dto.completed ?? todo.completed
            }
        })

        return TodoEntity.fromObject(updateTodo)
    }
    async delete(id: string): Promise<TodoEntity> {
        const todo = await this.getById(id)
        const deleteTodo = await prisma.todo.delete({
            where: {
                id: todo.id
            }
        })

        return TodoEntity.fromObject(deleteTodo)
    }
}