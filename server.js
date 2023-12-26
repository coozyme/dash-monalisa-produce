// const http = require('http');
// const app = require('./src/app');
// // const socketio = require('socket.io');
// // const db = require('./src/config/databases/db')
// const Socket = require('./src/socket/socket');

// const port = process.env.PORT || 3000;

// // app.listen(port, () => {
// //   console.log('Running Server: ', port);
// //   // db.Ping()
// // });

// // const io = socketio(server)

// // io.on('connection', (socket) => {
// //   console.log('New connection')
// //   socket.on('message', (data) => {
// //     console.log(`New message from ${socket.id}: ${data}`);
// //   })
// // })


// const server = http.createServer(app);
// const { SocketInstance } = Socket.createSocket(server);
// SocketInstance(server);

// server.listen(port, () => {
//   console.log('Running Server: ', port);
//   // db.Ping()
// });