import express = require("express")
import * as Utilities from '../libs/Utilities'

export function rendervue(req: express.Request, res: express.res) {

    let fs = require('fs')
    fs.readFile('index.html', null, function (error, data) {
        if (error) {
            res.writeHead(404);
            res.write('Whoops! File not found!');
        } else {
            res.write(data);
        }
        res.end();
    });
};