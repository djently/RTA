module.exports = function emitMessage(type, message) {
    return socket.emit('rta.msg', {
            type: type,
            message: message
        });
};
