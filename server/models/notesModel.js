const { DataTypes } = require('sequelize');
const sequelize = require('../config/connectionToDB');

const Note = sequelize.define('Note', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    folder_id: {
        type: DataTypes.INTEGER,
        allowNull: true, 
        references: {
            model: 'folders', 
            key: 'id'
        }
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    is_favorite: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    deleted_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    images: {
        type: DataTypes.JSONB, // Şəkil linklərini massiv kimi saxlamaq üçün
        defaultValue: []
    }
}, {
    tableName: 'notes',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Note;