const { DataTypes } = require('sequelize');
const sequelize = require('../config/connectionToDB');

const FolderModel = sequelize.define('Folder', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    is_pinned: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    tableName: 'folders',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = FolderModel;