import { Request, Response } from "express"
import { TodoRepositorie } from "../../domain/repositories/todo.repositorie";
import { CreateTodo, DeleteTodo, GetTodo, GetTodos, TodoCreateDto, TodoUpdateDto, UpdateTodo } from "../../domain";

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

    getTodos = (req: Request, res: Response) => {
        new GetTodos(this.repositorie)
            .execute()
            .then(todos => res.json(todos))
            .catch(error => res.status(400).json({ error }))
    }

    getTodoById = async (req: Request, res: Response) => {
        const id = req.params.id as string
        new GetTodo(this.repositorie)
            .execute(id)
            .then(todo => res.json(todo))
            .catch(error => res.status(400).json({ error }))
    }

    createTodo = async (req: Request, res: Response) => {

        const [errors, todoCreateDto] = TodoCreateDto.create(req.body)
        if (errors) {
            return res.status(400).json({ errors })
        }
        new CreateTodo(this.repositorie)
            .execute(todoCreateDto!)
            .then(todo => res.json(todo))
            .catch(error => res.status(400).json({ error }))
    }

    updateTodo = async (req: Request, res: Response) => {
        const id = req.params.id as string

        const [errors, todoUpdateDto] = TodoUpdateDto.create({ ...req.body, id })
        if (errors) {
            return res.status(400).json({ errors })
        }
        new UpdateTodo(this.repositorie)
            .execute(todoUpdateDto!)
            .then(todo => res.json(todo))
            .catch(error => res.status(400).json({ error }))
    }

    deleteTodo = async (req: Request, res: Response) => {
        const id = req.params.id as string
        new DeleteTodo(this.repositorie)
            .execute(id)
            .then(todo => res.json(todo))
            .catch(error => res.status(400).json({ error }))
    }
}