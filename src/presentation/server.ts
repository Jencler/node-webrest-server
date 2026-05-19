import express, { Router } from 'express'
import { join } from 'node:path';
import { AppRoutes } from './routes';

interface OptiosStart {
    port: number,
    publicPath?: string
    routes: Router
}

export class Server {

    private app = express()
    private readonly port: number
    private readonly publicPath: string
    private readonly routes: Router

    constructor(options: OptiosStart) {
        this.port = options.port;
        this.publicPath = options.publicPath ?? 'public';
        this.routes = options.routes
    }


    async start() {

        //* Middlewares
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        //* Public folder
        this.app.use(express.static(this.publicPath))

        //* Routes
        this.app.use(this.routes)


        //* SPA
        this.app.get(/.*/, (req, res) => {
            const indexPath = join(__dirname + `../../../${this.publicPath}/index.html`);
            res.sendFile(indexPath)
        })

        this.app.listen(this.port, () => {
            console.log(`server running on port http://localhost:${this.port}`)
        });

    }
}