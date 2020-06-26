const fs = require('fs');
const path = require('path');
const stream = require('stream');
const JSONStream = require('JSONStream');
const es = require('event-stream');

const readStream = fs.createReadStream(`${__dirname}/styles.json`, { encoding: 'utf-8' });

const writeStream = fs.createWriteStream(path.join(__dirname, './destination.css'));

const jsonStream = JSONStream.parse('components');

stream.pipeline(readStream, jsonStream, es.map((data, cb) => {
  const JSONtoCSS = data.reduce((acc, { name, properties }) => {
    acc += `.${name} {\n`;
    acc += Object.keys(properties).reduce((propertiesString, key) => {
      propertiesString += `  ${key} : ${properties[key]};\n`
      return propertiesString;
    }, '');
    acc += `}\n\n`;
    return acc;
  }, '')
  cb(null, JSONtoCSS);
}), writeStream, () => {
  console.log('Done');
})