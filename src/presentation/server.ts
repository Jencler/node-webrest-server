import express from 'express'
import { join } from 'node:path';

interface OptiosStart {
    port: number,
    publicPath?: string
}

export class Server {

    private app = express()
    private readonly port: number
    private readonly publicPath: string

    constructor(options: OptiosStart) {
        this.port = options.port;
        this.publicPath = options.publicPath ?? 'public';
    }


    async start() {

        //* Middlewares
        this.app.use(express.json());
        this.app.use(express.urlencoded());

        //* Public folder
        this.app.use(express.static(this.publicPath))

        this.app.get(/.*/, (req, res) => {
            const indexPath = join(__dirname + `../../../${this.publicPath}/index.html`);
            res.sendFile(indexPath)
        })

        this.app.listen(this.port, () => {
            console.log(`server running on port http://localhost:${this.port}`)
        });

    }
}