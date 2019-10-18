//config.js
/** TWITTER APP CONFIGURATION
 * consumer_key
 * consumer_secret
 * access_token
 * access_token_secret
 */

require('dotenv').config()

module.exports = {
  consumer_key: process.env.TWITTER_CONSUMERKEY,  
  consumer_secret: process.env.TWITTER_CONSUMERSECRET,
  access_token: process.env.TWITTER_ACCESSTOKEN,  
  access_token_secret: process.env.TWITTER_TOKENSECRET
}