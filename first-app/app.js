
const Logger = require('./logger');
const logger = new Logger();

// register logger listener  
logger.on('messageLogged', (args) => {
    console.log('Listener called', args);
});

var message = "this is a log message";
logger.log(message);