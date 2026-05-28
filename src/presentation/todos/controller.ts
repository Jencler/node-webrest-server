import { Request, Response } from "express"
import { TodoRepositorie } from "../../domain/repositories/todo.repositorie";
import { TodoCreateDto, TodoUpdateDto } from "../../domain";

interface Todo {
    id: string,
    text: string,
    completed: boolean,
}

export class TodoController {

    //* DI
    constructor(
        private readonly repositorie: TodoRepositorie
    ) { }

    getTodos = async (req: Request, res: Response) => {
        try {
            const todos = await this.repositorie.getAll()
            return res.json(todos)
        } catch (error) {
            res.json({ error })
        }
    }

    getTodoById = async (req: Request, res: Response) => {
        const id = req.params.id as string
        try {
            const todo = await this.repositorie.getById(id)
            res.json(todo)

        } catch (error) {
            res.json({ error })
        }
    }

    createTodo = async (req: Request, res: Response) => {
        try {

            const [errors, todoCreateDto] = TodoCreateDto.create(req.body)
            if (errors) {
                return res.status(400).json({ errors })
            }
            const todo = await this.repositorie.create(todoCreateDto!)
            res.json(todo)

        } catch (error) {
            res.status(400).json({ error })
        }
    }

    updateTodo = async (req: Request, res: Response) => {
        const id = req.params.id as string

        try {

            const [errors, todoUpdateDto] = TodoUpdateDto.create({ ...req.body, id })
            if (errors) {
                return res.status(400).json({ errors })
            }

            const todo = await this.repositorie.update(todoUpdateDto!)
            res.json(todo)

        } catch (error) {
            res.status(400).json({ error })
        }
    }

    deleteTodo = async (req: Request, res: Response) => {
        const id = req.params.id as string
        try {
            const todo = await this.repositorie.delete(id)
            res.json(todo)
        } catch (error) {
            res.status(400).json({ error })
        }
    }
}