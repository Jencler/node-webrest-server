import { Request, Response } from "express"

interface Todo {
    id: number,
    text: string,
    completed: boolean,
    createdAt: Date
}

let todos: Todo[] = [
    {
        "id": 1,
        "text": "Buy milk",
        "completed": true,
        "createdAt": new Date(),
    },
    {
        "id": 2,
        "text": "Buy bread",
        "completed": false,
        "createdAt": new Date(),
    },
    {
        "id": 3,
        "text": "Buy butter",
        "completed": false,
        "createdAt": new Date(),
    }
]

export class TodoController {

    //* DI
    constructor() { }

    getTodos = (req: Request, res: Response) => {
        res.json(todos)
    }

    getTodoById = (req: Request, res: Response) => {
        const id: number = +req.params.id!;

        if (isNaN(id)) {
            res.status(400).json({ error: 'ID must be a number' });
            return;
        }

        const todo = todos.find(todo => todo.id === id);

        (todo) ? res.status(200).json(todo) : res.status(404).json({ error: `Todo with id ${id} not found.` });
    }

    createTodo = (req: Request, res: Response) => {
        const { text } = req.body;
        if (!text) {
            res.status(400).json({ error: `Text is required` })
            return
        }
        const newTodo = {
            id: todos.length + 1,
            text: text,
            completed: false,
            createdAt: new Date()
        }

        todos = [...todos, newTodo]

        res.status(201).json(newTodo);
    }

    updateTodo = (req: Request, res: Response) => {
        const id = +req.params.id!;


        if (isNaN(id)) {
            res.status(400).json({ error: 'ID must be a number' });
            return;
        }

        const todo = todos.find(todo => todo.id === id,)

        if (!todo) {
            res.status(404).json({ error: `Todo with id ${id} not found.` })
            return
        }

        const { text, completed } = req.body;

        todo.text = text ?? todo.text;
        todo.completed = completed ?? todo.completed

        res.json(todo)
    }

    deleteTodo = (req: Request, res: Response) => {
        const id = +req.params.id!;

        if (isNaN(id)) {
            res.status(400).json({ error: 'ID must be a number' });
            return;
        }

        const todo = todos.find(todo => todo.id === id,)

        if (!todo) {
            res.status(404).json({ error: `Todo with id ${id} not found.` })
            return
        }

        const todosUpdates = todos.filter(todo => todo.id !== id)

        todos = todosUpdates;

        res.json(todosUpdates)
    }
}