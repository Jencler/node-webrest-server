import { Request, Response } from "express"
import { prisma } from "../../data/postgres"
import { TodoCreateDto } from "../../domain/dtos/todo/todo-create.dto";
import { TodoUpdateDto } from "../../domain/dtos/todo/todo-update.dto";

interface Todo {
    id: string,
    text: string,
    completed: boolean,
}

export class TodoController {

    //* DI
    constructor() { }

    private async findTodoOrFail(req: Request, res: Response): Promise<any | null> {
        const idTodo = req.params.id as string;

        if (!idTodo) {
            res.status(400).json({ error: 'ID is required' });
            return;
        }

        const todo = await prisma.todo.findUnique({ where: { id: idTodo } })
        if (!todo) {
            res.status(404).json({ error: `Todo with id ${idTodo} not found.` })
            return null
        }
        return todo
    }

    getTodos = async (req: Request, res: Response) => {
        const allTodos = await prisma.todo.findMany();
        res.json(allTodos)
    }

    getTodoById = async (req: Request, res: Response) => {
        const todo = await this.findTodoOrFail(req, res)
        if (!todo) return
        res.json(todo)
    }

    createTodo = async (req: Request, res: Response) => {

        const [error, createTodoDto] = TodoCreateDto.create(req.body)
        if (error) {
            res.status(400).json(error)
            return
        }

        const todo = await prisma.todo.create({
            data: createTodoDto!
        })

        res.status(201).json(todo);
    }

    updateTodo = async (req: Request, res: Response) => {
        const todoExist = await this.findTodoOrFail(req, res)
        if (!todoExist) return

        const [error, updateDto] = TodoUpdateDto.create(req.body)

        if (error) {
            res.status(400).json(error)
            return
        }

        const todo = await prisma.todo.update({
            where: {
                id: todoExist.id
            },
            data: {
                text: updateDto?.text ?? todoExist.text,
                completed: updateDto?.completed ?? todoExist.completed
            }
        })

        res.json(todo)
    }

    deleteTodo = async (req: Request, res: Response) => {
        const todoExist = await this.findTodoOrFail(req, res)
        if (!todoExist) return
        await prisma.todo.delete({ where: { id: todoExist.id } })
        res.status(204).json({ message: 'Todo deleted' })
    }
}