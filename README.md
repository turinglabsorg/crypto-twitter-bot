
## Crypto Twitter BOT

  

This BOT will reward with your coin every time someone mentions or follows your profile on Twitter.

  

In order do install the BOT you've to follow some steps:

  

1) Rent a VPS, the BOT doesn't require too much RAM or disk, but the blockchain can be. Choose an appropriate one and install Ubuntu 16.04

2) Clone the repository and run the `install.sh` script, this will install all the dependencies (REDIS and NODEJS). Run the bot the first time with ```npm run dev```.

3) Create an account on [https://developer.twitter.com/](https://developer.twitter.com/) and create an app. You will need to add `Read, write, and Direct Messages` permissions to the bot and obtain the Consumer API Key and secret.

4) Install your wallet and set up it with an RPC_USER and RPC_PASSWORD (better if they're strong) and run it.

5) Start edit the .env file with your informations.

6) Create a new user on Twitter and go to the authorization page. This step will write the access token for that specific user. The url will be http://yourip:3000/twitter/request-token

7) If everything works you should see three additional params on your .env file: `TWITTER_USERNAME` `TWITTER_ACCESSTOKEN` `
TWITTER_TOKENSECRET`. Now you've to edit the `TWITTER_USERNAME ` param, matching your main profile (The official Coin profile, for example). The one with the user have to interact.

8) Make a test round and see the logs, if everything is working you should see a log with every user rewarded, the mentions etc. The main process runs every 6 minutes in order to avoid blocks from twitter.

9) If everything is ok it's time to set up the .env with ```TESTMODE = FALSE```, stop the bot closing the node process and reset the REDIS database with ```redis-cli> FLUSH ALL```

1) You can now run again the bot with ```pm2 start bot``` and see if everything is ok with ```pm2 monit```

## .env file

The .env file need to be properly configurated otherwise the bot will not work. 

```
URL=http://localhost:3000 //INTERNAL URL
TWITTER_CONSUMERKEY=YOURKEY
TWITTER_CONSUMERSECRET=YOURSECRET
BOT_PROFILE=BOTPROFILENAME //USERNAME FOR YOUR BOT
TIP_FOLLOW=0.01 //AMOUNT OF COIN THE BOT WILL SEND FOR EACH FOLLOW
TIP_MENTION=0.001 //AMOUNT OF COIN THE BOT WILL SEND FOR EACH INTERACTION
MIN_TIMEFRAME=360 //MIN TIMEFRAME BETWEEN REWARDS
MIN_FOLLOWERS=100 //MIN FOLLOWERS FOR THE USER
MIN_DAYS=30 //MIN AGE FOR THE USER
COIN=YOURCOIN //YOUR COIN NAME
TESTMODE=true //WITH THE TESTMODE ENABLE THE BOT WILL NOT SEND MESSAGES
WEBSITE_URL=https://urltopublicwebsite //PUBLIC WEBSITE
RPCUSER=RPCUSER
RPCPASSWORD=RPCPASSWORD
RPCADDRESS=127.0.0.1
RPCPORT=RPCPORT
COIN_PRIVATE=YOURPRIVATEHEX
COIN_PUBLIC=YOURPRIVATEPUBLIC
COIN_SCRIPTHASH=YOURPRIVATESCRIPTHASH
```
Be attention, the last three parameters should match the one of your blockchain. Usually they are in the chainparams.cpp file and have to be converted in hexadecimal:
```
base58Prefixes[PUBKEY_ADDRESS] = std::vector<unsigned char>(1, 48); //became 0x30

base58Prefixes[SCRIPT_ADDRESS] = std::vector<unsigned char>(1, 13); //became 0x0d

base58Prefixes[SECRET_KEY] = std::vector<unsigned char>(1, 174); // became 0xae
```
```
COIN_PUBLIC=0x30
COIN_SCRIPTHASH=0x0d
COIN_PRIVATE=0xae
```