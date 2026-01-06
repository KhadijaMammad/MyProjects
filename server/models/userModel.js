const sequelize = require('../config/connectionToDB')
const { DataTypes } = require('sequelize')

const Users = sequelize.define("Users", {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
}, {
    tableName: 'users',
    timestamps: false
});

module.exports = Users;