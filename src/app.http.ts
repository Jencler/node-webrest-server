import http from 'http';
import fs from 'node:fs';
import { join } from 'node:path';


const server = http.createServer((req, res) => {

    const htmlFile = fs.readFileSync(join('public', 'index.html'), 'utf-8')

    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(htmlFile)
        return
    }

    if (req.url?.endsWith('.css')) {
        res.writeHead(200, { 'Content-Type': 'text/css' })
    }

    const content = fs.readFileSync(join('public', 'styles.css'), 'utf-8')
    res.end(content)
    return
});

server.listen(8000, () => {
    console.log('Server running')
});