const models = require('../models/');

function onLogin(socket, login) {
    console.info('Logging in user ' + login);
    models.User.findOrCreate({
        where: {
            login: login
        }
    })
    .spread(function(user, isNewUser) {
        socket.emit('rta.loggedIn', user);
    });
}

function eventHandlers(socket) {
    socket.emit('connected', 'Welcome to RTA server!');

    socket.on('rta.login', onLogin.bind(null, socket));
}

module.exports = function(io) {
    io.on('connection', eventHandlers);
};
