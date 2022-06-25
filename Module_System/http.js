const http = require('http');

const server = http.createServer((req, res) => {
    if(req.url === '/') {
        res.write('Welcome Home');
        res.end()
    }
    if(req.url === '/api/course') {
        res.write('Course Details coming soon....');
        res.end()
    }
});

// event emitter concept
// server.on('connection', (socket) => {
//     console.log('New user connected')
// })

server.listen(3000);

console.log('Server is listening 3000....')