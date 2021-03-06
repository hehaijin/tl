'use strict'

const net = require('net');
const readline = require('readline')
const port = 8089;
console.log('Welcome to your trustline!');

// let connected = false;

const remoteIP = process.argv[2];
let balance = 0;


let serverHanler = stream => {
    stream.on('data', data => {
        let cmd = data.toString();
        if (cmd.startsWith('pay')) {
            let paid = Number(cmd.substring(4));
            balance = balance + paid
            console.log('you were paid', paid);
        }else if ( cmd.startsWith('say')){
            console.log('The other side says', cmd.substring(3));
        }
        else {
            console.log('command not recognized');
        }
    });
    // or end; seems the same
    stream.on('close', () => {
        console.log('Other side disconnected');
        console.log('Good Bye');
        process.exit(0);
    });
}

let clientHandler = stream => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
    rl.prompt();
    rl.on('line', line => {
        if (line === 'balance') {
            console.log(balance);
        }else if( line.startsWith('say')){
            stream.write(line);
        }
        else if (line.startsWith('pay')) {
            let paid = Number(line.substring(4));
            console.log('Sent');
            balance = balance - paid;
            stream.write(line);
        } else if (line === 'exit') {
            console.log('Good Bye');
            // not close
            // end works or not?
            stream.destroy();
            process.exit(0);
        } else {
            console.log('command not recognized');
        }
        rl.prompt();
    })

}


const server = net.createServer(serverHanler);
server.listen(port);

console.log('connecting to ', remoteIP);
let client = net.createConnection(port, remoteIP, () => {
    console.log('connected');
    clientHandler(client);
});
    