"use strict";
import * as Utilities from './Utilities'
let request = require("request")

module Crypto {

  export class Wallet {

    public async request(method, params = []) {
        return new Promise(response => {
            var rpcuser = process.env.RPCUSER
            var rpcpassword = process.env.RPCPASSWORD
            var rpcendpoint = 'http://'+ process.env.RPCADDRESS +':' + process.env.RPCPORT
            if(process.env.DEBUG === "full"){
                console.log('Connecting to ' + rpcendpoint + ' WITH ' +rpcuser+'/'+rpcpassword)
            }
            let req = {
                url: rpcendpoint,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + Buffer.from(rpcuser + ":" + rpcpassword).toString("base64")
                },
                body: JSON.stringify({
                    id: Math.floor((Math.random() * 100000) + 1),
                    params: params,
                    method: method
                })
            };
            request(req, function (err, res, body) {
                try {
                    if(process.env.DEBUG === "full"){
                        console.log(body)
                    }
                    response(JSON.parse(body))
                } catch (err) {
                    response(body)
                }
            });
        })
    }

  }

}

export = Crypto;