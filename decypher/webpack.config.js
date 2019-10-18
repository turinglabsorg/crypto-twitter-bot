const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '../../public/decypher.js',
    path: path.resolve(__dirname, 'dist')
  }
};