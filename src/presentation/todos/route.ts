import { Router } from "express";
import { TodoController } from "./controller";
import { TodoRepositoryImpl } from "../../infrastructure/repositories/todo.repositorie.impl";
import { TodoDatasourceImpl } from "../../infrastructure/datasources/todo.datasource.impl";
const datasource = new TodoDatasourceImpl()
const reposotory = new TodoRepositoryImpl(datasource)

export class TodoRoutes {
    static get routes(): Router {
        const router = Router();

        const controller = new TodoController(reposotory);

        router.get('/', controller.getTodos)
        router.get('/:id', controller.getTodoById)
        router.post('/', controller.createTodo)
        router.patch('/:id', controller.updateTodo)
        router.delete('/:id', controller.deleteTodo)

        return router;
    }
}