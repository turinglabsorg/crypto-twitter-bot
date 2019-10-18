import app from './App'
require('dotenv').config()
const {exec} = require('child_process')
let {nextAvailable} = require('node-port-check')

const server = async () => {
  let port = await nextAvailable(3000, '0.0.0.0')
  app.engine('html', require('ejs').renderFile);
  app.listen(port, (err) => {
    if (err) {
      return console.log(err)
    }
    return console.log(`NodeJS server listening at port ${port}`)
  })
}

server()