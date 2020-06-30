const { Transform } = require('readable-stream');


const JStoCSS = Transform({
  objectMode: true,
  transform(chunk, encoding, callback) {
    const cssString = chunk.reduce((acc, object) => {
      acc += `.${object.name} {\n`;
      acc += Object.keys(object.properties).reduce((propertiesString, key) => {
        propertiesString += `  ${key}: ${object.properties[key]};\n`
        return propertiesString;
      }, '');
      acc += `}\n\n`;
      return acc;
    }, '');
    callback(null, cssString);
  }
});

module.exports = JStoCSS;