// path module
const path = require('path');

const pathObj = path.parse(__filename)

console.log( pathObj );


// os module
const os = require('os');

const totalSpace = os.totalmem();
const freeSpace = os.freemem();

console.log(`total space is ${totalSpace} and free space is ${freeSpace}`)



// file
const fs = require('fs');

const syncFileRead = fs.readdirSync('./');
console.log('Sync : ', syncFileRead )

fs.readdir('./', (err, file)=> {
    if(err) console.log('Err : ', err);
    else console.log('File : ', file)
})



// ***************//
// events
// is a signal that something has happened in our application
const EvenEmitter  = require('events');

const emitter = new EvenEmitter();

// Register a listener
emitter.on('message', (arg) => {
    console.log('This is from register of listener : ', arg)
})

// Raise an event
emitter.emit('message', {id: 185, dept: 'CSE'})

// event raise korbe, sei event ke listen korbe :)

/*******************/
