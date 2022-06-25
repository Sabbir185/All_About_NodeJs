// globally available
/** 
console.log()
setTimeout();
clearTimeout();

setInterval();
clearInterval();
*/

var name = 'sabbir';

console.log(global.name) 
// undefined; because of node module system :)
// every file in the node application is called module.
// every module is encapsulated
// every variable, function in module are scoped that module, they are not available outside
// to available outside, we need to exports something from that module

console.log(module)
// module object holds many properties: for example --> module.exports


// module access
// use const to avoid accidentals reassignment
const logger = require('./logger');
// logger = 1
// logger.log('This is log')
logger('This is out!')

// to details error use jshint app.js on console



/**
    // module encapsulated by the power of IIFE function :)
    // An IIFE (Immediately Invoked Function Expression) is a JavaScript function that runs as  soon as it is defined.

    * simple function
 
    (function () {
    
    })();


    * arrow function

    (() => {
  
    })();


    * async function

    (async () => {

    })();

 */

// module wrapper function; IIFE
// (function(exports, require, module, __filename, __dirname) {
//     console.log('This invoke function that is execute immediately! with private behavior')
// })();