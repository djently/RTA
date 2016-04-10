module.exports = function emitUpdateUser(socket, user) {
    return socket.emit('rta.updateUser', user);
};
