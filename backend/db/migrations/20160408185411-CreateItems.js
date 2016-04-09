'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        queryInterface.createTable('Items', {
            id: {
                allowNull: false,
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING
            },
            quantity: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            UserId: {
                allowNull: false,
                foreignKey: true,
                type: Sequelize.INTEGER
            }
        });
    },

    down: function(queryInterface, Sequelize) {
        queryInterface.dropTable('Items');
    }
};
