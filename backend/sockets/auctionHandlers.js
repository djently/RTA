const Sequelize = require('sequelize');
const _ = require('lodash');
const models = require('../models/');
const Auction = require('../class/Auction');

const emitUpdateUser = require('./emitUpdateUser');

function updateUserItems(user, itemName, itemAmount) {
    var itemToUpdate;
    if (user.Items) {
        itemToUpdate = _.find(user.Items, {name: itemName});
        if (itemToUpdate) {
            return itemToUpdate.update({
                quantity: itemToUpdate.quantity + itemAmount
            });
        }
    }
    return user.addItem({name: itemName, quantity: itemAmount});
}

module.exports = function(io) {
    /* auction handlers */
    Auction.onAuctionStarted(function() {
        io.sockets
            .in('logged-users')
            .emit('rta.auctionStarted', Auction.state());
    });

    Auction.onAuctionEnded(function(auction) {
        console.log(auction);
        models.User.findById(auction.winnerId, {
            include: [models.Item]
        }).then(function(user) {
            var payout, hasBids;
            hasBids = auction.winnerId === auction.ownerId &&
                auction.winningBid !== auction.lot.minBid;

            payout = hasBids ? auction.winningBid : 0;

            Sequelize.Promise.all([
                updateUserItems(
                    user,
                    auction.lot.itemName,
                    auction.lot.itemAmount
                ),
                user.update({cash: user.cash - payout})
            ])
            .spread(function(item, user) {
                return user.reload();
            })
            .then(function(user) {
                var userSocketId = _.findKey(io.sockets.connected, {
                    userId: user.id
                });

                if (userSocketId) {
                    emitUpdateUser(io.sockets.connected[userSocketId], user);
                }
            });
        });

        io.sockets
            .in('logged-users')
            .emit('rta.auctionEnded', Auction.state());
    });

    Auction.onAuctionTicker(function() {
        io.sockets
            .in('logged-users')
            .emit('rta.pushAuctionState', Auction.state());
    });
};
