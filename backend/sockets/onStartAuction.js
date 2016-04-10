const models = require('../models/');
const emitMessage = require('./emitMessage.js');
const emitUpdateUser = require('./emitUpdateUser.js');

const Auction = require('../class/Auction');

function yieldItems(item, amount) {
    if (item.quantity < amount) {
        emitMessage(socket, 'error', 'Not enough items in stock!');
    }

    if (item.quantity === amount) {
        return item.destroy();
    } else {
        return item.update({quantity: item.quantity - amount});
    }
}

module.exports = function onStartAuction(socket, data) {
    return models.User.findById(data.userId, {
        include: [{model: models.Item, where: {name: data.itemName}}]
    })
    .then(function(user) {
        !user && emitMessage(socket, 'error', 'User not found!');
        !user.Items.length && emitMessage('error', 'Article not found!');

        yieldItems(user.Items[0], data.itemAmount).then(function() {
            user.reload({include: [models.Item]}).then(function(user) {
                emitUpdateUser(socket, user);
            });

            Auction.addToQueue(user, data);
        });
    });
};
