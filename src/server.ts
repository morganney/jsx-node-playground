import http, { type IncomingMessage, ServerResponse } from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { render } from './render.js'

const clientBundlePath = [
  path.join(import.meta.dirname, 'client.js'),
  path.resolve(import.meta.dirname, '../dist/client.js'),
].find(candidate => fs.existsSync(candidate))

http
  .createServer((req: IncomingMessage, res: ServerResponse) => {
    if (req.url === '/client.js') {
      if (!clientBundlePath) {
        res.statusCode = 500
        return res.end('Client bundle not found. Run "npm run bundle" first.')
      }

      res.setHeader('content-type', 'application/javascript; charset=utf-8')
      const stream = fs.createReadStream(clientBundlePath)
      stream.on('error', () => {
        res.statusCode = 500
        res.end('Failed to read client bundle.')
      })
      return stream.pipe(res)
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
