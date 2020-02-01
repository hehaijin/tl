'use strict'

const net = require('net');
const readline = require('readline')
const port = 8089;
console.log('Welcome to your trustline!');



let connected = false;

const remoteIP = process.argv[2];
let balance = 0;
let handler = stream => {
    console.log('remote address ', stream.remoteAddres);
    if(stream.remoteAddress !== remoteIP) {
       
       // stream.end();
    }
    stream.on('data', data=>{
        console.log(data);
    });

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    rl.on('line', line => {
        if (line === 'balance') {
            console.log(balance);

        } else if (line.startsWith('pay')) {


        } else if (line === 'exit') {
            stream.end();
        } else {
            console.log('command not recognized');
        }
    })
}


let client= net.createConnection(port, remoteIP, handler);

