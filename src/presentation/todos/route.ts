import { Router } from "express";
import { TodoController } from "./controller";

export class TodoRoutes {
    static get routes(): Router {
        const router = Router();
        const controller = new TodoController();

        router.get('/', controller.getTodos)
        router.get('/:id', controller.getTodoById)
        router.post('/', controller.createTodo)
        router.patch('/:id', controller.updateTodo)
        router.delete('/:id', controller.deleteTodo)

        return router;
    }
}