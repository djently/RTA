'use strict';

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
    }
};

module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define('User', {
        login: DataTypes.STRING,
        title: DataTypes.STRING,
        cash: DataTypes.INTEGER
    }, {
        hooks
    });
    return User;
};
