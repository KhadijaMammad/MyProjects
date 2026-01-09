// models/calendarModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/connectionToDB');

const CalendarEvent = sequelize.define('CalendarEvent', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    google_event_id: { type: DataTypes.STRING, unique: true, allowNull: false },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    summary: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    start_time: { type: DataTypes.DATE, allowNull: false },
    end_time: { type: DataTypes.DATE, allowNull: false },
    html_link: { type: DataTypes.TEXT },
    metadata: { type: DataTypes.JSONB }
}, {
    tableName: 'calendar_events',
    underscored: true,
    timestamps: true
});

module.exports = CalendarEvent;