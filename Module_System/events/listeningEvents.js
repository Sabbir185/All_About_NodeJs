const Logger = require('./RaiseEvents');

const loggerObj = new Logger();

// Register a listener
loggerObj.on('message', (arg) => {
    console.log('Listening : ', arg)
})

loggerObj.log('From listeningEvent...')