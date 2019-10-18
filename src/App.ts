import * as express from 'express'
import * as Utilities from './libs/Utilities'
import * as Interface from "./routes/Interface"
import * as Twitter from "./routes/Twitter"
import * as Wallet from "./routes/Wallet"
import * as Telegram from './routes/Telegram'
import * as Crypto from './libs/Crypto'

var bodyParser = require('body-parser')
var cors = require('cors')

class App {
  public express

  constructor () {
    const app = this
    app.express = express()
    app.express.use(express.static('public'))
    app.express.use(bodyParser.json())
    app.express.use(bodyParser.urlencoded({extended: true}))
    app.express.use(cors())
    
    app.express.get('/',Interface.rendervue)
    app.express.get('/twitter/request-token',Twitter.getAuth)
    app.express.get('/twitter/callback',Twitter.getAccessToken)
    
    if(process.env.TWITTER_USERNAME !== undefined){
      Twitter.botfollowers()
      setInterval(function(){
        Twitter.botfollowers()
        Twitter.followers(process.env.TWITTER_USERNAME)
        Twitter.mentions(process.env.TWITTER_USERNAME)
      },360000)
    }

    if(process.env.TELEGRAM_TOKEN !== undefined){
      Telegram.init()
    }

  }
}

export default new App().express
