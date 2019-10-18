#!/bin/bash
echo "STARTING DEPENDENCIES FOR BOT"

#INSTALL REDIS
sudo apt-get update -y
sudo apt-get install -y redis-server
sudo sed -i 's/appendonly no/appendonly yes/g' /etc/redis/redis.conf
sudo systemctl restart redis-server.service
sudo systemctl enable redis-server.service

#INSTALL NODEJS
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs
npm install pm2 -g
touch .env

echo "URL=http://localhost:3000
TWITTER_CONSUMERKEY=YOURKEY
TWITTER_CONSUMERSECRET=YOURSECRET
BOT_PROFILE=BOTPROFILENAME
TIP_FOLLOW=0.01
TIP_MENTION=0.001
MIN_TIMEFRAME=360
MIN_FOLLOWERS=100
MIN_DAYS=30
COIN=YOURCOIN
TESTMODE=true
WEBSITE_URL=https://urltopublicwebsite
RPCUSER=RPCUSER
RPCPASSWORD=RPCPASSWORD
RPCADDRESS=127.0.0.1
RPCPORT=RPCPORT
COIN_PRIVATE=YOURPRIVATEHEX
COIN_PUBLIC=YOURPRIVATEPUBLIC
COIN_SCRIPTHASH=YOURPRIVATESCRIPTHASH" > .env

npm install
npm run tsc
cd dist
pm2 start index.js --watch --name bot
pm2 stop bot
