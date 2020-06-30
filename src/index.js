const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const rs = require('readable-stream');
const JSONStream = require('JSONStream');

const JStoCSS = require('./lib/JStoCSS');

const server = http.createServer((req, res) => {

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
        rs.pipeline(
          req,
          JSONStream.parse('components'),
          JStoCSS,
          res,
          () => {
            console.log('Done');
          }
        )
      }
      break;

    default:
      res.writeHead(404);
      res.end(JSON.stringify({
        message: "Route not found",
      }))
      break;
  }
});

server.listen(8080);