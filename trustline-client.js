'use strict'

const net = require('net');
const readline = require('readline')
const port = 8089;
console.log('Welcome to your trustline!');
let connected = false;
const remoteIP = process.argv[2];
let balance = 0;

let client = net.createConnection(port, remoteIP);

let handler = stream => {
    console.log('remote address ', stream.remoteAddres);
    if(stream.remoteAddress !== remoteIP) {
       // stream.end();
    }
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
    rl.prompt();
    rl.on('line', line => {
        if (line === 'balance') {
            console.log(balance);
        } else if (line.startsWith('pay')) {
            let paid = Number(line.substring(4));
            console.log('Sent');
            balance = balance - paid;
            client.write(line);
        } else if (line === 'exit') {
            console.log('Good Bye');
            stream.destroy();
            process.exit(0);
        } else {
            console.log('command not recognized');
        }
        rl.prompt();
    })

    stream.on('data', data=>{
        let cmd = data.toString();
        if (cmd.startsWith('pay')) {
            let paid = Number(cmd.substring(4));
            balance = balance + paid;
            console.log('\nyou were paid', paid);
          
        }
        else {
            console.log('command not recognized');
        }
        rl.prompt();
    });

    stream.on('end', () => {
        console.log('Other side disconnected');
        console.log('Good Bye');
        process.exit(0);
    });

    
}

handler(client);

