const EventEmitter = require('events');

class Logger extends EventEmitter {
    log(msg) {
        console.log(msg);

        // Raise an Event
        this.emit('message', {name: 'Sabbir Ahmmed', Company: 'Appstick'});
    }
}

module.exports = Logger;