# json-to-css

A small demo built to understand Node streams

## What does it do?

Creates an http server that listens for JSON data from a client and with Transform Streams changes it into CSS text and sends it back to the client.

```
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
```

An example of what the converted data looks like:

```
{
  components: [
    {
      name: 'button',
      properties: {
        'background-color': #fcba03,
       },
     },
   ],
}
```

Becomes :

```
.button {
  background-color: #fcba03;
}
