import _ from 'lodash';
var crypto = require('crypto');

export default class DECYPHER {
    constructor (){
        
    }
    
    static async readKey(password = '', key = ''){
        if(password !== '' && key !== ''){
            try {
                var decipher = crypto.createDecipher('aes-256-cbc', password);
                var dec = decipher.update(key,'hex','utf8');
                dec += decipher.final('utf8');
                var decrypted = dec;
                return Promise.resolve(decrypted);
            } catch (ex) {
                console.log('WRONG PASSWORD')
                return Promise.resolve(false);
            }
        }
    }
    
}

window.DECYPHER = DECYPHER
