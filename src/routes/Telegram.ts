import express = require("express")
var twit = require('twit')
var redis = require("redis")
var db = redis.createClient()
const {promisify} = require('util')
const getmembers = promisify(db.smembers).bind(db)
const get = promisify(db.get).bind(db)
import * as Crypto from '../libs/Crypto'
var crypto = require('crypto');
var axios = require('axios');
var twitterlogin = require("node-twitter-api")
var os = require('os')
var config = require('../config.js');
var testmode = process.env.TESTMODE.toLowerCase() == 'true' ? true : false;
var exec = require('child_process').exec;
const TelegramBot = require('node-telegram-bot-api');

if(testmode === true){
    console.log('\x1b[33m%s\x1b[0m', 'RUNNING TELEGRAM IN TEST MODE')
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function init() {
    const token = process.env.TELEGRAM_TOKEN;
    const bot = new TelegramBot(token, {polling: true});
    bot.onText(/\/ARRR (.+)/, (msg, match) => {
        const chatId = msg.chat.id
        console.log('RECEIVED TELEGRAM MESSAGE FROM CHATID ' + chatId)
        const resp = match[1]
        switch(resp){
            case "deposit":
                var buf = crypto.randomBytes(128)
                var random = buf.toString('hex')
                exec("./piratepaperwallet --nohd -z=1 -e=" + random, async function (error, stdout, stderr) {
                    if(error){
                        bot.sendMessage(chatId, "WALLET IS UNREACHABLE");
                    }
                    if(stderr){
                        bot.sendMessage(chatId, "WALLET IS UNREACHABLE");
                    }
                    var generated = JSON.parse(stdout.replace('Generating 1 Sapling addresses.........[OK]',''))
                    bot.sendMessage(chatId, JSON.stringify(generated))
                })
            break;
        }
        
      });
}
