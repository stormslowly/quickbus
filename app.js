// Start sails and pass it command line arguments
require('sails').lift(require('optimist').argv);

/* for dev

require('sails').lift({

    }, function () {
      repl = require("repl").start("sails> ");
      repl.on('exit', function () {
        console.log('Closing console');
        process.exit();
      });
    });
*/ 