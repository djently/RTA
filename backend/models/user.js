'use strict';

module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define('User', {
        login: DataTypes.STRING
    }, {});
    return User;
};
