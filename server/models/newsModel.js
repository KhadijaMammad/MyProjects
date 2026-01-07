const sequelize = require('../config/connectionToDB')
const { DataTypes } = require('sequelize')

const News = sequelize.define("News", {
    news_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING(500),
        allowNull: false,
    },
    summary: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    keywords: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    insight: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    news_url: {
        type: DataTypes.STRING(1000),
        allowNull: true,
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    sites_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    image_url: {
        type: DataTypes.STRING(1000),
        allowNull: true,
    },
    news_lang: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    news_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    sent_at: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    tableName: 'news',
    timestamps: false
});

module.exports = News;