const EventEmitter = require('events');

class Logger extends EventEmitter {

    log(message) {
        console.log(message);
        this.emit('messageLogged', {data: 'a log message was captured'});
    }

}

module.exports = Logger;