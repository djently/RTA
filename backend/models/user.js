'use strict';
var models, sequelize;
const Sequelize = require('sequelize');

const titles = [
    'Chocolate Beer Specialist',
    'Shredded Cheese Authority',
    'Rasputin Impersonator',
    'Cat Behavior Consultant',
    'Head of Potatoes',
    'Chief of Unicorn Division',
    'Bride Kidnapping Expert',
    'Hamburger University Professor',
    'Chief Bug Architect',
    'Chief Trouble Maker'
];

const hooks = {
    beforeCreate: function(user) {
        user.cash = 1000;
        user.title = titles[Math.floor(Math.random() * titles.length)];
    },
    afterCreate: function(user, options, cb) {
        return Sequelize.Promise.all(
            [
                {
                    name: 'Bread', quantity: 30
                },
                {
                    name: 'Carrot', quantity: 18
                },
                {
                    name: 'Diamond', quantity: 1
                }
            ].map(models.Item.create.bind(models.Item))
        )
        .then(function(items) {
            return user.setItems(items);
        })
        .then(function(user) {
            cb(null, user);
        });
    }
};

module.exports = function(_sequelize, DataTypes) {
    sequelize = _sequelize;
    const User = sequelize.define('User', {
        login: DataTypes.STRING,
        title: DataTypes.STRING,
        cash: DataTypes.INTEGER
    }, {
        classMethods: {
            associate: function(_models_) {
                models = _models_;
                User.hasMany(models.Item);
            }
        },
        hooks
    });
    return User;
};
