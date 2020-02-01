'use strict'

const net = require('net');
const readline = require('readline')
const port = 8089;
console.log('Welcome to your trustline!');
let balance = 0;





const remoteIP = process.argv[2];
console.log('connecting to ', remoteIP);
const server = net.createServer(
    connection => {
        console.log('connection established', connection);
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })

        rl.on('line', line => {
            if (line === 'balance') {
                console.log(balance);

            } else if (line.startsWith('pay')) {


            } else if (line === 'exit') {

            } else {
                console.log('command not recognized');
            }
        })
    }
);;

server.listen(port);

