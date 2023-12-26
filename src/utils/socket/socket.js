const socket = require('socket.io');
const constants = require('../constants/socket');

const {
   CHAT_BEGINNING,
   BOT_NAME,
   BOT_INTRO,
} = constants;

class Socket {
   constructor(server) {
      this.server = server;
      this.io = socket(server, { cors: { origin: '*' } });
      this.botName = BOT_NAME;
      this.userName = 'User';
   }

   /**
    * @private
    * @function _emitUserMessage
    * @param {object} socket
    * @param {object} message
    * @emits userMessage - when a user sends a message
    * @memberof Socket
    * @returns {object} message - returns user message to the chatroom
    */
   _emitUserMessage(socket, message) {
      socket.emit('       ', message);
   }

   /**
    * @private
    * @function _emitBotMessage
    * @param {object} socket
    * @param {object} message
    * @emits botMessage - when the chatbot sends a message
    * @memberof Socket
    * @returns {object} message - returns bot message to the chatroom
    */
   _emitBotMessage(socket, message) {
      socket.emit('botMessage', message);
   }

   /**
    * @private
    * @function _emitNotification
    * @param {object} socket
    * @param {object} message
    * @emits notification - when a user joins or leaves the chatroom
    * @memberof Socket
    * @returns {object} message - returns notification to the chatroom
    */
   _emitNotification(socket, message) {
      socket.emit('notification', message);
   }

   /**
    * @private
    * @function _broadcastNotification
    * @param {object} socket
    * @param {object} message
    * @emits notification - when a user joins or leaves the chatroom
    * @memberof Socket
    * @returns {function} _emitNotification - returns notification to the chatroom
    */
   _broadcastNotification(socket, message) {
      this._emitNotification(socket.broadcast, message);
   }

   /**
    * @private
    * @function _emitDisconnect
    * @param {object} socket
    * @emits disconnect - when a user disconnects from the chatroom
    * @memberof Socket
    * @returns {function} _broadcastNotification - returns notification to the chatroom
    */
   _emitDisconnect(socket) {
      socket.on('disconnect', (reason) => {
         this._broadcastNotification(socket, reason);
      });
   }


   /**
    * @private
    * @function initializeSocket
    * @memberof Socket
    * @returns {function} _listenRegister - listens for register
    * @returns {function} _emitNotification - emits notification to the chatroom
    * @returns {function} _emitBotMessage - emits bot message to the chatroom
    * @returns {function} _listenToChatMessage - listens for chat message
    * @description Initializes socket
    * @listens for connection
    * @emits userMessage
    * @emits botMessage
    * @emits notification
    * @emits disconnect
    * @emits access
    */
   initializeSocket() {
      this.io.on('connection', (socket) => {
         console.log("socket connected!!! ", socket.id)


         // Emit to the new user only
         this._emitNotification(socket, CHAT_BEGINNING);

         // Emit bot message
         this._emitBotMessage(socket, BOT_INTRO);

         // this._emitBotMessage(socket, BOT_INTRO_2);


      });


   }

   /**
    * @static
    * @function createSocket
    * @param {object} server- server instance
    * @memberof Socket
    * @returns {object} socketInstance - returns socket instance
    * @description Creates a socket instance
    */
   static createSocket(server) {
      const _createSocketInstance = (server) => {
         const socketInstance = new Socket(server);
         return socketInstance.initializeSocket();
      };

      return {
         SocketInstance: _createSocketInstance,
      };
   }
}

module.exports = Socket;