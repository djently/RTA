const _ = require('lodash');

const models = require('../models/');
const Auction = require('../class/Auction');

module.exports = function onLogin(io, socket, login) {
    console.info('Logging in user ' + login);
    return models.User.findOrCreate(
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
        var socketId = _.findKey(io.sockets.connected, {
            userId: user.get('id')
        });

        if (socketId && io.sockets.connected[socketId]) {
            io.sockets.connected[socketId]
                .emit('rta.disconnected', user.login)
                .leave('logged-users');
        }
        socket.userId = user.id;

        socket
            .emit('rta.loggedIn', user)
            .join('logged-users');

        socket.on('rta.placeBid', function(bid) {
            Auction.placeBid(user, bid);
        });
    });
};
