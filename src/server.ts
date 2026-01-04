import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { render } from './render.js'

const clientBundlePath = fs.existsSync(path.join(import.meta.dirname, 'client.js'))
  ? path.join(import.meta.dirname, 'client.js')
  : path.resolve(import.meta.dirname, '../dist/client.js')

http
  .createServer((req, res) => {
    if (req.url === '/client.js') {
      res.setHeader('content-type', 'application/javascript; charset=utf-8')
      return fs.createReadStream(clientBundlePath).pipe(res)
    }
    if (req.url === '/') {
      res.setHeader('content-type', 'text/html; charset=utf-8')
      return res.end(render('SSR'))
    }
    res.statusCode = 404
    res.end('Not Found')
  })
  .listen(3000, () => {
    console.log('SSR server listening on http://localhost:3000')
  })
