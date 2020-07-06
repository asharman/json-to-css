const rs = require('readable-stream');
const JStoCSS = require('../lib/JStoCSS');
const JSONStream = require('JSONStream');

module.exports = (req, res) => {
  const transform = new JStoCSS();

  rs.pipeline(
    req,
    JSONStream.parse('components'),
    transform,
    res,
    (error) => {
      if (error) {
        console.log(error);
        res.end('Error')
      }
      res.on('close', () => {
        // res.end();
      })
    }
  )
}