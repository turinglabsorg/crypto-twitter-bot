import express = require("express")
import * as Crypto from '../libs/Crypto'
import * as Utilities from '../libs/Utilities'
var redis = require("redis")
var db = redis.createClient()
const {promisify} = require('util')
const getmembers = promisify(db.smembers).bind(db)
const get = promisify(db.get).bind(db)

export async function getinfo(req: express.Request, res: express.Response) {
    var wallet = new Crypto.Wallet;
    wallet.request('getinfo').then(function(info){
        res.json(info['result'])
    })
};

