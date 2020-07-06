const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const JStoCSS = require('./controllers/JStoCSS');

const server = http.createServer();

server.on('request', (req, res) => {
  const route = url.parse(req.url).path;
  switch (route) {
    case "/":
      if (req.method === "GET") {
        res.writeHead(200, {
          'Content-Type': 'text/html',
        });
        const readStream = fs.createReadStream(path.join(__dirname, './views/index.html'), { encoding: 'utf-8' });
        readStream.pipe(res);
      }
      if (req.method === "POST") {
        res.writeHead(200, {
          'Content-Type': 'text/css',
        });
        JStoCSS(req, res);
      }
      break;

    default:
      res.writeHead(404);
      res.end(JSON.stringify({
        message: "Route not found",
      }))
      break;
  }
})

server.listen(8080);