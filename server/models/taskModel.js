const { DataTypes } = require('sequelize');
const sequelize = require('../config/connectionToDB'); 

const TaskModel = sequelize.define('Task', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: ""
    },
    status: {
        type: DataTypes.ENUM('Open', 'In Progress', 'Done', 'Archived'),
        defaultValue: 'Open'
    },
    priority: {
        type: DataTypes.ENUM('Low', 'Medium', 'High', 'Urgent'),
        defaultValue: 'Medium'
    },
    deadline: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'tasks', 
    timestamps: true,
    underscored: true, // Bu əmr Sequelize-ə createdAt yerinə created_at işlətməyi deyir
    created_at: 'createdAt', // Əgər bazada "createdAt" (böyük hərflə) yazmısansa belə qalsın
    updated_at: 'updatedAt'

});

module.exports = TaskModel;