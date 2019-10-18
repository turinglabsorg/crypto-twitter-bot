"use strict";
var Engine = require('tingodb')()
import express = require("express")
var formidable = require('formidable')

module Utilities {

  export class Parser {

    public async body(req: express.Request) {
        return new Promise(response => {
            var jsonEmpty = true
            for (var key in req.body) {
                if(key !== undefined){
                    jsonEmpty = false
                }
            }
            if(jsonEmpty === true){
                var form = new formidable.IncomingForm()
                form.parse(req, function(err, fields, files) {
                    response (fields)
                })
            } else {
                response (req.body)
            }
        })
    }
  }

}

export = Utilities;