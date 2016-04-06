'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            login: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },

    down: function(queryInterface) {
        queryInterface.dropTable('Users');
    }
};
