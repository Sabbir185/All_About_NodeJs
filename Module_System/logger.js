
var url = 'http://www.google.com';

function log(msg) {
    console.log(msg)
}

function out(msg) {
    console.log(msg)
}


// module exports
// module.exports.log = log;  // use this object technique for multiple export
// module.exports = {log, out};  // use this object technique for multiple export
module.exports = out;     // use this for single export as direct function