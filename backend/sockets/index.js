const Auction = require('../class/Auction');

/* Event handlers */
const onStartAuction = require('./onStartAuction');
const onLogin = require('./onLogin');

const auctionHandlers = require('./auctionHandlers');

module.exports = function(io) {
    io.on('connection', function connectionHandler(socket) {
        var clients = {};
        socket.emit('connected', 'Welcome to RTA server!');

        socket.on('rta.login', onLogin.bind(null, io, socket));
        socket.on('rta.startAuction', onStartAuction.bind(null, socket));
        socket.on('rta.getAuctionState', function() {
            return socket.emit('rta.pushAuctionState', Auction.state());
        });

        auctionHandlers(io, clients);
    });
};
