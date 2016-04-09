const models = require('../models/');
var io, clients = {};

function onLogin(socket, login) {
    console.info('Logging in user ' + login);
    models.User.findOrCreate(
        {
            where: {
                login: login
            },
            include: [models.Item]
        }
    )
    .spread(function(user, newUser) {
        return newUser ? user.reload() : user;
    })
    .then(function(user) {
        var socketId = clients[user.get('id')];

        if (socketId && io.sockets.connected[socketId]) {
            io.sockets.connected[socketId]
                .emit('rta.disconnect', user.login)
                .leave('logged-users');
        }

        clients[user.get('id')] = socket.id;

        socket
            .emit('rta.loggedIn', user)
            .join('logged-users');
    });
}

function connectionHandler(socket) {
    socket.emit('connected', 'Welcome to RTA server!');

    socket.on('rta.login', onLogin.bind(null, socket));
}

module.exports = function(_io_) {
    io = _io_;
    io.on('connection', connectionHandler);
};
