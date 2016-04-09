'use strict';

module.exports = function(sequelize, DataTypes) {
    const Item = sequelize.define('Item', {
            name: DataTypes.STRING,
            quantity: DataTypes.INTEGER,
            UserId: {
                type: DataTypes.INTEGER,
                foreignKey: true
            }
        }, {
            classMethods: {
                associate: function(models) {
                    Item.belongsTo(models.User);
                }
            },
            timestamps: false
        }
    );
    return Item;
};

